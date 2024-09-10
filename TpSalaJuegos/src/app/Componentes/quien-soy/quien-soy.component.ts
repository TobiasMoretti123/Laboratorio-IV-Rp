import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent implements OnInit{
  urlImagen: Observable<string | null> | undefined;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {
    
    const rutaImagen = 'gs://tpsalajuegos-5930a.appspot.com/Untitled.png';
    const refImagen = this.storage.ref(rutaImagen);

    this.urlImagen = refImagen.getDownloadURL();
  }
}
