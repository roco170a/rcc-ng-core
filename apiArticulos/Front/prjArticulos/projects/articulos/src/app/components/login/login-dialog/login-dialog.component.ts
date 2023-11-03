import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDataInterface } from 'projects/db-articulos/src/lib/models/loginDataInterface';
import { LoginDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';
import { LoginDetailComponent } from '../login-detail/login-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  public frmloginDetail !: FormGroup;
  public arrSubscriptions: Subscription[] = [];

  constructor(private loginServicio : LoginDataService,
    private _router: Router,    
    ) { }

    ngOnInit(): void {

        this.applyClean();

    }


    onSaveDialog() {

      this.loginServicio.login( {...this.frmloginDetail.value} as LoginDataInterface ).subscribe(
        resp => {
          console.log("LOGIN OK");
          console.log(resp);
          
          this._router.navigateByUrl('/carritos');
        }
      );

    }

    public applyClean() {
        this.frmloginDetail = new FormGroup({
          id: new FormControl(0),  
            userName: new FormControl(''),  
            passwword: new FormControl('')
        });
      }
}
