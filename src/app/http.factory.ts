import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { InterceptorHttp } from "./http.interceptor";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptorHttp(xhrBackend, requestOptions);
}