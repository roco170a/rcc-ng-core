import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TiendaDataInterface } from 'projects/db-articulos/src/lib/models/TiendaDataInterface';
import { TiendaDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tienda-detail',
  templateUrl: './tienda-detail.component.html',
  styleUrls: ['./tienda-detail.component.css']
})
export class TiendaDetailComponent {

  public frmtiendaDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];

  constructor(private tiendaServicio : TiendaDataService,
    public dialogRef: MatDialogRef<TiendaDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

        this.applyClean();


      console.log("INIT DIALOG");
      console.log(this.data);
  
      if (this.data.id != 0)  {
        this.tiendaServicio.getTiendaById(this.data.id).subscribe(
          resp => {
            console.log(resp);
            if(resp) {
              this.frmtiendaDetail.patchValue( {...resp});
            };
          }
        );
      } else {
        //this.frmtiendaDetail.get("parentId")?.setValue(this.data.parentId);
      }
    }


    onSaveDialog() {

      if (('' + this.frmtiendaDetail.get("id")?.value) != '0') {
        this.tiendaServicio.updTienda( {...this.frmtiendaDetail.value} as TiendaDataInterface ).subscribe(
          resp => {
            console.log("UPD");
            console.log(resp);
            this.dialogRef.close();
          }
        );
      } else {
        this.tiendaServicio.addTienda( {...this.frmtiendaDetail.value} as TiendaDataInterface ).subscribe(
          resp => {
            console.log(resp);
            this.dialogRef.close();
          }
        );
      }
    }

    public applyClean() {
        this.frmtiendaDetail = new FormGroup({
          id: new FormControl(0),  
            sucursal: new FormControl(''),  
            direccion: new FormControl('')
        });
      }


}
