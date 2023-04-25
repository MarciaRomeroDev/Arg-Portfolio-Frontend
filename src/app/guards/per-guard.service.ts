import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../Service/token.service';

@Injectable({
  providedIn: 'root'
})
export class PerGuardService implements CanActivate{

  realRol: String;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

   const expectedRol  = route.data['expectedRol'];
   this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';
   
 if(!this.tokenService.isLogged() || !expectedRol.includes(this.realRol)){
    this.router.navigate(['/']);

    return false;
 }
 return true;
}
}

//esta clase la importamos en el app-routing  en indicamos en los componentes de las rutas cuales son los que tienen que estar logeados para acceder a ciertos recursos...ver app-routing.module.ts