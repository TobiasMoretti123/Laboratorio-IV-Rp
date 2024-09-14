import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { addDoc, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Usuario } from '../../Clases/usuario';

@Component({
  selector: 'app-fire-login',
  templateUrl: './fire-login.component.html',
  styleUrl: './fire-login.component.css'
})
export class FireLoginComponent {
  coleccionLogin:any[] =[];
  usuario: Usuario = new Usuario("","");
  contadorLog:number = 0;
  private sub!:Subscription;

  constructor(private firestore:Firestore){}

  Login(){
    let col = collection(this.firestore,'logins');
    addDoc(col,{ fecha:new Date(), "user":this.usuario})
  }

  GetData(){
    let col = collection(this.firestore,'logins');
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta:any)=>{
      this.coleccionLogin = respuesta;
      this.contadorLog = this.coleccionLogin.length;
      console.log(respuesta);
    })
  }
}
