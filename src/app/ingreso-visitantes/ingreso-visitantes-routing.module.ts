import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoVisitantesComponent } from './ingreso-visitantes.component';

const routes: Routes = [
  {
    path: "", component: IngresoVisitantesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoVisitantesRoutingModule { }
