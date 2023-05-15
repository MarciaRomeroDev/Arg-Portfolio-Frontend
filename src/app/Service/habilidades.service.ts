import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Habilidades } from '../Model/habilidades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  URL =  'https://arg-portfolio.onrender.com/habilidades/';

  constructor(private httpClient : HttpClient) { }

  public lista(): Observable<Habilidades[]> {
    return this.httpClient.get<Habilidades[]>(this.URL + 'lista');
  }
  public detalle(id: number): Observable<Habilidades> {
    return this.httpClient.get<Habilidades>(this.URL+ `detalle/${id}`)
  }
 
  public save(habilidades : Habilidades): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'crear', habilidades);
  }
  public update(id: number, habilidades : Habilidades): Observable<any> {
    return this.httpClient.put<any>(this.URL + `actualizar/${id}`, habilidades);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `eliminar/${id}`);
  }
}
