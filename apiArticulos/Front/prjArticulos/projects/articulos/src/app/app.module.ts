import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbArticulosModule } from 'projects/db-articulos/src/public-api';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialControlsModule } from './modules/material-controls.module';
import { ArticuloFrameComponent } from './components/articulo/articulo-frame/articulo-frame.component';
import { ArticuloDetailComponent } from './components/articulo/articulo-detail/articulo-detail.component';
import { CarritoFrameComponent } from './components/carrito/carrito-frame/carrito-frame.component';
import { CarritoDetailComponent } from './components/carrito/carrito-detail/carrito-detail.component';
import { CarritoDetalleFrameComponent } from './components/carritodetalle/carrito-detalle-frame/carrito-detalle-frame.component';
import { CarritoDetalleDetailComponent } from './components/carritodetalle/carrito-detalle-detail/carrito-detalle-detail.component';
import { ClienteFrameComponent } from './components/cliente/cliente-frame/cliente-frame.component';
import { ClienteDetailComponent } from './components/cliente/cliente-detail/cliente-detail.component';
import { ClienteArticuloFrameComponent } from './components/clientearticulo/cliente-articulo-frame/cliente-articulo-frame.component';
import { ClienteArticuloDetailComponent } from './components/clientearticulo/cliente-articulo-detail/cliente-articulo-detail.component';
import { LoginFrameComponent } from './components/login/login-frame/login-frame.component';
import { LoginDetailComponent } from './components/login/login-detail/login-detail.component';
import { TiendaFrameComponent } from './components/tienda/tienda-frame/tienda-frame.component';
import { TiendaDetailComponent } from './components/tienda/tienda-detail/tienda-detail.component';
import { TiendaArticuloFrameComponent } from './components/tiendaarticulo/tienda-articulo-frame/tienda-articulo-frame.component';
import { TiendaArticuloDetailComponent } from './components/tiendaarticulo/tienda-articulo-detail/tienda-articulo-detail.component';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticuloFrameComponent,
    ArticuloDetailComponent,
    CarritoFrameComponent,
    CarritoDetailComponent,
    CarritoDetalleFrameComponent,
    CarritoDetalleDetailComponent,
    ClienteFrameComponent,
    ClienteDetailComponent,
    ClienteArticuloFrameComponent,
    ClienteArticuloDetailComponent,
    LoginFrameComponent,
    LoginDetailComponent,
    TiendaFrameComponent,
    TiendaDetailComponent,
    TiendaArticuloFrameComponent,
    TiendaArticuloDetailComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DbArticulosModule.forRoot({configuration: {url : environment.urlBackEnd}}),
    BrowserAnimationsModule,
    MaterialControlsModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
