import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ArticuloDataInterface } from 'projects/db-articulos/src/lib/models/articuloDataInterface';
import { ArticuloDataService } from 'projects/db-articulos/src/public-api';
import { Subscription, Observable } from 'rxjs';
import { ArticuloDetailComponent } from '../articulo-detail/articulo-detail.component';

@Component({
  selector: 'app-articulo-frame',
  templateUrl: './articulo-frame.component.html',
  styleUrls: ['./articulo-frame.component.css']
})
export class ArticuloFrameComponent implements OnInit {
  arrSubscriptions: Subscription[] = [];
  dsArticulo:ArticuloDataInterface[] = []

  displayedColumns: string[] = ['id','imagen','codigo','descripcion','precio','stock', 'actions'];

  constructor( private articuloService: ArticuloDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.operCargaInicial()
  }


  ngOnDestroy(): void {
    this.arrSubscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  operCargaInicial() {
    this.articuloService.getArticuloAll().subscribe((articulo) => {
      this.dsArticulo = articulo;
    })
  }

  onEditArticulo(id: number) {    
    this.openDialog(id);
  }

  onAddArticulo(id: number) {    
    this.openDialog(0);
  }

  openDialog(_Id: number) {
    const dialogRef = this.dialog.open(ArticuloDetailComponent, {
      data: { id: _Id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.operCargaInicial();
    });
  }

  onDelArticulo(_id: number) {    
    if (confirm("Eliminar el registro?:")) {
      this.articuloService.delArticulo(_id).subscribe(res => {
        console.log(res);
        this.operCargaInicial();
      });
    }

  }

  

}

