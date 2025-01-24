import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmacion-eliminar',
  templateUrl: './confirmacion-eliminar.component.html',
  styleUrls: ['./confirmacion-eliminar.component.scss'],
})
export class ConfirmacionEliminarComponent implements OnInit {
  
  @Input() public idPublicacion: string | null = null;  
  @Output() public confirmarEliminar: EventEmitter<boolean> = new EventEmitter();  

  constructor() { }

  ngOnInit() {}

  
  onConfirmar() {
    this.confirmarEliminar.emit(true);  
  }

  onCancelar() {
    this.confirmarEliminar.emit(false);  
  }
}
