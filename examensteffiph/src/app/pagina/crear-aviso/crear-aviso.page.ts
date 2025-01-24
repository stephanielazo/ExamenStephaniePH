import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-crear-aviso',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule], 
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
})
export class CrearAvisoPage {
  avisoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    
    this.avisoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      foto: [null, Validators.required],  
    });
  }

  
  get f() {
    return this.avisoForm.controls;
  }

  
  async tomarFoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      
      this.avisoForm.patchValue({ foto: photo.dataUrl });
    } catch (error) {
      console.error('Error al tomar foto', error);
      alert('Hubo un problema al intentar tomar la foto. Por favor, inténtalo de nuevo.');
    }
  }

  
  async guardarAviso() {
    if (this.avisoForm.valid) {
      const nuevaPublicacion = this.avisoForm.value;

      
      const { value } = await Preferences.get({ key: 'publicaciones' });
      const publicaciones = value ? JSON.parse(value) : [];
      publicaciones.push(nuevaPublicacion);

      
      await Preferences.set({
        key: 'publicaciones',
        value: JSON.stringify(publicaciones),
      });

      console.log('Publicación guardada:', nuevaPublicacion);

      
      this.router.navigate(['/home']);
    } else {
      alert('Por favor, complete todos los campos correctamente antes de guardar.');
    }
  }
}
