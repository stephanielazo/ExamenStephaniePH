import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { FechaPipe } from '../pipes/fecha.pipe';
import { ConfirmacionEliminarComponent } from '../confirmacion-eliminar/confirmacion-eliminar.component'; // Importa el componente del modal

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterModule,
    FechaPipe,
    ConfirmacionEliminarComponent 
  ],
})
export class HomePage {
  publicaciones = [
    {
      id: 1,
      titulo: 'Mascota perdida',
      fecha: '2024-01-18',
      imagen: 'assets/img/mascota.jpg'
    },
    {
      id: 2,
      titulo: 'Cédula encontrada',
      fecha: '2024-01-09',
      imagen: 'assets/img/cedula.jpg'
    }
  ];

  mostrarModal: boolean = false;  
  idPublicacionAEliminar: string | null = null;  

  constructor() {}

  
  abrirModalEliminar(id: number) {
    this.idPublicacionAEliminar = id.toString();  
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.idPublicacionAEliminar = null;
  }

  
  eliminarPublicacion(id: string) {
    this.publicaciones = this.publicaciones.filter(pub => pub.id.toString() !== id);
  }

  
  manejarConfirmacionEliminar(confirmado: boolean) {
    if (confirmado && this.idPublicacionAEliminar !== null) {
      this.eliminarPublicacion(this.idPublicacionAEliminar);  
    }
    this.cerrarModal();  
  }
}
