import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FireAuthService } from '../../Servicios/fire-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  mostrarTooltip: boolean = false;
  usuarioLogeado: string|null = "";
  abreRegistro:boolean = false;
  
  constructor(public authService:FireAuthService,public router:Router,public snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.authService.getUserEmail().subscribe(email => {
      this.usuarioLogeado = email;
    });
  }

  CerrarSession(){
    this.authService.logout();
    this.AbrirSnackBar('Se a cerrado la sesion');
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar',{
      duration: 2000,
    });
  }

  AbrirRegistro(abreRegistro:boolean){
    this.abreRegistro = abreRegistro;
  }
  
  mostrarTexto() {
    this.mostrarTooltip = true;
  }

  ocultarTexto() {
    this.mostrarTooltip = false;
  }

  AbrirRuta(ruta: string){
    this.router.navigate([ruta]);
  }
}
