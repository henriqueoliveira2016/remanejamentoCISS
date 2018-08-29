import { BASE_URL, AUTH } from './app.constants';
import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorHttp extends Http {

    constructor(private backend: ConnectionBackend,
                private defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(this.updateBaseUrl(url), this.getRequestOptionsArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(this.updateBaseUrl(url), body, this.getRequestOptionsArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(this.updateBaseUrl(url), body, this.getRequestOptionsArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(this.updateBaseUrl(url), this.getRequestOptionsArgs(options));
    }

    private updateBaseUrl(url: string): string {
        if (url.indexOf('http://') != -1) {
            return url;
        } else {
            return BASE_URL + url;
        }
    }

    private getRequestOptionsArgs(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        if (AUTH.token != null) {
            options.headers.set('Authorization', 'Portador ' + AUTH.token);
        }

        return options;
    }
}
