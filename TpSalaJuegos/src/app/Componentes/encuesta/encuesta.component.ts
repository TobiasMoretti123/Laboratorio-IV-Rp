import { Component } from '@angular/core';
import { FireDatabaseService } from '../../Servicios/fire-database.service';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../Clases/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlMenosUnoValidator } from '../../Validadores/AlMenosUnoValidator.Validator';
import { RadioSelectedValidator } from '../../Validadores/RadioSelectedValidator.Validator';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {
  encuestaForm!:FormGroup;
  paisSeleccionado!:any;
  usuarioLogeado: Usuario = new Usuario('','','','',0,0);
  mostrarUsuario:boolean = false;

  constructor(private fireDatabaseService:FireDatabaseService,public fireAuthService:FireAuthService,public snackBar: MatSnackBar,private router:Router){}

  ngOnInit(): void {
    this.fireAuthService.getUserEmail().subscribe(email => {
      this.usuarioLogeado.mail = email;
    });
    this.encuestaForm = new FormGroup({
      nombre: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]),
      apellido: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]),
      edad: new FormControl("",[Validators.required,Validators.min(18),Validators.max(99)]),
      telefono: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      comentarios: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]),
      juegoFavorito: new FormControl("", RadioSelectedValidator()),
      juegosJugados:  new FormGroup({
        ahorcado: new FormControl(false), 
        mayorMenor: new FormControl(false),
        preguntados: new FormControl(false),
        dado: new FormControl(false)
      }, { validators: AlMenosUnoValidator() }),
    });
  }
  
  CargarEncuentas(){
    if (this.encuestaForm.valid) {
      const nombre = this.encuestaForm.get('nombre')?.value;
      const apellido = this.encuestaForm.get('apellido')?.value;
      const edad = this.encuestaForm.get('edad')?.value;
      const telefono = this.encuestaForm.get('telefono')?.value;
      const juegoFavorito = this.encuestaForm.get('juegoFavorito')?.value;
      const juegosJugados = this.encuestaForm.get('juegosJugados')?.value;
      const comentarios = this.encuestaForm.get('comentarios')?.value;

      const datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        telefono: telefono,
      };

      const juegoJugados = {
        ahorcado:juegosJugados.ahorcado,
        dado:juegosJugados.dado,
        mayorMenor:juegosJugados.mayorMenor,
        preguntados:juegosJugados.preguntados,
      }
  
      if(this.usuarioLogeado ){
        console.log(juegoFavorito);
        this.fireDatabaseService.CargarEncuestas(datosUsuario,comentarios,juegoJugados,juegoFavorito)
      }
    }
  }
  
  CargarUsuario(nombre: string, apellido: string, edad: number, telefono: number) {
    this.usuarioLogeado.nombre = nombre;
    this.usuarioLogeado.apellido = apellido;
    this.usuarioLogeado.edad = edad;
    this.usuarioLogeado.telefono = telefono;
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

  esInvalido() {
    return this.encuestaForm.get('juegoFavorito')?.invalid && this.encuestaForm.get('juegoFavorito')?.touched;
  }

  Volver(){
    this.RuteoHome();
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

  SobreMi(){
    this.router.navigate(['/QuienSoy']);
  }

  get nombre() { return this.encuestaForm.get('nombre'); }
  get apellido() { return this.encuestaForm.get('apellido'); }
  get edad() { return this.encuestaForm.get('edad'); }
  get telefono() { return this.encuestaForm.get('telefono'); }
  get juegoFavorito() {return this.encuestaForm.get('juegoFavorito');}
  get comentarios() { return this.encuestaForm.get('comentarios'); }
  get juegosJugados() {return this.encuestaForm.get('juegosJugados');}
}
