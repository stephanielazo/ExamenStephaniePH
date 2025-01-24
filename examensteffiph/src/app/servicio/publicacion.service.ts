import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  private publicacionesSubject = new BehaviorSubject<any[]>([]);
  publicaciones$ = this.publicacionesSubject.asObservable();

  constructor() {
    this.cargarPublicaciones();
  }

  
  private async cargarPublicaciones() {
    const { value } = await Preferences.get({ key: 'avisos' });
    const publicaciones = value ? JSON.parse(value) : [];
    this.publicacionesSubject.next(publicaciones);
  }

  
  async agregarPublicacion(publicacion: any) {
    const publicaciones = this.publicacionesSubject.getValue();
    publicaciones.push(publicacion);

    
    await Preferences.set({
      key: 'avisos',
      value: JSON.stringify(publicaciones),
    });

    
    this.publicacionesSubject.next(publicaciones);
  }

  
  async eliminarPublicacion(id: number) {
    let publicaciones = this.publicacionesSubject.getValue();
    publicaciones = publicaciones.filter(pub => pub.id !== id);  

    
    await Preferences.set({
      key: 'avisos',
      value: JSON.stringify(publicaciones),
    });

    
    this.publicacionesSubject.next(publicaciones);
  }
}
