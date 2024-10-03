import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireStorageService } from '../../Servicios/fire-storage.service';
import { Usuario } from '../../Clases/usuario';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent implements OnInit {
  mostrarSpinner:boolean = false;
  mostrarUsuario:boolean = false;
  imagenAlumno: string = "";
  usuario:Usuario = new Usuario("","",'','',0,0)

  constructor(public router: Router, public authService: FireAuthService,public storageService:FireStorageService, public snackBar: MatSnackBar){}

  Volver(){
    this.RuteoHome();
  }

  async ngOnInit(): Promise<void> {
    this.authService.getUserEmail().subscribe(email => {
      this.usuario.mail = email;
    });
    this.imagenAlumno = await this.obtenerImagen('Untitled.png');
  }

  CerrarSession(){
    this.authService.logout();
    this.AbrirSnackBar('Se a cerrado la sesion');
    this.RuteoHome();
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar',{
      duration: 2000,
    });
  }

  obtenerImagen(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storageService.getImageUrl(path).subscribe({
        next: (url: string) => resolve(url),
        error: (err) => {
          console.error('Error al obtener la URL de la imagen:', err);
          resolve(''); 
        }
      });
    });
  }
  
  RuteoHome(){
    this.router.navigate(['/Home']);
  }

  MostrarUsuario() {
    this.mostrarUsuario = true;
  }

  OcultarUsuario() {
    this.mostrarUsuario = false;
  }

  /*Chat(){
    this.router.navigate(['/chat']);
  }*/
}
