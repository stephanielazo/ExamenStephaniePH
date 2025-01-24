import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { AvisosListComponent } from './avisos-list/avisos-list.component';
import { ConfirmacionEliminarComponent } from './confirmacion-eliminar/confirmacion-eliminar.component';
import { CrearAvisoPage } from './pagina/crear-aviso/crear-aviso.page';  

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',  
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,  
  },
  {
    path: 'crear-aviso',
    component: CrearAvisoPage,  
  },
  {
    path: 'avisos-list',
    component: AvisosListComponent,  
  },
  {
    path: 'confirmacion-eliminar',
    component: ConfirmacionEliminarComponent,  
  },
];
