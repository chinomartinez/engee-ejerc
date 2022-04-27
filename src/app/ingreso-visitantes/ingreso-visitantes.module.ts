import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoVisitantesRoutingModule } from './ingreso-visitantes-routing.module';
import { IngresoVisitantesComponent } from './ingreso-visitantes.component';
import { FormIngresoComponent } from './components/form-ingreso/form-ingreso.component';
import { TableIngresoComponent } from './components/table-ingreso/table-ingreso.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IngresoVisitantesComponent,
    FormIngresoComponent,
    TableIngresoComponent
  ],
  imports: [
    CommonModule,
    IngresoVisitantesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class IngresoVisitantesModule { }
