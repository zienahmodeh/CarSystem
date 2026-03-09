import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class HTTPStatus {
    private requestInFlight$: BehaviorSubject<boolean>;

    constructor() {
        this.requestInFlight$ = new BehaviorSubject<boolean>(false);
    }

    setHttpStatus(inFlight: boolean) {
        this.requestInFlight$.next(inFlight);
    }

    getHttpStatus(): Observable<boolean> {
        return this.requestInFlight$.asObservable();
    }
}

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

    public constructor(private status: HTTPStatus) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let endpointUrl = req.url;

        if (!req.url.startsWith('http') && !req.url.includes(environment.BOLink)) {
            endpointUrl = environment.BOLink + '/api/' + req.url;
        }

        this.status.setHttpStatus(true);

        const clonedReq = req.clone({
            url: endpointUrl,
            setHeaders: {
                'X-API-LANGUAGE': localStorage.getItem('lang') || 'en'
            }
        });

        return next.handle(clonedReq)
            .pipe(
                catchError(error => {
                    return observableThrowError(error);
                }),
                finalize(() => {
                    this.status.setHttpStatus(false);
                })
            );
    }
}