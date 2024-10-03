import { Component } from '@angular/core';
import { PaisesService } from '../../Servicios/paises.service';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FireDatabaseService } from '../../Servicios/fire-database.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  paisCorrecto: any;
  opciones: any[] = [];
  mensajeResultado: string = '';
  usuarioLogeado:string | null = "";
  mostrarTooltip:boolean = false;
  intentos:number = 10;
  puntos:number = 0;
  blockearRejugar:boolean = true;
  desabilitarBotones:boolean = false;
  mostrarBandera: boolean = true;
  
  constructor(
    private paisesService: PaisesService, 
    public fireAuthService: FireAuthService, 
    public snackBar: MatSnackBar, 
    public router: Router,
    public fireDatabase:FireDatabaseService) {}
  
  ngOnInit(): void {
    this.obtenerPaises();
    this.fireAuthService.getUserEmail().subscribe(email => {
      this.usuarioLogeado = email;
    });
  }
  
  obtenerPaises(): void {
    this.paisesService.ObtenerPaises().subscribe((paises) => {
      this.generarPregunta(paises);
      this.EstadoDelJuego();
    });
  }
  
  generarPregunta(paises: any[]): void {
    const indiceCorrecto = Math.floor(Math.random() * paises.length);
    this.paisCorrecto = paises[indiceCorrecto];
  
    const paisesFalsos = this.obtenerPaisesFalsos(paises, indiceCorrecto);
  
    this.opciones = this.mezclarOpciones([this.paisCorrecto, ...paisesFalsos]);
  }
  
  obtenerPaisesFalsos(paises: any[], indiceCorrecto: number): any[] {
    const paisesFalsos: any[] = [];
    while (paisesFalsos.length < 3) {
      const indiceAleatorio = Math.floor(Math.random() * paises.length);
      if (indiceAleatorio !== indiceCorrecto && !paisesFalsos.includes(paises[indiceAleatorio])) {
        paisesFalsos.push(paises[indiceAleatorio]);
      }
    }
    return paisesFalsos;
  }
  
  mezclarOpciones(opciones: any[]): any[] {
    return opciones.sort(() => Math.random() - 0.5);
  }
  
  verificarRespuesta(paisSeleccionado: any): void {
    if (paisSeleccionado.translations.spa.common === this.paisCorrecto.translations.spa.common) { 
      this.puntos++;
      this.intentos--;
      this.AbrirSnackBar('¡Correcto!');
      this.obtenerPaises();
    } else {
      this.intentos--;
      this.AbrirSnackBar('Incorrecto, la Bandera Seleccionada era de: ' + this.paisCorrecto.translations.spa.common); 
      this.obtenerPaises();
    }
  }
  
  Volver(){
    this.RuteoHome();
  }
  
  RuteoHome(){
    this.router.navigate(['/Home']);
  }
  
  AbrirSnackBar(mensaje: any) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000,
    });
  }
  
  mostrarTexto() {
    this.mostrarTooltip = true;
  }
  
  ocultarTexto() {
    this.mostrarTooltip = false;
  }
  
  CerrarSession() {
    this.fireAuthService.logout();
    this.RuteoHome();
    this.AbrirSnackBar('Se ha cerrado la sesión');
  }
  
  EstadoDelJuego() {
    if (this.intentos === 0) {
      this.mostrarBandera = false;
      this.blockearRejugar = false;
      this.desabilitarBotones = true;
      this.AbrirSnackBar(`Obtuviste ${this.puntos} puntos`);
      this.fireDatabase.CargarPosicion(this.usuarioLogeado,'preguntados',this.puntos);
    }
  }
  
  JugarDeNuevo() {
    this.intentos = 10;
    this.puntos = 0;
    this.desabilitarBotones = false;
    this.blockearRejugar = true;
    this.mostrarBandera = true;
    this.obtenerPaises();
  }
}
