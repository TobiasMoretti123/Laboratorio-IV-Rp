import { Component } from '@angular/core';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../Clases/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  usuarioLogeado: Usuario = new Usuario (this.email,this.password,'','',0,0);

  constructor(private authService: FireAuthService, private router: Router, public snackBar: MatSnackBar) {}

  Login() {
    this.authService.login(this.email, this.password).subscribe(result => {
      if (result.success) {
        this.usuarioLogeado = new Usuario(this.email,this.password,'','',0,0);
        this.AbrirSnackBar('Usuario logueado: ' + this.email);
        this.router.navigate(['/Home']);
      } else {
        this.AbrirSnackBar(result.message || 'Error desconocido');
      }
    });
  }

  IngresoRapido(email: string, contraseña: string){
    this.email = email;
    this.password = contraseña;
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar', {
      duration:2000,
    });
  }
}
