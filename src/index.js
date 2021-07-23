const BASEURL = "http://localhost:6060";

// Helper functions
const convertToSec = (milliseconds) => {
  return milliseconds / 1000;
};

// Measure performance metrics
const getFCP = () => {
  if (window) {
    const fcp = window.performance
      .getEntriesByType("paint")
      .find((elem) => elem.name === "first-contentful-paint");
    if (fcp.startTime) {
      return convertToSec(fcp.startTime);
    }
  }
};

const getTTFB = (perf) => {
  const TTFB = perf.responseStart - perf.requestStart;
  return convertToSec(TTFB);
};

const getDOMLoad = (perf) => {
  const DOMLoad = perf.domComplete;
  return convertToSec(DOMLoad);
};

const getWindowLoad = (perf) => {
  const windowLoad = perf.loadEventStart - perf.loadEventEnd;

  return convertToSec(windowLoad);
};

const getEntries = () => {
  const entries = performance.getEntriesByType("resource");

  return entries.map((entry) => {
    return {
      name: entry.name,
      initiatorType: entry.initiatorType,
      responseEnd: convertToSec(entry.responseEnd),
      transferSize: entry.transferSize,
    };
  });
};

// ------------------------------

async function logMetrics(metrics) {
  const metricsFiles = metrics.Entries;
  await delete metrics.Entries;

  console.table(metrics);
  console.table(metricsFiles);
}

async function collectMetrics() {
  const perf = performance.getEntriesByType("navigation")[0];

  return {
    UserAgent: navigator.userAgent,
    URL: window.location.href,
    TTFB: await getTTFB(perf),
    DomLoad: await getDOMLoad(perf),
    WindowLoad: await getWindowLoad(perf),
    FCP: await getFCP(),
    Entries: await getEntries(),
  };
}

function sendMetricWithBeacon() {
  window.addEventListener("unload", () => {
    navigator.sendBeacon(
      `${BASEURL}/api/metrics`,
      JSON.stringify(window.metrics)
    );
    logMetrics(window.metrics);
  });
}

function sendMetricWithFetch() {
  window.addEventListener("load", () => {
    logMetrics(window.metrics);

    fetch(`${BASEURL}/api/metrics`, {
      method: "POST",
      body: JSON.stringify(window.metrics),
    }).then(console.log);
  });
}

(async function init() {
  window.addEventListener("load", async () => {
    metrics = await collectMetrics();
    window.metrics = metrics;
  });

  if (!navigator.sendBeacon) {
    sendMetricWithFetch();
  } else {
    sendMetricWithBeacon();
  }
})();
