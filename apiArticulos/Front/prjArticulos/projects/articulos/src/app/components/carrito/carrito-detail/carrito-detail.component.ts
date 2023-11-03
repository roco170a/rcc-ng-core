import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarritoDataInterface } from 'projects/db-articulos/src/lib/models/carritoDataInterface';
import { CarritoDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito-detail',
  templateUrl: './carrito-detail.component.html',
  styleUrls: ['./carrito-detail.component.css']
})
export class CarritoDetailComponent {
  public frmcarritoDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];

  constructor(private carritoServicio : CarritoDataService,
    public dialogRef: MatDialogRef<CarritoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

        this.applyClean();


      console.log("INIT DIALOG");
      console.log(this.data);
  
      if (this.data.id != 0)  {
        this.carritoServicio.getCarritoById(this.data.id).subscribe(
          resp => {
            console.log(resp);
            if(resp) {
              this.frmcarritoDetail.patchValue( {...resp});
            };
          }
        );
      } else {
        //this.frmcarritoDetail.get("parentId")?.setValue(this.data.parentId);
      }
    }


    onSaveDialog() {

      if (('' + this.frmcarritoDetail.get("id")?.value) != '0') {
        this.carritoServicio.updCarrito( {...this.frmcarritoDetail.value} as CarritoDataInterface ).subscribe(
          resp => {
            console.log("UPD");
            console.log(resp);
            this.dialogRef.close();
          }
        );
      } else {
        this.carritoServicio.addCarrito( {...this.frmcarritoDetail.value} as CarritoDataInterface ).subscribe(
          resp => {
            console.log(resp);
            this.dialogRef.close();
          }
        );
      }
    }

    public applyClean() {
        this.frmcarritoDetail = new FormGroup({
          id: new FormControl(0),  
            idCliente: new FormControl(0),  
            envio: new FormControl('')
        });
      }

}
