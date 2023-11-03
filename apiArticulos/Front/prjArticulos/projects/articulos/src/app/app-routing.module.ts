import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloFrameComponent } from './components/articulo/articulo-frame/articulo-frame.component';
import { TiendaFrameComponent } from './components/tienda/tienda-frame/tienda-frame.component';
import { ClienteFrameComponent } from './components/cliente/cliente-frame/cliente-frame.component';
import { CarritoFrameComponent } from './components/carrito/carrito-frame/carrito-frame.component';
import { LoginFrameComponent } from './components/login/login-frame/login-frame.component';
import { ClienteArticuloFrameComponent } from './components/clientearticulo/cliente-articulo-frame/cliente-articulo-frame.component';
import { TiendaArticuloFrameComponent } from './components/tiendaarticulo/tienda-articulo-frame/tienda-articulo-frame.component';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { authGuard } from 'projects/db-articulos/src/lib/services/auth.guard';
import { CarritoDetalleFrameComponent } from './components/carritodetalle/carrito-detalle-frame/carrito-detalle-frame.component';

const routes: Routes = [
  { path: 'carritos', component: CarritoFrameComponent, canActivate: [authGuard], },
  { path: 'carrito-partidas', component: CarritoDetalleFrameComponent, canActivate: [authGuard], },
  { path: 'articulos', component: ArticuloFrameComponent, canActivate: [authGuard], },
  { path: 'tiendas', component: TiendaFrameComponent, canActivate: [authGuard], },
  { path: 'tienda-articulos', component: TiendaArticuloFrameComponent, canActivate: [authGuard], },
  { path: 'clientes', component: ClienteFrameComponent, canActivate: [authGuard], },
  { path: 'cliente-articulos', component: ClienteArticuloFrameComponent, canActivate: [authGuard], },
  { path: 'usuarios', component: LoginFrameComponent },
  { path: 'login', component: LoginDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
