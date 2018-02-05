import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthRequestOptions implements  HttpInterceptor  {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            headers: req.headers.set('Content-Type', "application/x-www-form-urlencoded; charset=UTF-8"),
            withCredentials:true
        });
        return <any>next.handle(req).pipe(map((event: HttpEvent<any>) => {
            // if(event.type == 0){
            //     console.log("loading start")
            // }
            // if(event.type == 4){
            //     console.log("loading end")
            // }
            // if (event instanceof HttpResponse) {
            //
            // }
            return event;
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {

                }
            }
        }));
    }
}