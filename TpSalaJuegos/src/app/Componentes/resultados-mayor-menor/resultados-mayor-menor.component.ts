import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FireDatabaseService } from '../../Servicios/fire-database.service';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resultados-mayor-menor',
  templateUrl: './resultados-mayor-menor.component.html',
  styleUrl: './resultados-mayor-menor.component.css'
})
export class ResultadosMayorMenorComponent {
  mostrarUsuario:boolean = false;
  posiciones: { juego:string,usuario: string, puntos: number, fecha: Timestamp }[] = [];
  usuarioLogeado: string | null ='';

  constructor(public fireDataBaseService:FireDatabaseService,
    public fireAuthService:FireAuthService,
    public router:Router, 
    public snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.fireDataBaseService.LeerPosiciones('mayor-menor');
    this.fireDataBaseService.objetos?.subscribe(posiciones => {
      this.posiciones = posiciones;
    });
    this.fireAuthService.getUserEmail().subscribe(email => {
      this.usuarioLogeado = email;
    });
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar',{
      duration: 2000,
    });
  }

  CerrarSession(){
    this.fireAuthService.logout();
    this.AbrirSnackBar('Se a cerrado la sesion');
    this.RuteoHome();
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
