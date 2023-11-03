import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiendaDataInterface } from 'projects/db-articulos/src/lib/models/TiendaDataInterface';
import { TiendaDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';
import { TiendaDetailComponent } from '../tienda-detail/tienda-detail.component';

@Component({
  selector: 'app-tienda-frame',
  templateUrl: './tienda-frame.component.html',
  styleUrls: ['./tienda-frame.component.css']
})
export class TiendaFrameComponent {
  arrSubscriptions: Subscription[] = [];
  dsTienda:TiendaDataInterface[] = []

  displayedColumns: string[] = ['id','sucursal','direccion', 'actions'];

  constructor( private TiendaService: TiendaDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.operCargaInicial()
  }


  ngOnDestroy(): void {
    this.arrSubscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  operCargaInicial() {
    this.TiendaService.getTiendaAll().subscribe((Tienda) => {
      this.dsTienda = Tienda;
    })
  }

  onEditTienda(id: number) {    
    this.openDialog(id);
  }

  onAddTienda(id: number) {    
    this.openDialog(0);
  }

  openDialog(_Id: number) {
    const dialogRef = this.dialog.open(TiendaDetailComponent, {
      data: { id: _Id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.operCargaInicial();
    });
  }

  onDelTienda(_id: number) {    
    if (confirm("Eliminar el registro?:")) {
      this.TiendaService.delTienda(_id).subscribe(res => {
        console.log(res);
        this.operCargaInicial();
      });
    }

  }
}
