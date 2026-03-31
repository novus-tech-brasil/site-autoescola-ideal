"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TimedModalSubmitPayload } from "./TimedModal";

const TimedModal = React.lazy(() => import("./TimedModal"));
const ExitIntentModal = React.lazy(() => import("./ExitIntentModal"));

type ModalType = "timed" | "exit" | "scroll" | "action";
type Variant = "A" | "B";

type ModalHistory = {
  globalLastShownAt: number;
  byType: Partial<Record<ModalType, number>>;
};

const WHATSAPP_NUMBER = "5517997572900";
const STORAGE_VARIANT_KEY = "ideal_ab_variant_v1";
const STORAGE_HISTORY_KEY = "ideal_modal_history_v1";

const GLOBAL_COOLDOWN_MS = 1000 * 60 * 8;
const TYPE_COOLDOWN_MS = 1000 * 60 * 60 * 18;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readHistory(): ModalHistory {
  if (!isBrowser()) {
    return { globalLastShownAt: 0, byType: {} };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_HISTORY_KEY);
    if (!raw) {
      return { globalLastShownAt: 0, byType: {} };
    }

    const parsed = JSON.parse(raw) as ModalHistory;
    return {
      globalLastShownAt: parsed.globalLastShownAt ?? 0,
      byType: parsed.byType ?? {},
    };
  } catch {
    return { globalLastShownAt: 0, byType: {} };
  }
}

function persistHistory(history: ModalHistory) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
}

function getOrCreateVariant(): Variant {
  if (!isBrowser()) {
    return "A";
  }

  const cached = window.localStorage.getItem(STORAGE_VARIANT_KEY);
  if (cached === "A" || cached === "B") {
    return cached;
  }

  const generated: Variant = Math.random() > 0.5 ? "A" : "B";
  window.localStorage.setItem(STORAGE_VARIANT_KEY, generated);
  return generated;
}

function pushAnalyticsEvent(eventName: string, payload: Record<string, unknown>) {
  if (!isBrowser()) {
    return;
  }

  const detail = { event: eventName, ...payload };

  window.dispatchEvent(
    new CustomEvent("ideal-conversion-event", {
      detail,
    }),
  );

  const dataLayer = (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push(detail);
  }
}

function buildWhatsAppLeadMessage(
  payload: TimedModalSubmitPayload,
  modalType: ModalType,
  variant: Variant,
): string {
  return [
    "Ola! Quero mais informacoes sobre minha CNH.",
    "",
    `Nome: ${payload.name}`,
    `WhatsApp: ${payload.phone}`,
    `Origem: ${payload.source}`,
    `Modal: ${modalType}`,
    `AB Variant: ${variant}`,
  ].join("\n");
}

function openWhatsApp(message: string) {
  if (!isBrowser()) {
    return;
  }

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
}

export default function ModalController() {
  const [variant, setVariant] = useState<Variant>("A");
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [modalSource, setModalSource] = useState<string>("home");

  const hasInteractedRef = useRef(false);
  const hasTriggeredScrollRef = useRef(false);
  const pendingActionRef = useRef<{ href: string; target: string | null } | null>(null);

  const modalContent = useMemo(() => {
    return {
      timed: {
        title: variant === "A" ? "Quer ajuda para escolher seu plano?" : "Tem duvida sobre valores e etapas?",
        description:
          variant === "A"
            ? "Preencha rapido e nossa equipe monta uma opcao de plano alinhada ao seu perfil."
            : "A gente te orienta no WhatsApp com um caminho simples para iniciar sua habilitacao.",
        ctaLabel: "Receber orientacao",
        dismissLabel: "Agora nao",
      },
      scroll: {
        title: "Voce chegou ate aqui, falta pouco",
        description:
          "Se quiser, ja te enviamos no WhatsApp as opcoes mais buscadas para voce decidir sem enrolacao.",
        ctaLabel: "Quero as opcoes",
        dismissLabel: "Continuar lendo",
      },
      action: {
        title: "Antes de continuar, fale com um especialista",
        description:
          "Deixe seu contato e a equipe IDEAL te chama com um plano objetivo para sua realidade.",
        ctaLabel: "Enviar e falar agora",
        dismissLabel: "Fechar",
      },
    };
  }, [variant]);

  const registerModalShown = useCallback((type: ModalType) => {
    const now = Date.now();
    const history = readHistory();

    const nextHistory: ModalHistory = {
      globalLastShownAt: now,
      byType: {
        ...history.byType,
        [type]: now,
      },
    };

    persistHistory(nextHistory);
  }, []);

  const canShowModal = useCallback((type: ModalType, bypassFrequency = false) => {
    if (activeModal) {
      return false;
    }

    if (bypassFrequency) {
      return true;
    }

    const now = Date.now();
    const history = readHistory();

    if (history.globalLastShownAt && now - history.globalLastShownAt < GLOBAL_COOLDOWN_MS) {
      return false;
    }

    const lastTypeShown = history.byType[type] ?? 0;
    if (lastTypeShown && now - lastTypeShown < TYPE_COOLDOWN_MS) {
      return false;
    }

    return true;
  }, [activeModal]);

  const openModal = useCallback((type: ModalType, source: string, bypassFrequency = false) => {
    if (!canShowModal(type, bypassFrequency)) {
      return false;
    }

    setModalSource(source);
    setActiveModal(type);
    registerModalShown(type);

    pushAnalyticsEvent("modal_open", {
      modalType: type,
      source,
      variant,
    });

    return true;
  }, [canShowModal, registerModalShown, variant]);

  const closeModal = useCallback((reason: string) => {
    if (!activeModal) {
      return;
    }

    pushAnalyticsEvent("modal_close", {
      modalType: activeModal,
      reason,
      source: modalSource,
      variant,
    });

    setActiveModal(null);
  }, [activeModal, modalSource, variant]);

  const handleLeadSubmit = useCallback((payload: TimedModalSubmitPayload) => {
    if (!activeModal) {
      return;
    }

    pushAnalyticsEvent("lead_submit", {
      modalType: activeModal,
      source: payload.source,
      variant,
    });

    openWhatsApp(buildWhatsAppLeadMessage(payload, activeModal, variant));
    setActiveModal(null);
  }, [activeModal, variant]);

  const navigateToPendingAction = useCallback(() => {
    const pending = pendingActionRef.current;
    if (!pending) {
      openWhatsApp("Ola! Quero falar com um especialista da Autoescola IDEAL.");
      return;
    }

    if (pending.target === "_blank") {
      window.open(pending.href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.assign(pending.href);
  }, []);

  useEffect(() => {
    const currentVariant = getOrCreateVariant();
    setVariant(currentVariant);

    document.documentElement.setAttribute("data-ab-variant", currentVariant);
  }, []);

  useEffect(() => {
    const markInteraction = () => {
      hasInteractedRef.current = true;
    };

    window.addEventListener("pointerdown", markInteraction, { passive: true });
    window.addEventListener("keydown", markInteraction, { passive: true });
    window.addEventListener("touchstart", markInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", markInteraction);
      window.removeEventListener("keydown", markInteraction);
      window.removeEventListener("touchstart", markInteraction);
    };
  }, []);

  useEffect(() => {
    const delay = 8000 + Math.floor(Math.random() * 7000);

    const timer = window.setTimeout(() => {
      if (!hasInteractedRef.current) {
        openModal("timed", "timer-no-interaction");
      }
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [openModal]);

  useEffect(() => {
    const handleExitIntent = (event: MouseEvent) => {
      if (window.innerWidth < 1024) {
        return;
      }

      if (event.relatedTarget || event.clientY > 8) {
        return;
      }

      openModal("exit", "exit-intent");
    };

    document.addEventListener("mouseout", handleExitIntent);

    return () => {
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, [openModal]);

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggeredScrollRef.current) {
        return;
      }

      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        return;
      }

      const progress = (window.scrollY / maxScroll) * 100;
      if (progress >= 60) {
        hasTriggeredScrollRef.current = true;
        openModal("scroll", "scroll-depth");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openModal]);

  useEffect(() => {
    const handleActionClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const trigger = target.closest("[data-lead-action='open-modal']") as HTMLElement | null;
      if (!trigger) {
        return;
      }

      const source = trigger.getAttribute("data-lead-source") ?? "action-cta";
      event.preventDefault();

      if (trigger instanceof HTMLAnchorElement && trigger.href) {
        pendingActionRef.current = {
          href: trigger.href,
          target: trigger.target || null,
        };
      }

      const opened = openModal("action", source, true);
      if (opened) {
        return;
      }

      navigateToPendingAction();
    };

    document.addEventListener("click", handleActionClick, true);
    return () => {
      document.removeEventListener("click", handleActionClick, true);
    };
  }, [navigateToPendingAction, openModal]);

  return (
    <React.Suspense fallback={null}>
      <TimedModal
        open={activeModal === "timed"}
        source={modalSource}
        title={modalContent.timed.title}
        description={modalContent.timed.description}
        ctaLabel={modalContent.timed.ctaLabel}
        dismissLabel={modalContent.timed.dismissLabel}
        onClose={() => closeModal("dismiss")}
        onSubmit={handleLeadSubmit}
      />

      <TimedModal
        open={activeModal === "scroll"}
        source={modalSource}
        title={modalContent.scroll.title}
        description={modalContent.scroll.description}
        ctaLabel={modalContent.scroll.ctaLabel}
        dismissLabel={modalContent.scroll.dismissLabel}
        onClose={() => closeModal("dismiss")}
        onSubmit={handleLeadSubmit}
      />

      <TimedModal
        open={activeModal === "action"}
        source={modalSource}
        title={modalContent.action.title}
        description={modalContent.action.description}
        ctaLabel={modalContent.action.ctaLabel}
        dismissLabel={modalContent.action.dismissLabel}
        directActionLabel="Ir direto agora"
        onDirectAction={() => {
          closeModal("direct-navigation");
          navigateToPendingAction();
        }}
        onClose={() => closeModal("dismiss")}
        onSubmit={handleLeadSubmit}
      />

      <ExitIntentModal
        open={activeModal === "exit"}
        onClose={() => closeModal("dismiss")}
        onPrimaryAction={() => {
          closeModal("accepted");
          openModal("action", "exit-intent-follow-up", true);
        }}
        onSecondaryAction={() => {
          pushAnalyticsEvent("modal_exit_direct_whatsapp", {
            source: modalSource,
            variant,
          });
          closeModal("direct-whatsapp");
          openWhatsApp("Ola! Vi a oferta da Autoescola IDEAL e quero atendimento prioritario.");
        }}
      />
    </React.Suspense>
  );
}
