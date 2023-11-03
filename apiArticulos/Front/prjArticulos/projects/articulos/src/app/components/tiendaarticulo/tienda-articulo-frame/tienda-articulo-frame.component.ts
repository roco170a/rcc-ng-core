import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiendaArticuloDataInterface } from 'projects/db-articulos/src/lib/models/tiendaArticuloDataInterface';
import { TiendaArticuloDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';
import { TiendaArticuloDetailComponent } from '../tienda-articulo-detail/tienda-articulo-detail.component';

@Component({
  selector: 'app-tienda-articulo-frame',
  templateUrl: './tienda-articulo-frame.component.html',
  styleUrls: ['./tienda-articulo-frame.component.css']
})
export class TiendaArticuloFrameComponent {

  arrSubscriptions: Subscription[] = [];
  dsTiendaArticulo:TiendaArticuloDataInterface[] = []

  displayedColumns: string[] = ['id','fecha','idTienda','idArticulo', 'actions'];

  constructor( private tiendaArticuloService: TiendaArticuloDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.operCargaInicial()
  }


  ngOnDestroy(): void {
    this.arrSubscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  operCargaInicial() {
    this.tiendaArticuloService.getTiendaArticuloAll().subscribe((rTiendaArticulo) => {
      this.dsTiendaArticulo = rTiendaArticulo;
    })
  }

  onEditTiendaArticulo(id: number) {    
    this.openDialog(id);
  }

  onAddTiendaArticulo(id: number) {    
    this.openDialog(0);
  }

  openDialog(_Id: number) {
    const dialogRef = this.dialog.open(TiendaArticuloDetailComponent, {
      data: { id: _Id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.operCargaInicial();
    });
  }

  onDelTiendaArticulo(_id: number) {    
    if (confirm("Eliminar el registro?:")) {
      this.tiendaArticuloService.delTiendaArticulo(_id).subscribe(res => {
        console.log(res);
        this.operCargaInicial();
      });
    }

  }


}
