import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiendaDataInterface } from 'projects/db-articulos/src/lib/models/TiendaDataInterface';
import { LoginDataService, TiendaDataService } from 'projects/db-articulos/src/public-api';
import { Subscription } from 'rxjs';
import { TiendaDetailComponent } from '../../tienda/tienda-detail/tienda-detail.component';
import { LoginDataInterface } from 'projects/db-articulos/src/lib/models/loginDataInterface';
import { LoginDetailComponent } from '../login-detail/login-detail.component';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.css']
})
export class LoginFrameComponent {

  arrSubscriptions: Subscription[] = [];
  dsLogin: LoginDataInterface[] = []

  displayedColumns: string[] = ['id', 'userName', 'passwword', 'actions'];

  constructor(private loginService: LoginDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.operCargaInicial()
  }


  ngOnDestroy(): void {
    this.arrSubscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  operCargaInicial() {
    this.loginService.getLoginAll().subscribe((rLogin) => {
      this.dsLogin = rLogin;
    })
  }

  onEditLogin(id: number) {
    this.openDialog(id);
  }

  onAddLogin(id: number) {
    this.openDialog(0);
  }

  openDialog(_Id: number) {
    const dialogRef = this.dialog.open(LoginDetailComponent, {
      data: { id: _Id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.operCargaInicial();
    });
  }

  onDelLogin(_id: number) {
    if (confirm("Eliminar el registro?:")) {
      this.loginService.delLogin(_id).subscribe(res => {
        console.log(res);
        this.operCargaInicial();
      });
    }

  }

}
