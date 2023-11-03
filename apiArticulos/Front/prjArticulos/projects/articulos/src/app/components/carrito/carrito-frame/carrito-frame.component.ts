import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoDataInterface } from 'projects/db-articulos/src/lib/models/carritoDataInterface';
import { CarritoDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';
import { CarritoDetailComponent } from '../carrito-detail/carrito-detail.component';

@Component({
  selector: 'app-carrito-frame',
  templateUrl: './carrito-frame.component.html',
  styleUrls: ['./carrito-frame.component.css']
})
export class CarritoFrameComponent {
  arrSubscriptions: Subscription[] = [];
  dsCarrito:CarritoDataInterface[] = []

  displayedColumns: string[] = ['id','idCliente','envio', 'actions'];

  constructor( private carritoService: CarritoDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.operCargaInicial()
  }


  ngOnDestroy(): void {
    this.arrSubscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  operCargaInicial() {
    this.carritoService.getCarritoAll().subscribe((rCarrito) => {
      this.dsCarrito = rCarrito;
    })
  }

  onEditCarrito(id: number) {    
    this.openDialog(id);
  }

  onAddCarrito(id: number) {    
    this.openDialog(0);
  }

  openDialog(_Id: number) {
    const dialogRef = this.dialog.open(CarritoDetailComponent, {
      data: { id: _Id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.operCargaInicial();
    });
  }

  onDelCarrito(_id: number) {    
    if (confirm("Eliminar el registro?:")) {
      this.carritoService.delCarrito(_id).subscribe(res => {
        console.log(res);
        this.operCargaInicial();
      });
    }

  }
}
