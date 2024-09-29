import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) { }

  ObtenerPaises(): Observable<any>{
    return this.http.get<any[]>(this.apiUrl);
  }

  ObtenerPaisesPorNombre(nombre: string): Observable<any> {
    const url = `https://restcountries.com/v3.1/name/${nombre}`;
    return this.http.get<any[]>(url);
  }
}
