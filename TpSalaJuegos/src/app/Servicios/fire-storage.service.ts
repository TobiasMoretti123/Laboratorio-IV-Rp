import { Injectable } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private storage: Storage) { }

  getImageUrl(path: string): Observable<string> {
    const fileRef = ref(this.storage, path);

    return from(getDownloadURL(fileRef)).pipe(
      map(url => url), 
      catchError(error => {
        console.error('Error al obtener la URL de la imagen:', error);
        return of('');
      })
    );
  }
}
