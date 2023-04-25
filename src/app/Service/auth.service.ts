import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../Model/jwt-dto';
import { LoginUsuario } from '../Model/login-usuario';
import { NuevoUsuario } from '../Model/nuevo-usuario';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) { }



  public nuevo (nuevoUsuario : NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login (loginUsuario : LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

  //implementacion refresh-token 
  public refresh (jwtDTO: JwtDTO): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'refresh', jwtDTO);
  }

}
