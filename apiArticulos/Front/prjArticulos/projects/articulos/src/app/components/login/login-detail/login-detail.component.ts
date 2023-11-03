import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDataInterface } from 'projects/db-articulos/src/lib/models/loginDataInterface';
import { LoginDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html',
  styleUrls: ['./login-detail.component.css']
})
export class LoginDetailComponent {
  public frmloginDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];

  constructor(private loginServicio: LoginDataService,
    public dialogRef: MatDialogRef<LoginDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.applyClean();


    console.log("INIT DIALOG");
    console.log(this.data);

    if (this.data.id != 0) {
      this.loginServicio.getLoginById(this.data.id).subscribe(
        resp => {
          console.log(resp);
          if (resp) {
            this.frmloginDetail.patchValue({ ...resp });
          };
        }
      );
    } else {
      //this.frmloginDetail.get("parentId")?.setValue(this.data.parentId);
    }
  }


  onSaveDialog() {

    if (('' + this.frmloginDetail.get("id")?.value) != '0') {
      this.loginServicio.updLogin({ ...this.frmloginDetail.value } as LoginDataInterface).subscribe(
        resp => {
          console.log("UPD");
          console.log(resp);
          this.dialogRef.close();
        }
      );
    } else {
      this.loginServicio.addLogin({ ...this.frmloginDetail.value } as LoginDataInterface).subscribe(
        resp => {
          console.log(resp);
          this.dialogRef.close();
        }
      );
    }
  }

  public applyClean() {
    this.frmloginDetail = new FormGroup({
      id: new FormControl(0),
      userName: new FormControl(''),
      passwword: new FormControl('')
    });
  }
}
