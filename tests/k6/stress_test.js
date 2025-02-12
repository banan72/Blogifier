import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    stages: [
        { duration: "3m", target: 50 },
        { duration: "5m", target: 50 },
        { duration: "3m", target: 100 },
        { duration: "5m", target: 100 },
        { duration: "3m", target: 150 },
        { duration: "5m", target: 150 },
        { duration: "5m", target: 0 },
    ]
};

export default function () {
    http.get(`http://${__ENV.URL}/`)
    sleep(1)
}
