(() => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const trackedClicks = new WeakSet();
  const modalControllerEvents = new Set([
    "modal_open",
    "modal_close",
    "lead_submit",
    "modal_exit_direct_whatsapp",
  ]);

  function pushToDataLayer(payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }

  function sendGtagEvent(eventName, payload) {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", eventName, payload);
  }

  function normalizeText(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function buildPageContext() {
    return {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    };
  }

  function trackEvent(eventName, payload) {
    const enrichedPayload = {
      ...buildPageContext(),
      ...payload,
    };

    pushToDataLayer({
      event: eventName,
      ...enrichedPayload,
    });

    sendGtagEvent(eventName, enrichedPayload);
  }

  window.addEventListener("ideal-conversion-event", (event) => {
    const detail = event.detail || {};
    if (!detail.event) {
      return;
    }

    const { event: eventName, ...payload } = detail;
    const enrichedPayload = {
      ...buildPageContext(),
      ...payload,
    };

    if (!modalControllerEvents.has(eventName)) {
      pushToDataLayer({
        event: eventName,
        ...enrichedPayload,
      });
    }

    sendGtagEvent(eventName, enrichedPayload);
  });

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) {
        return;
      }

      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      if (trackedClicks.has(link)) {
        return;
      }

      const href = link.href || "";
      const isWhatsappLink = href.includes("wa.me/") || href.includes("api.whatsapp.com/");
      if (!isWhatsappLink) {
        return;
      }

      trackedClicks.add(link);

      trackEvent("whatsapp_click", {
        source:
          link.getAttribute("data-lead-source") ||
          link.getAttribute("aria-label") ||
          normalizeText(link.textContent) ||
          "whatsapp-link",
        href,
        link_text: normalizeText(link.textContent),
        target: link.target || "_self",
      });
    },
    true,
  );
})();
