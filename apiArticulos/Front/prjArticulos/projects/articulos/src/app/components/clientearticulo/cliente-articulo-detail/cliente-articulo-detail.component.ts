import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticuloDataInterface } from 'projects/db-articulos/src/lib/models/articuloDataInterface';
import { ClienteArticuloDataInterface } from 'projects/db-articulos/src/lib/models/clienteArticuloDataInterface';
import { ClienteDataInterface } from 'projects/db-articulos/src/lib/models/clienteDataInterface';
import { ArticuloDataService, ClienteArticuloDataService, ClienteDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-articulo-detail',
  templateUrl: './cliente-articulo-detail.component.html',
  styleUrls: ['./cliente-articulo-detail.component.css']
})
export class ClienteArticuloDetailComponent implements OnInit {
  public frmclienteArticuloDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];

  arrArticulos : ArticuloDataInterface[] =[];
  arrCliente : ClienteDataInterface[] = [];

  get ctrlArticulo() {
    return this.frmclienteArticuloDetail.get("idArticulo") as FormControl;
  }

  get ctrlCliente() {
    return this.frmclienteArticuloDetail.get("idCliente") as FormControl;
  }

  constructor(private clienteArticuloServicio : ClienteArticuloDataService,
    private articulosServicio: ArticuloDataService,
    private clienteService : ClienteDataService,
    public dialogRef: MatDialogRef<ClienteArticuloDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

        this.applyClean();


      console.log("INIT DIALOG");
      console.log(this.data);
  
      if (this.data.id != 0)  {
        this.clienteArticuloServicio.getClienteArticuloById(this.data.id).subscribe(
          resp => {
            console.log(resp);
            if(resp) {
              this.frmclienteArticuloDetail.patchValue( {...resp});
            };
          }
        );
      } else {
        //this.frmclienteArticuloDetail.get("parentId")?.setValue(this.data.parentId);
      }

      this.articulosServicio.getArticuloAll().subscribe(
        resp1 => {
          this.arrArticulos = resp1;
        }
      );

      this.clienteService.getClienteAll().subscribe(
        resp2 => {
          this.arrCliente = resp2;
        }
      );

    }


    onSaveDialog() {

      if (('' + this.frmclienteArticuloDetail.get("id")?.value) != '0') {
        this.clienteArticuloServicio.updClienteArticulo( {...this.frmclienteArticuloDetail.value} as ClienteArticuloDataInterface ).subscribe(
          resp => {
            console.log("UPD");
            console.log(resp);
            this.dialogRef.close();
          }, err => {
            alert("Debe especificar valores validos");
          }
        );
      } else {
        this.clienteArticuloServicio.addClienteArticulo( {...this.frmclienteArticuloDetail.value} as ClienteArticuloDataInterface ).subscribe(
          resp => {
            console.log(resp);
            this.dialogRef.close();
          }, err => {
            alert("Debe especificar valores validos");
          }
          
          
        );
      }
    }

    public applyClean() {
        this.frmclienteArticuloDetail = new FormGroup({
          id: new FormControl(0),  
            fecha: new FormControl(new Date()),  
            idCliente: new FormControl(0),  
            idArticulo: new FormControl(0)
        });
      }
}
