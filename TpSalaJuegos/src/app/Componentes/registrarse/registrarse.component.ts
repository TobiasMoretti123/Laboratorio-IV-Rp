import { Component } from '@angular/core';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../Clases/usuario';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  email: string = '';
  password: string = '';
  usuarioLogeado: Usuario = new Usuario (this.email,this.password,'','',0,0);
  mostrarTooltip: boolean = false;

  constructor(private authService: FireAuthService, private router: Router, public snackBar: MatSnackBar) {}

  Registrarse() {
    this.authService.register(this.email, this.password).subscribe(result => {
      if (result.success) {
        this.usuarioLogeado = new Usuario(this.email,this.password,'','',0,0);
        this.AbrirSnackBar('Usuario registrado: ' + this.email)
        this.router.navigate(['/Home']);
      } else {
        this.AbrirSnackBar(result.message || 'Error desconocido');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/Login']);
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar', {
      duration:2000,
    });
  }

  Volver(ruta: string){
    this.router.navigate([ruta]);
  }
}
