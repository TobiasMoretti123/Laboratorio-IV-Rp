import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { addDoc } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {

  mensajes: Observable<any> | null = null;
  nuevoMensaje: string = '';

  constructor(private firestore: Firestore) {}

  IniciarChat() {
    const colRef = collection(this.firestore, 'messages');
    const q = query(colRef, orderBy('fecha','asc'));
    this.mensajes = collectionData(q);
  }
  
  EnviarMensaje(usuario: string | null | undefined, mensaje: string) {
    const colRef = collection(this.firestore, 'messages');
    addDoc(colRef, {
      usuario: usuario,
      mensaje: mensaje,
      fecha: Timestamp.now()
    })
    .then(() => console.log('Mensaje enviado correctamente'))
    .catch(error => console.error('Error al enviar el mensaje:', error));
  }
}
