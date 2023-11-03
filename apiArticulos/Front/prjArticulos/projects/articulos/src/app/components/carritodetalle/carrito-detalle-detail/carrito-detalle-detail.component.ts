import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarritoDetalleDataInterface } from 'projects/db-articulos/src/lib/models/carritoDetalleDataInterface';
import { CarritoDetalleDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito-detalle-detail',
  templateUrl: './carrito-detalle-detail.component.html',
  styleUrls: ['./carrito-detalle-detail.component.css']
})
export class CarritoDetalleDetailComponent {
  public frmcarritoDetalleDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];

  constructor(private carritoDetalleServicio : CarritoDetalleDataService,
    public dialogRef: MatDialogRef<CarritoDetalleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

        this.applyClean();


      console.log("INIT DIALOG");
      console.log(this.data);
  
      if (this.data.id != 0)  {
        this.carritoDetalleServicio.getCarritoDetalleById(this.data.id).subscribe(
          resp => {
            console.log(resp);
            if(resp) {
              this.frmcarritoDetalleDetail.patchValue( {...resp});
            };
          }
        );
      } else {
        //this.frmcarritoDetalleDetail.get("parentId")?.setValue(this.data.parentId);
      }
    }


    onSaveDialog() {

      if (('' + this.frmcarritoDetalleDetail.get("id")?.value) != '0') {
        this.carritoDetalleServicio.updCarritoDetalle( {...this.frmcarritoDetalleDetail.value} as CarritoDetalleDataInterface ).subscribe(
          resp => {
            console.log("UPD");
            console.log(resp);
            this.dialogRef.close();
          }
        );
      } else {
        this.carritoDetalleServicio.addCarritoDetalle( {...this.frmcarritoDetalleDetail.value} as CarritoDetalleDataInterface ).subscribe(
          resp => {
            console.log(resp);
            this.dialogRef.close();
          }
        );
      }
    }

    public applyClean() {
        this.frmcarritoDetalleDetail = new FormGroup({
          id: new FormControl(0),  
            idCarrito: new FormControl(0),  
            idTiendaArticulo: new FormControl(0),  
            cantidad: new FormControl(0),  
            total: new FormControl(0)
        });
      }

}
