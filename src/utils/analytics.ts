const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID ?? "G-B9ET9MWQFQ";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: Gtag;
  }
}

let initialized = false;
let lastPageView: string | null = null;

function getGtag(): Gtag {
  window.dataLayer ??= [];
  window.gtag ??= ((...args: unknown[]) => {
    window.dataLayer.push(args);
  }) as Gtag;

  return window.gtag;
}

export function initializeAnalytics() {
  if (initialized || typeof document === "undefined") return;

  initialized = true;
  const gtag = getGtag();

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  if (!document.querySelector(`script[data-ga="${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.ga = GA_MEASUREMENT_ID;
    document.head.appendChild(script);
  }
}

export function setAnalyticsUserId(userId: number | undefined) {
  if (userId === undefined) return;

  initializeAnalytics();
  getGtag()("config", GA_MEASUREMENT_ID, {
    user_id: String(userId),
    send_page_view: false,
  });
}

export function trackPageView(path: string) {
  if (lastPageView === path) return;

  initializeAnalytics();
  getGtag()("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  });
  lastPageView = path;
}

export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>,
) {
  initializeAnalytics();
  getGtag()("event", eventName, parameters ?? {});
}
