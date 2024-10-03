import { Component, OnInit } from '@angular/core';
import { MayorMenorAPIService } from '../../Servicios/mayor-menor-api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { FireDatabaseService } from '../../Servicios/fire-database.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit{
  idMazo:string = "";
  cartas: any[] = [];
  valorDeCartas: string [] = [];
  intentos:number = 10;
  puntos:number = 0;
  desabilitarBotones: boolean = false;
  mostrarSegundaCarta: boolean = false;
  mostrarTooltip:boolean =false;
  blockearRejugar:boolean = true;
  usuarioLogeado: string|null =""

  constructor(private servicio: MayorMenorAPIService, 
    private router: Router, 
    private snackBar: MatSnackBar,
    public fireAuthService:FireAuthService,
    public fireDatabaseService:FireDatabaseService) { }

  ngOnInit(): void {
    this.servicio.ObtenerUnNuevoMazo().subscribe((r:any) =>{
      this.idMazo = r.deck_id;
      this.SacarCartas();
    })
    this.fireAuthService.getUserEmail().subscribe(email => {
      this.usuarioLogeado = email;
    });
  }

  SacarCartas(){
    this.servicio.ObtenerCartas(this.idMazo,2).subscribe((r:any) =>{
      this.cartas = r.cards
    });
  }

  EsMayor(){
    this.valorDeCartas = [];
    this.desabilitarBotones = true;
    this.cartas.forEach((carta: any) => {
      this.valorDeCartas.push(carta.value);
    });

    if (this.convertirValorCarta(this.valorDeCartas[1]) >= this.convertirValorCarta(this.valorDeCartas[0])) {
      this.puntos++;
      this.intentos--;
      this.mostrarSegundaCarta = true;
    } else {
      this.mostrarSegundaCarta = true;
      this.intentos--;
    }

    const temporal = this.cartas[0];
    this.cartas[0] = this.cartas[1];
    this.cartas[1] = temporal
    
    this.EstadoDelJuego();
    setTimeout(() => {
      if (this.intentos > 0) {  // Solo permitimos sacar carta si hay intentos restantes
        this.mostrarSegundaCarta = false;
        this.SacarNuevaCarta();
        this.desabilitarBotones = false;
      } else {
        this.desabilitarBotones = true;
      }
    }, 3000);
  }

  EsMenor(){
    this.valorDeCartas = [];
    this.desabilitarBotones = true;
    this.cartas.forEach((carta: any) => {
      this.valorDeCartas.push(carta.value);
    });

    if (this.convertirValorCarta(this.valorDeCartas[1]) <= this.convertirValorCarta(this.valorDeCartas[0])) {
      this.puntos++;
      this.intentos--;
      this.mostrarSegundaCarta = true;
    } else {
      this.mostrarSegundaCarta = true;
      this.intentos--;
    }

    const temporal = this.cartas[0];
    this.cartas[0] = this.cartas[1];
    this.cartas[1] = temporal
    
    this.EstadoDelJuego();
    setTimeout(() => {
      if (this.intentos >= 0) {
        this.mostrarSegundaCarta = false;
        this.SacarNuevaCarta();
        this.desabilitarBotones = false;
      } else {
        this.desabilitarBotones = true;
      }
    }, 3000);
  }

  convertirValorCarta(valor: string): number {
    if (valor === "ACE") return 14;
    if (valor === "KING") return 13;
    if (valor === "QUEEN") return 12;
    if (valor === "JACK") return 11;
    return parseInt(valor);  
  }

  SacarNuevaCarta() {
    this.servicio.ObtenerCartas(this.idMazo, 1).subscribe((r: any) => {
      this.cartas[1] = r.cards[0];
    });
  }

  EstadoDelJuego(){
    if(this.intentos == 0){
      this.blockearRejugar = false;
      this.AbrirSnackBar(`Obtuviste ${this.puntos} Puntos`);
      this.fireDatabaseService.CargarPosicion(this.usuarioLogeado,'mayor-menor',this.puntos)
    }
  }

  Volver(){
    this.RuteoHome();
  }

  RuteoHome(){
    this.router.navigate(['/Home']);
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar',{
      duration: 4000,
    });
  }

  mostrarTexto() {
    this.mostrarTooltip = true;
  }

  ocultarTexto() {
    this.mostrarTooltip = false;
  }

  CerrarSession(){
    this.fireAuthService.logout()
    this.RuteoHome()
    this.AbrirSnackBar('Se a cerrado la sesion');
  }

  JugarDeNuevo(){
    this.intentos = 10;
    this.puntos = 0;
    this.desabilitarBotones = false;
    this.blockearRejugar = true;
  }
}
