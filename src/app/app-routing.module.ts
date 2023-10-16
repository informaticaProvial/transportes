import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';
import { ControlUnidadesComponent } from './controlUnidades/controlUnidades.component';
import { ReportesComponent } from './reportes/reportes.component'; 
import { CantidadAsientosComponent } from './cantidad-asientos/cantidad-asientos.component';
import { IngresoOrdenComponent } from './ingreso-orden/ingreso-orden.component';


const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'controlUnidades', component: ControlUnidadesComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'asientos', component: CantidadAsientosComponent },
  { path: 'ingreso', component: IngresoOrdenComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



  
 }
