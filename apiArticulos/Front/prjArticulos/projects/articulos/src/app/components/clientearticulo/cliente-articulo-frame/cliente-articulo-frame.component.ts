import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteArticuloDataInterface } from 'projects/db-articulos/src/lib/models/clienteArticuloDataInterface';
import { ClienteArticuloDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';
import { ClienteArticuloDetailComponent } from '../cliente-articulo-detail/cliente-articulo-detail.component';

@Component({
  selector: 'app-cliente-articulo-frame',
  templateUrl: './cliente-articulo-frame.component.html',
  styleUrls: ['./cliente-articulo-frame.component.css']
})
export class ClienteArticuloFrameComponent {
  arrSubscriptions: Subscription[] = [];
  dsClienteArticulo:ClienteArticuloDataInterface[] = []

  displayedColumns: string[] = ['id','fecha','idCliente','idArticulo', 'actions'];

  constructor( private clienteArticuloService: ClienteArticuloDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.operCargaInicial()
  }


  ngOnDestroy(): void {
    this.arrSubscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  operCargaInicial() {
    this.clienteArticuloService.getClienteArticuloAll().subscribe((rClienteArticulo) => {
      this.dsClienteArticulo = rClienteArticulo;
    })
  }

  onEditClienteArticulo(id: number) {    
    this.openDialog(id);
  }

  onAddClienteArticulo(id: number) {    
    this.openDialog(0);
  }

  openDialog(_Id: number) {
    const dialogRef = this.dialog.open(ClienteArticuloDetailComponent, {
      data: { id: _Id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.operCargaInicial();
    });
  }

  onDelClienteArticulo(_id: number) {    
    if (confirm("Eliminar el registro?:")) {
      this.clienteArticuloService.delClienteArticulo(_id).subscribe(res => {
        console.log(res);
        this.operCargaInicial();
      });
    }

  }

}
