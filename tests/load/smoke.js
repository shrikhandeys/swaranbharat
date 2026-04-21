// k6 smoke test — baseline sanity check. 1 virtual user for 1 minute across
// the most-requested endpoints. Asserts p95 < 500ms and zero errors.
//
// Run:
//   k6 run tests/load/smoke.js --env BASE_URL=https://swaranbharatexports.com
//
import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  vus: 1,
  duration: "1m",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

const paths = ["/", "/products", "/about", "/contact", "/certifications", "/api/health"];

export default function () {
  for (const p of paths) {
    const res = http.get(`${BASE_URL}${p}`);
    check(res, {
      [`${p} status 200`]: (r) => r.status === 200,
      [`${p} < 500ms`]: (r) => r.timings.duration < 500,
    });
  }
  sleep(1);
}
