import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlUnidadesComponent } from './controlUnidades/controlUnidades.component';
import { ReportesComponent } from './reportes/reportes.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CantidadAsientosComponent } from './cantidad-asientos/cantidad-asientos.component';
import { EntradasComponent } from './entradas/entradas.component';
import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component';
import { PrincipalComponent } from './principal/principal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { IngresoOrdenComponent } from './ingreso-orden/ingreso-orden.component'; // Importa el módulo de paginación



@NgModule({
  declarations: [
    AppComponent,
    ControlUnidadesComponent,
    ReportesComponent,
    FooterComponent,
    HeaderComponent,
    CantidadAsientosComponent,
    EntradasComponent,
    DisponibilidadComponent,
    PrincipalComponent,
    IngresoOrdenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [FilterPipe  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
