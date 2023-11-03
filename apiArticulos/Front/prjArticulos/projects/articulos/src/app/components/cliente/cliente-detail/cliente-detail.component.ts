import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteDataInterface } from 'projects/db-articulos/src/lib/models/clienteDataInterface';
import { ClienteDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent {

  public frmclienteDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];

  constructor(private clienteServicio : ClienteDataService,
    public dialogRef: MatDialogRef<ClienteDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

        this.applyClean();


      console.log("INIT DIALOG");
      console.log(this.data);
  
      if (this.data.id != 0)  {
        this.clienteServicio.getClienteById(this.data.id).subscribe(
          resp => {
            console.log(resp);
            if(resp) {
              this.frmclienteDetail.patchValue( {...resp});
            };
          }
        );
      } else {
        //this.frmclienteDetail.get("parentId")?.setValue(this.data.parentId);
      }
    }


    onSaveDialog() {

      if (('' + this.frmclienteDetail.get("id")?.value) != '0') {
        this.clienteServicio.updCliente( {...this.frmclienteDetail.value} as ClienteDataInterface ).subscribe(
          resp => {
            console.log("UPD");
            console.log(resp);
            this.dialogRef.close();
          }
        );
      } else {
        this.clienteServicio.addCliente( {...this.frmclienteDetail.value} as ClienteDataInterface ).subscribe(
          resp => {
            console.log(resp);
            this.dialogRef.close();
          }
        );
      }
    }

    public applyClean() {
        this.frmclienteDetail = new FormGroup({
          id: new FormControl(0),  
            nombre: new FormControl(''),  
            apellidos: new FormControl(''),  
            direccion: new FormControl('')
        });
      }

}
