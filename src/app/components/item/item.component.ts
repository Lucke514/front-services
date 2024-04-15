import { Component, Input, input } from '@angular/core';
import { Service } from '@interfaces/services';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input({required : true}) item : Service = {
    descripcion_estado: '',
    descripcion_servicio : '',
    fecha_creacion_servicio : new Date(),
    id_estado : 0,
    id_servicio : 0,
    id_tipo : 0,
    imagen_servicio : '',
    nombre_tipo_servicio : '',
    precio_servicio : 0
  };
}
