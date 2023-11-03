import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticuloDataInterface } from 'projects/db-articulos/src/lib/models/articuloDataInterface';
import { ArticuloDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articulo-detail',
  templateUrl: './articulo-detail.component.html',
  styleUrls: ['./articulo-detail.component.css']
})
export class ArticuloDetailComponent implements OnInit {

  public frmarticuloDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];

  get imageData() {
    return this.frmarticuloDetail.get("imagen")?.value;
  }

  constructor(private articuloServicio : ArticuloDataService,
    public dialogRef: MatDialogRef<ArticuloDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

      this.frmarticuloDetail = new FormGroup({
        id: new FormControl( 0),  
          codigo: new FormControl( ''),  
          descripcion: new FormControl( ''),  
          precio: new FormControl( 0),  
          imagen: new FormControl( ''),  
          stock: new FormControl( 0)
        });


      console.log("INIT DIALOG");
      console.log(this.data);
  
      if (this.data.id != 0)  {
        this.articuloServicio.getArticuloById(this.data.id).subscribe(
          resp => {
            console.log(resp);
            if(resp) {
              this.frmarticuloDetail.patchValue( {...resp});
            };
          }
        );
      } else {
        //this.frmarticuloDetail.get("parentId")?.setValue(this.data.parentId);
      }
    }


    onSaveDialog() {

      if (('' + this.frmarticuloDetail.get("id")?.value) != '0') {
        this.articuloServicio.updArticulo( {...this.frmarticuloDetail.value} as ArticuloDataInterface ).subscribe(
          resp => {
            console.log("UPD");
            console.log(resp);
            this.dialogRef.close();
          }
        );
      } else {
        this.articuloServicio.addArticulo( {...this.frmarticuloDetail.value} as ArticuloDataInterface ).subscribe(
          resp => {
            console.log(resp);
            this.dialogRef.close();
          }
        );
      }
    }

    onFileSelected(item: any, idDocto:number) {
      const file:File = item.target.files[0];
      
      if (file) {        
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            

            this.frmarticuloDetail.get("imagen")?.setValue(reader.result);

            console.log(reader.result);
            
          };
      }
      //console.log(idDocto);
      //console.log(item);
    };

}
