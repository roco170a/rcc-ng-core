import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDataInterface } from 'projects/db-articulos/src/lib/models/clienteDataInterface';
import { ClienteDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';
import { ClienteDetailComponent } from '../cliente-detail/cliente-detail.component';

@Component({
  selector: 'app-cliente-frame',
  templateUrl: './cliente-frame.component.html',
  styleUrls: ['./cliente-frame.component.css']
})
export class ClienteFrameComponent {

  arrSubscriptions: Subscription[] = [];
  dsCliente:ClienteDataInterface[] = []

  displayedColumns: string[] = ['id','nombre','apellidos','direccion', 'actions'];

  constructor( private clienteService: ClienteDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.operCargaInicial()
  }


  ngOnDestroy(): void {
    this.arrSubscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  operCargaInicial() {
    this.clienteService.getClienteAll().subscribe((rCliente) => {
      this.dsCliente = rCliente;
    })
  }

  onEditCliente(id: number) {    
    this.openDialog(id);
  }

  onAddCliente(id: number) {    
    this.openDialog(0);
  }

  openDialog(_Id: number) {
    const dialogRef = this.dialog.open(ClienteDetailComponent, {
      data: { id: _Id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.operCargaInicial();
    });
  }

  onDelCliente(_id: number) {    
    if (confirm("Eliminar el registro?:")) {
      this.clienteService.delCliente(_id).subscribe(res => {
        console.log(res);
        this.operCargaInicial();
      });
    }

  }

}
