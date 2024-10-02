import { Component } from '@angular/core';
import { DadosService } from '../../Servicios/dados.service';
import { Router } from '@angular/router';
import { FireAuthService } from '../../Servicios/fire-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireStorageService } from '../../Servicios/fire-storage.service';

@Component({
  selector: 'app-dado',
  templateUrl: './dado.component.html',
  styleUrl: './dado.component.css'
})
export class DadoComponent {
  botones:string[] = ['1','2','3','4','5','6'];
  dadoMostrado:number = 0;
  dadoTraido: any;
  valorSeleccionado: string = '';
  valorDelDado:number = 0;
  intentos: number = 10;
  puntos: number = 0;
  blockearBotones:boolean = false;
  mostrarDado:boolean = false;
  mostrarTooltip:boolean = false;
  blockearJugarDeNuevo:boolean = true;
  usuario:string | null= "";
  imagen0: string | null = null;
  imagen1: string | null = null;
  imagen2: string | null = null;
  imagen3: string | null = null;
  imagen4: string | null = null;
  imagen5: string | null = null;
  imagen6: string | null = null;

  constructor(private storageService:FireStorageService, private servicio: DadosService, private router:Router, public auth: FireAuthService, public snackBar: MatSnackBar){}


  async ngOnInit(): Promise<void> {
    this.LanzarDado();
    this.auth.getUserEmail().subscribe(email => {
      this.usuario = email;
    });
    this.imagen0 = await this.obtenerImagen('0.png');
    this.imagen1 = await this.obtenerImagen('1.png');
    this.imagen2 = await this.obtenerImagen('2.png');
    this.imagen3 = await this.obtenerImagen('3.png');
    this.imagen4 = await this.obtenerImagen('4.png');
    this.imagen5 = await this.obtenerImagen('5.png');
    this.imagen6 = await this.obtenerImagen('6.png');
  }

  CerrarSession(){
    this.auth.logout();
    this.AbrirSnackBar('Se a cerrado la sesion');
    this.RuteoHome();
  }

  mostrarTexto() {
    this.mostrarTooltip = true;
  }

  ocultarTexto() {
    this.mostrarTooltip = false;
  }

  AbrirSnackBar(mensaje:any){
    this.snackBar.open(mensaje, 'Cerrar',{
      duration: 2000,
      panelClass: ['my-snackbar']
    });
  }

  LanzarDado(){
    this.servicio.ObtenerDado('d6').subscribe((r)=>{
      this.dadoTraido = r;
      this.valorDelDado = this.dadoTraido.result
      this.mostrarDado = false;
    })
  }

  CompararDado(numero:string){
    this.valorSeleccionado = numero;
    if(this.valorDelDado.toString() === this.valorSeleccionado){
      this.intentos--;
      this.puntos++;
      this.AbrirSnackBar(`Se lanzo un ${this.valorDelDado}`);
    }else{
      this.intentos--;
      this.AbrirSnackBar(`Se lanzo un ${this.valorDelDado}`);
    }
    this.EstadoDelJuego();
    setTimeout(() => {
      this.LanzarDado();
      this.mostrarDado  = false;
      this.blockearBotones = false;
    }, 2000);
    this.blockearBotones = true;
    this.mostrarDado = true;
  }

  EstadoDelJuego(){
    if(this.intentos == 0){
      setTimeout(() => {
        this.AbrirSnackBar(`Obtuviste ${this.puntos} Puntos`);
        this.blockearJugarDeNuevo = false;
        this.mostrarDado  = false;
        this.blockearBotones = true;
      }, 2010);  
    }
  }

  Volver(){
    this.RuteoHome();
  }

  RuteoHome(){
    this.router.navigate(['/Home']);
  }

  ReiniciarJuego(){
    this.intentos = 10;
    this.puntos = 0;
    this.mostrarDado  = false;
    this.blockearBotones = false;
    this.blockearJugarDeNuevo = true;
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
}
