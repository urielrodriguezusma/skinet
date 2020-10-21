import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private toastr: ToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((servErr) => {
                if (servErr) {
                    if (servErr.status === 422) {
                        throw servErr.error;
                    }
                    if (servErr.status === 400) {
                        this.toastr.error(servErr.error.message, servErr.error.statusCode);
                    }
                    if (servErr.status === 404) {
                        this.router.navigate(['not-found']);
                    }
                    if (servErr.status === 500) {
                        const navigationExtras: NavigationExtras = { state: { error: servErr.error } };
                        this.router.navigate(['server-error'], navigationExtras);
                    }
                }
                return throwError(servErr);
            })
        );
    }

}
