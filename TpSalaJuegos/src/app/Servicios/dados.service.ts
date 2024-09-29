import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private url:string = 'https://rolz.org/api/'; 

  constructor(private http:HttpClient) { }

  ObtenerDado(formula:string):Observable<number>{
    const url = `${this.url}?${formula}.json`;
    return this.http.get<number>(url);
  }
}
