import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireDatabaseService } from '../../Servicios/fire-database.service';
import { FireAuthService } from '../../Servicios/fire-auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  mostrarUsuario:boolean = false;
  mensajes: { usuario: string, mensaje: string, fecha: Timestamp }[] = [];
  nuevoMensaje: string = '';
  usuarioLogeado: string | null ='';

  constructor(public fireDataBaseService:FireDatabaseService,public fireAuthService:FireAuthService,public router:Router, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fireDataBaseService.IniciarChat();
    this.fireDataBaseService.mensajes?.subscribe(mensajes => {
      this.mensajes = mensajes;
    });
    this.fireAuthService.getUserEmail().subscribe(email => {
      this.usuarioLogeado = email;
    });
  }

  CerrarSession(){
    this.fireAuthService.logout();
    this.AbrirSnackBar('Se a cerrado la sesion');
    this.RuteoHome();
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar',{
      duration: 2000,
    });
  }

  EnviarMensaje() {
    if (this.nuevoMensaje.trim() !== '') {
      this.fireDataBaseService.EnviarMensaje(this.usuarioLogeado,this.nuevoMensaje);
      this.nuevoMensaje = ''; 
      console.log(this.nuevoMensaje);
    }
  }

  Volver(){
    this.RuteoHome();
  }
  
  RuteoHome(){
    this.router.navigate(['/Home']);
  }

  ConvertirFecha(timestamp: any): Date {
    return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  }

  MostrarUsuario() {
    this.mostrarUsuario = true;
  }

  OcultarUsuario() {
    this.mostrarUsuario = false;
  }

  SobreMi(){
    this.router.navigate(['/QuienSoy']);
  }
}
