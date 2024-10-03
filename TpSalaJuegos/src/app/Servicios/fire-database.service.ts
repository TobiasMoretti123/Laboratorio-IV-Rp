import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query, where } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { addDoc } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Usuario } from '../Clases/usuario';

@Injectable({
  providedIn: 'root'
})

export class FireDatabaseService {

  objetos: Observable<any> | null = null;

  constructor(private firestore: Firestore) {}

  IniciarChat() {
    const colRef = collection(this.firestore, 'messages');
    const q = query(colRef, orderBy('fecha','asc'));
    this.objetos = collectionData(q);
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

  LeerPosiciones(juego: string) {
    const colRef = collection(this.firestore, 'posiciones');
    const q = query(colRef, 
      where('juego', '==', juego),  
      orderBy('puntos', 'desc')     
    );
    
    this.objetos = collectionData(q, { idField: 'id' });  
  }

  CargarPosicion(usuario: string | null | undefined, juego: string,puntos:number){
    const colRef = collection(this.firestore, 'posiciones');
    addDoc(colRef, {
      usuario: usuario,
      puntos: puntos,
      juego: juego,
      fecha: Timestamp.now()
    })
    .then(() => console.log('Mensaje enviado correctamente'))
    .catch(error => console.error('Error al enviar el mensaje:', error));
  }

  LeerEncuestas(){
    const colRef = collection(this.firestore, 'encuestas');
    const q = query(colRef, orderBy('nombre','desc'));
    this.objetos = collectionData(q);
  }

  CargarEncuestas(usuario:Usuario,comentario:string,juegosJugados:any,juegoFavorito:string){
    const colRef = collection(this.firestore, 'encuestas');
    addDoc(colRef, {
      usuario: {
        apellido: usuario.apellido,
        nombre: usuario.nombre,
        edad: usuario.edad,
        telefono: usuario.telefono,
      },
      comentario:comentario,
      juegosJugados:{
        ahorcado:juegosJugados.ahorcado,
        dado: juegosJugados.dado,
        preguntados: juegosJugados.preguntados,
        mayorMenor: juegosJugados.mayorMenor,
      },
      juegoFavorito: juegoFavorito
    })
    .then(() => console.log('Mensaje enviado correctamente'))
    .catch(error => console.error('Error al enviar el mensaje:', error));
  }
}
