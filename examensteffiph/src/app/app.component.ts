import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; 
import { add, settingsOutline, trashOutline } from 'ionicons/icons'; 
import { addIcons } from 'ionicons'; 
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, RouterModule],  
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor() {
    
    addIcons({
      add,
      settingsOutline,
      trashOutline
    });
  }
}
