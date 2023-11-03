import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticuloDataInterface } from 'projects/db-articulos/src/lib/models/articuloDataInterface';
import { TiendaDataInterface } from 'projects/db-articulos/src/lib/models/TiendaDataInterface';
import { TiendaArticuloDataInterface } from 'projects/db-articulos/src/lib/models/tiendaArticuloDataInterface';
import { ArticuloDataService, ClienteDataService, TiendaArticuloDataService, TiendaDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tienda-articulo-detail',
  templateUrl: './tienda-articulo-detail.component.html',
  styleUrls: ['./tienda-articulo-detail.component.css']
})
export class TiendaArticuloDetailComponent implements OnInit {

  public frmtiendaArticuloDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];
  arrArticulos : ArticuloDataInterface[] =[];
  arrTienda : TiendaDataInterface[] = [];


  get ctrlArticulo() {
    return this.frmtiendaArticuloDetail.get("idArticulo") as FormControl;
  }

  get ctrlTienda() {
    return this.frmtiendaArticuloDetail.get("idTienda") as FormControl;
  }

  constructor(private tiendaArticuloServicio : TiendaArticuloDataService,
    public dialogRef: MatDialogRef<TiendaArticuloDetailComponent>,
    private articulosServicio: ArticuloDataService,
    private tiendaService : TiendaDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

        this.applyClean();


      console.log("INIT DIALOG");
      console.log(this.data);
  
      if (this.data.id != 0)  {
        this.tiendaArticuloServicio.getTiendaArticuloById(this.data.id).subscribe(
          resp => {
            console.log(resp);
            if(resp) {
              this.frmtiendaArticuloDetail.patchValue( {...resp});
            };
          }
        );
      } else {
        //this.frmtiendaArticuloDetail.get("parentId")?.setValue(this.data.parentId);
      }

      this.articulosServicio.getArticuloAll().subscribe(
        resp1 => {
          this.arrArticulos = resp1;
        }
      );

      this.tiendaService.getTiendaAll().subscribe(
        resp2 => {
          this.arrTienda = resp2;
        }
      );

    }


    onSaveDialog() {

      if (('' + this.frmtiendaArticuloDetail.get("id")?.value) != '0') {
        this.tiendaArticuloServicio.updTiendaArticulo( {...this.frmtiendaArticuloDetail.value} as TiendaArticuloDataInterface ).subscribe(
          resp => {
            console.log("UPD");
            console.log(resp);
            this.dialogRef.close();
          }, err => {
            alert("Debe especificar valores validos");
          }
        );
      } else {
        this.tiendaArticuloServicio.addTiendaArticulo( {...this.frmtiendaArticuloDetail.value} as TiendaArticuloDataInterface ).subscribe(
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
        this.frmtiendaArticuloDetail = new FormGroup({
          id: new FormControl(0),  
            fecha: new FormControl(new Date()),  
            idTienda: new FormControl(0),  
            idArticulo: new FormControl(0)
        });
      }

}
