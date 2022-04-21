import http from 'k6/http';
import { sleep } from 'k6';


export const options =  {
    thresholds: {
        http_req_duration: ['p(100)<500']
    },
    duration: "10s"
};

export default function () {
    http.get(`http://${__ENV.URL}/`)
    sleep(1)
}
