import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router) { }


  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    const token = this.getToken();
    if (!token || token === null || token === 'null') {
      return false;
    }
   
    return true;
  }

  public getUserName(): string | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();    
    const payload = token.split('.')[1]; //con split divido el token en un string a partir del .
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub; //obtenemos el nombreDeUsuario a partir del token, que se encuentra en sub.
    return username;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles; //obtenemos los roles que se guarda en dicha variable en el jwt
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }


  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }
}
