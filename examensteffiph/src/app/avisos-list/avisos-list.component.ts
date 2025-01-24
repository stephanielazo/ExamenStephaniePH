import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../servicio/publicacion.service';  
import { Publicacion } from '../interface/publicacion.interface';

@Component({
  selector: 'app-avisos-list',
  standalone: true,
  imports: [
    IonButton, 
    IonIcon,
    IonContent,
    RouterModule,
    CommonModule,  
  ],
  templateUrl: './avisos-list.component.html',
  styleUrls: ['./avisos-list.component.scss'],
})
export class AvisosListComponent implements OnInit {
  publicaciones: Publicacion[] = [];  

  constructor(private publicacionService: PublicacionService) {}  

  async ngOnInit() {
    
    this.publicacionService.publicaciones$.subscribe(publicaciones => {
      this.publicaciones = publicaciones;
    });
  }

  
  async eliminarPublicacion(id: number) {
    console.log('Publicación eliminada:', id);
    
    
    await this.publicacionService.eliminarPublicacion(id);
  }

  
  async agregarPublicacion() {
    const nuevaPublicacion: Publicacion = {
      id: this.publicaciones.length + 1,  
      titulo: 'Nueva publicación',
      descripcion: 'Descripción de prueba',
      fecha: new Date().toISOString(),
      imagen: 'assets/img/default.jpg'
    };

    
    await this.publicacionService.agregarPublicacion(nuevaPublicacion);

    console.log('Nueva publicación agregada:', nuevaPublicacion);
  }
}
