import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { FireStorageService } from '../../Servicios/fire-storage.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent  implements OnInit{
  botones: string[] = 
  ['A','B','C','D','E','F','G','H','I','J',
  'K','L','M','N','O','P','Q','R','S',
  'T','U','V','W','X','Y','Z'];
  palabras: string [] = [
    'Mozart','Beethoven','Saglieri','Bach','Vivaldi',
    'Chopin','Pagaginini','Liszt','Brahms','Schubert',
    'Verdi','Wagner'
  ];
  palabraSeleccionada:string = "";
  palabraSeleccionadaPorLetra:string[] = [];
  letrasIncorrectas: string[] = [];
  letrasCorrectas: string[] = [];
  limiteDeErrores: number = 4;
  errores: number = 0;
  letraIngresada = '';
  esVictoria: boolean = false;
  torzo:boolean = false;
  cabeza:boolean = false;
  brazos:boolean = false;
  piernas:boolean = false;
  mostrarUsuario:boolean = false;
  mostrarHelp:boolean = false;
  blockearJugarDeNuevo:boolean = true;
  usuarioLogeado: string|null = "";
  imagenBrazos:string ="";
  imagenPiernas:string ="";
  imagenCabeza:string ="";
  imagenHorca:string ="";
  imagenTorzo:string ="";
  puntos:number = 0;

  constructor(public snackBar:MatSnackBar,public router:Router,public auth:FireAuthService,public storageService:FireStorageService){}

  CerrarSession(){
    this.auth.logout()
    this.AbrirSnackBar('Se a cerrado la sesion');
    this.RuteoHome();
  }

  async ngOnInit(): Promise<void> {
    this.palabraSeleccionada = this.palabras[Math.floor(Math.random() * this.palabras.length)].toUpperCase();
    this.palabraSeleccionadaPorLetra = this.palabraSeleccionada.split('');
    this.auth.getUserEmail().subscribe(email => {
      this.usuarioLogeado = email;
    });
    this.imagenTorzo = await this.obtenerImagen('torzo.png');
    this.imagenPiernas = await this.obtenerImagen('piernas.png');
    this.imagenHorca = await this.obtenerImagen('horca.png');
    this.imagenCabeza = await this.obtenerImagen('cabeza.png');
    this.imagenBrazos = await this.obtenerImagen('brazos.png');
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

  IngresarLetra(letra:string){
    this.letraIngresada = letra.toUpperCase();
    if(this.palabraSeleccionada.includes(letra)){
      this.letrasCorrectas.push(letra);
      this.puntos++;
    }else{
      this.letrasIncorrectas.push(letra);
      this.errores++;
    }
    this.EstadoDelJuego();
    this.ManejoErrores();
  }

  EstadoDelJuego(){
    const letrasPorDefecto = this.palabraSeleccionada.split('')
    .filter(letra => this.letrasCorrectas.includes(letra)).length;
    if(letrasPorDefecto === this.palabraSeleccionada.length){
      this.esVictoria = true;
      this.blockearJugarDeNuevo = false;
      this.AbrirSnackBar('Felicitaciones Ganaste '+ this.puntos +" Puntos");
    }
    else if (this.errores >= this.limiteDeErrores){
      this.esVictoria = false;
      this.blockearJugarDeNuevo = false;
      this.AbrirSnackBar('Perdiste, la palabra era: '+ this.palabraSeleccionada);
    }
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar',{
      duration: 2000,
    });
  }

  Volver(){
    this.RuteoHome();
  }

  RuteoHome(){
    this.router.navigate(['/Home']);
  }

  ManejoErrores(){
    switch (this.errores) {
      case 1:
        this.cabeza = true;
      break;
      case 2:
        this.torzo = true;
        break;
      case 3:
        this.brazos = true;
        break;
      case 4:
        this.piernas = true;
        break;
      default:
        break;
    }
  }

  ReiniciarJuego(){
    this.errores = 0;
    this.esVictoria = false;
    this.palabraSeleccionada = this.palabras[Math.floor(Math.random() * this.palabras.length)].toUpperCase();
    this.palabraSeleccionadaPorLetra = this.palabraSeleccionada.split('');
    this.letrasIncorrectas= [];
    this.letrasCorrectas= [];
    this.limiteDeErrores = 4;
    this.errores = 0;
    this.letraIngresada = '';
    this.torzo = false;
    this.cabeza = false;
    this.brazos= false;
    this.piernas= false; 
    this.puntos = 0;
  }

  MostrarHelp() {
    this.mostrarHelp = true;
  }

  OcultarHelp() {
    this.mostrarHelp = false;
  }

  MostrarUsuario() {
    this.mostrarUsuario = true;
  }

  OcultarUsuario() {
    this.mostrarUsuario = false;
  }

  Pista(){
    this.AbrirSnackBar('Es un compositor de musica clasica');
  }
}
