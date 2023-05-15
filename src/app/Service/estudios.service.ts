import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estudios } from '../Model/estudios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {
  estURL = 'https://arg-portfolio.onrender.com/estudios/';

  constructor( private httpClient: HttpClient) { }

  public lista(): Observable<Estudios[]> {
    return this.httpClient.get<Estudios[]>(this.estURL + 'lista');
  }
  public detalle(id: number): Observable<Estudios> {
    return this.httpClient.get<Estudios>(this.estURL + `detalle/${id}`)
  }
  public detalleName(nombre: string): Observable<Estudios>{
    return this.httpClient.get<Estudios>(this.estURL + `detalleName/${nombre}`);
  }
  public save(estudios : Estudios): Observable<any> {
    return this.httpClient.post<any>(this.estURL + 'crear', estudios);
  }
  public update(id: number, estudios : Estudios): Observable<any> {
    return this.httpClient.put<any>(this.estURL + `actualizar/${id}`, estudios);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.estURL + `eliminar/${id}`);
  }
  
}
