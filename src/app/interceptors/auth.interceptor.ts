import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    // Inject the current `AuthService` and use it to get an authentication token:
    const authToken = localStorage.getItem('token');
    // Clone the request to add the authentication header.
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${authToken}`),
    });
   
    return next(newReq);
  }