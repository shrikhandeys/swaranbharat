// k6 stress test — ramp from 1 to 1000 RPS over 10 minutes. Identifies the
// knee of the curve where error rate starts climbing.
//
// Run:
//   k6 run tests/load/stress.js --env BASE_URL=https://swaranbharatexports.com
//
import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  scenarios: {
    stress: {
      executor: "ramping-arrival-rate",
      startRate: 1,
      timeUnit: "1s",
      preAllocatedVUs: 100,
      maxVUs: 1000,
      stages: [
        { target: 50, duration: "2m" },
        { target: 250, duration: "3m" },
        { target: 500, duration: "3m" },
        { target: 1000, duration: "2m" },
        { target: 0, duration: "1m" },
      ],
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.1"],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, { "status<500": (r) => r.status < 500 });
}
