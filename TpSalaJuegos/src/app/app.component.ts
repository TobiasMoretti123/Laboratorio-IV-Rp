import { Component, OnInit } from '@angular/core';
import { FireStorageService } from './Servicios/fire-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'TpSalaJuegos';
  imagenFondo: string = "";

  constructor(private storageService: FireStorageService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.imagenFondo = await this.ObtenerImagen('Fondo Sala Juegos.png');
      if (this.imagenFondo) {
        document.body.style.backgroundImage = `url(${this.imagenFondo})`;
        document.body.style.backgroundSize = 'cover'; // Ajusta la imagen al tamaño del viewport
        document.body.style.backgroundPosition = 'center'; // Centra la imagen
        document.body.style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
      }
    } catch (error) {
      console.error('Error al configurar la imagen de fondo:', error);
    }
  }

  ObtenerImagen(path: string): Promise<string> {
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
