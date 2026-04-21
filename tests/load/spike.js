// k6 spike test — sudden traffic surge: 100 RPS baseline, spike to 500 RPS
// for 2 minutes, recover. Proves the site survives viral-moment traffic.
//
// Run:
//   k6 run tests/load/spike.js --env BASE_URL=https://swaranbharatexports.com
//
import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  scenarios: {
    spike: {
      executor: "ramping-arrival-rate",
      startRate: 100,
      timeUnit: "1s",
      preAllocatedVUs: 50,
      maxVUs: 500,
      stages: [
        { target: 100, duration: "1m" }, // warm
        { target: 500, duration: "30s" }, // spike up
        { target: 500, duration: "2m" }, // hold
        { target: 100, duration: "30s" }, // recover
        { target: 100, duration: "1m" }, // cool
      ],
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<1500"],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, { "status 200": (r) => r.status === 200 });
}
