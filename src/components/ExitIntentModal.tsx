"use client";

import React, { useEffect } from "react";

interface ExitIntentModalProps {
  open: boolean;
  onClose: () => void;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

export default function ExitIntentModal({
  open,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
}: ExitIntentModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-[#020617]/65 p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Oferta especial antes de sair">
      <div className="editorial-card w-full max-w-md border border-[#0f172a]/25 bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[#0619dd]">Ultima chance</p>
            <h3 className="mt-2 text-balance font-['Space_Grotesk'] text-2xl uppercase leading-none text-[#0c1327]">
              Nao saia sem falar com a equipe
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="rounded-md border border-[#0f172a]/20 px-2 py-1 text-sm font-bold text-[#0c1327] transition hover:bg-slate-100"
          >
            X
          </button>
        </div>

        <p className="text-pretty text-sm leading-relaxed text-slate-700">
          A gente te envia um plano orientado para seu perfil no WhatsApp, sem compromisso e com resposta rapida.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#0f172a]/25 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#0c1327] transition hover:bg-slate-100"
          >
            Continuar Navegando
          </button>
          <button
            type="button"
            onClick={onPrimaryAction}
            className="rounded-md border border-black bg-[#ffcb00] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ffd633]"
          >
            Quero Minha Oferta
          </button>
        </div>

        <button
          type="button"
          onClick={onSecondaryAction}
          className="mt-3 w-full rounded-md border border-[#0619dd]/30 bg-[#0619dd]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0619dd] transition hover:bg-[#0619dd]/10"
        >
          Ir direto para o WhatsApp
        </button>
      </div>
    </div>
  );
}
