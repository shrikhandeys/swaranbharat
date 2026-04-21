// k6 Cloud worldwide load test — runs the smoke test from 5 geographically
// distributed load zones (Mumbai, Frankfurt, Virginia, Singapore, Sydney)
// so you see real response times as experienced by users globally.
//
// Requires a k6 Cloud account (free tier works): https://k6.io/cloud
// Run:
//   k6 login cloud
//   k6 cloud tests/load/worldwide.js --env BASE_URL=https://swaranbharatexports.com
//
import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "https://swaranbharatexports.com";

export const options = {
  ext: {
    loadimpact: {
      projectID: Number(__ENV.K6_PROJECT_ID || 0) || undefined,
      name: "Swaranbharat worldwide smoke",
      distribution: {
        mumbai: { loadZone: "amazon:in:mumbai", percent: 30 },
        frankfurt: { loadZone: "amazon:de:frankfurt", percent: 20 },
        virginia: { loadZone: "amazon:us:ashburn", percent: 20 },
        singapore: { loadZone: "amazon:sg:singapore", percent: 15 },
        sydney: { loadZone: "amazon:au:sydney", percent: 15 },
      },
    },
  },
  vus: 50,
  duration: "5m",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1500", "p(99)<3000"],
  },
};

export default function () {
  const paths = ["/", "/products", "/about", "/contact"];
  for (const p of paths) {
    const res = http.get(`${BASE_URL}${p}`);
    check(res, {
      [`${p} status 200`]: (r) => r.status === 200,
    });
  }
  sleep(1);
}
