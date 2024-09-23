import { Component } from '@angular/core';
import { FireStorageService } from '../../Servicios/fire-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css'
})

export class JuegosComponent {
  imagenAhorcado: string | null = null;
  imagenDados: string | null = null;
  imagenPreguntados: string | null = null;
  imagenMayorMenor: string | null = null;
  spinner:boolean = false;

  constructor(private storageService: FireStorageService, public router:Router) { }

  async ngOnInit(): Promise<void> {
    this.spinner = true
    setTimeout(() =>{
      this.spinner = false
    },1500)
    this.imagenAhorcado = await this.obtenerImagen('Ahorcado.png');
    this.imagenDados = await this.obtenerImagen('dado.png');
    this.imagenMayorMenor = await this.obtenerImagen('MayorMenor.png');
    this.imagenPreguntados = await this.obtenerImagen('Preguntados.png');
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

  AbrirRuta(ruta:string){
    this.router.navigateByUrl(ruta);
  }
}
