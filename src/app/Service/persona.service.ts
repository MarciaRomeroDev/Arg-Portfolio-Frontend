import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../Model/persona';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {
perURL = 'https://arg-portfolio.onrender.com/persona/';

  constructor(private httpClient: HttpClient) { }
   //ponemos los metodos del backend controller
   public lista(): Observable<Persona[]>{
    return this.httpClient.get<Persona[]>(this.perURL + 'lista');
  }

  //cuando lleva parametro se utiliza `` y paso los parametros usando ${parametro}
  public detalle(id: number): Observable<Persona>{
    return this.httpClient.get<Persona>(this.perURL + `detalle/${id}`);
  }

  public save (persona: Persona): Observable<any>{
    return this.httpClient.post<any>(this.perURL + 'crear', persona);
  }

  public update (id: number, persona: Persona): Observable<any>{
    return this.httpClient.put<any>(this.perURL + `actualizar/${id}`, persona);
  }

  public delete (id: number): Observable<any>{
    return this.httpClient.delete<any>(this.perURL + `eliminar/${id}`);
  }
}
