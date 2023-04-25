import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, Observable, retry, throwError } from 'rxjs';
import { JwtDTO } from '../Model/jwt-dto';
import { AuthService } from '../Service/auth.service';
import { TokenService } from '../Service/token.service';

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class PerInterceptorService implements HttpInterceptor {

  constructor( 
    private tokenService: TokenService,
    private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();

      intReq = this.addToken(req, token);
    
      //implementacion refresh-token
  return next.handle(intReq).pipe(catchError((err: HttpErrorResponse)=>{
    if (err.status === 401){
      const jwtDTO:  JwtDTO = new JwtDTO(this.tokenService.getToken());
      return this.authService.refresh(jwtDTO).pipe(concatMap((data:any) => {
        console.log('refreshing...');
        this.tokenService.setToken(data.token);
        intReq = this.addToken(req, data.token);
        return next.handle(intReq);
      }));
    } else if(err.status === 403) {
      this.tokenService.logOut();
      return throwError(err);
    } else{
      return throwError(err);
    }
  }));
  }

  private addToken (req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', ' Bearer ' + token)});

  }
  
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: PerInterceptorService, multi: true }];
