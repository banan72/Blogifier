import encoding from 'k6/encoding';
import http from 'k6/http';
import { check } from 'k6';


export const options =  {
    thresholds: {
        http_req_duration: ['p(100)<200']
    },
};

export default function () {
    http.get('http://185.51.76.42:9888/')
}
