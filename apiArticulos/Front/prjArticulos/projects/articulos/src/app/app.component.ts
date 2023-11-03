import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ArticuloDataInterface } from 'projects/db-articulos/src/lib/models/articuloDataInterface';
import { ArticuloDataService, LoginDataService } from 'projects/db-articulos/src/public-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Articulos';
  sidenav_opened: boolean = false;
  sidenav_opened2: boolean = false;
  //result: CategoryDataInterface[] = [];

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  isExpanded2 = true;
  showSubmenu2: boolean = false;
  isShowing2 = false;
  showSubSubMenu2: boolean = false;


  @ViewChild('side1')
  sidenav1!: MatSidenav;

  @ViewChild('side2')
  sidenav2!: MatSidenav;

  constructor( 
    private articuloService: ArticuloDataService,
    private loginService: LoginDataService,
    @Inject(DOCUMENT) private document: Document,
    private responsive: BreakpointObserver,    
    private _router: Router
    ) {


    articuloService.getArticuloAll().subscribe(
      (articulos: ArticuloDataInterface[]) => {
        console.log(articulos);
      }
    )
  }


  ngAfterViewInit(): void {
    console.log(this.sidenav1.opened);


    this.sidenav1.closedStart.subscribe(
      res => { this.sidenav_opened = false }
    );

    this.sidenav1.openedStart.subscribe(
      res => { this.sidenav_opened = true }
    );

    this.sidenav2.closedStart.subscribe(
      res => { this.sidenav_opened2 = false }
    );

    this.sidenav2.openedStart.subscribe(
      res => { this.sidenav_opened2 = true }
    );

    setTimeout(() => {
      //this.sidenav1.toggle();
      //this.sidenav2.toggle();

      this.sidenav_opened = this.sidenav1.opened;
      this.sidenav_opened2 = this.sidenav2.opened;
    }, 1000)

  }

  onToggleSide1() {
    this.sidenav1.toggle();

  }

  onToggleSide2() {
    this.sidenav2.toggle();

  }


  onJumpRoot() {

    if (localStorage.getItem("token")) {
      this.document.location.href = 'https://localhost';
    }
  }

  
  onArticuloMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/articulos');
  }

  onTiendaMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/tiendas');
  }

  onClienteMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/clientes');
  }

  onCarritoMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/carritos');
  }

  onLoginMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/login');
  }

  onClienteArticuloMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/cliente-articulos');
  }

  onTiendaArticuloMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/tienda-articulos');
  }

  onUsuarioMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/usuarios');
  }

  onLogout() {
    this.loginService.logout();
  }

  onPartidasMenuSelect() {
    this.sidenav1.close()
    this._router.navigateByUrl('/carrito-partidas');
  }

}
