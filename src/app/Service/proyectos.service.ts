
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../Model/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  URL = 'https://arg-portfolio.onrender.com/proyectos/';

  constructor(private httpClient : HttpClient) { }

  public lista(): Observable<Proyectos[]> {
    return this.httpClient.get<Proyectos[]>(this.URL + 'lista');
  }
  public detalle(id: number): Observable<Proyectos> {
    return this.httpClient.get<Proyectos>(this.URL + `detalle/${id}`)
  }
  public save(proyectos : Proyectos): Observable<any> {
    console.log('servicio'+ proyectos.url_imagen);
    return this.httpClient.post<any>(this.URL + 'crear', proyectos);
  }
  public update(id: number, proyectos : Proyectos): Observable<any> {
    return this.httpClient.put<any>(this.URL + `actualizar/${id}`,proyectos);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `eliminar/${id}`);
  }
}
