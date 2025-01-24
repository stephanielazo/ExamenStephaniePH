import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences'; 
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; 
import { PublicacionService } from '../servicio/publicacion.service'; 
import { Router } from '@angular/router'; // 

@Component({
  selector: 'app-form-crear-aviso',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-crear-aviso.component.html',
  styleUrls: ['./form-crear-aviso.component.scss'],
})
export class FormCrearAvisoComponent implements OnInit {
  avisoForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    foto: [''],
  });

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private publicacionService: PublicacionService,  
    private router: Router 
  ) {}

  ngOnInit() {
    
  }

  
  async guardarAviso() {
    if (this.avisoForm.valid) {
      
      const aviso = {
        ...this.avisoForm.value,
        fecha: new Date().toISOString(),  
      };

     
      await this.publicacionService.agregarPublicacion(aviso);

      
      const { value } = await Preferences.get({ key: 'avisos' });
      const publicaciones = value ? JSON.parse(value) : [];  
      publicaciones.push(aviso);  
      await Preferences.set({
        key: 'avisos',
        value: JSON.stringify(publicaciones),  
      });

      
      this.mostrarToast('Aviso guardado exitosamente.');
      console.log('Aviso guardado:', aviso);

      
      this.avisoForm.reset();

      
      this.router.navigate(['/home']);
    } else {
      
      console.log('El formulario no es válido');
      this.mostrarToast('Por favor completa todos los campos correctamente.', 'danger');
    }
  }

  
  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      
      this.avisoForm.patchValue({ foto: image.dataUrl });
      console.log('Foto capturada:', image.dataUrl);
    } catch (error) {
      
      console.error('Error al tomar foto:', error);
      this.mostrarToast('No se pudo capturar la foto.', 'danger');
    }
  }

  
  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }

  
  get f() {
    return this.avisoForm.controls;
  }
}
