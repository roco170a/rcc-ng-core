import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoDetalleDataInterface } from 'projects/db-articulos/src/lib/models/carritoDetalleDataInterface';
import { CarritoDetalleDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';
import { CarritoDetalleDetailComponent } from '../carrito-detalle-detail/carrito-detalle-detail.component';

@Component({
  selector: 'app-carrito-detalle-frame',
  templateUrl: './carrito-detalle-frame.component.html',
  styleUrls: ['./carrito-detalle-frame.component.css']
})
export class CarritoDetalleFrameComponent {
  arrSubscriptions: Subscription[] = [];
  dsCarritoDetalle:CarritoDetalleDataInterface[] = []

  displayedColumns: string[] = ['id','idCarrito','idTiendaArticulo','cantidad','total', 'actions'];

  constructor( private carritoDetalleService: CarritoDetalleDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.operCargaInicial()
  }


  ngOnDestroy(): void {
    this.arrSubscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  operCargaInicial() {
    this.carritoDetalleService.getCarritoDetalleAll().subscribe((rCarritoDetalle) => {
      this.dsCarritoDetalle = rCarritoDetalle;
    })
  }

  onEditCarritoDetalle(id: number) {    
    this.openDialog(id);
  }

  onAddCarritoDetalle(id: number) {    
    this.openDialog(0);
  }

  openDialog(_Id: number) {
    const dialogRef = this.dialog.open(CarritoDetalleDetailComponent, {
      data: { id: _Id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.operCargaInicial();
    });
  }

  onDelCarritoDetalle(_id: number) {    
    if (confirm("Eliminar el registro?:")) {
      this.carritoDetalleService.delCarritoDetalle(_id).subscribe(res => {
        console.log(res);
        this.operCargaInicial();
      });
    }

  }
}
