import { ModuleWithProviders, NgModule } from '@angular/core';
import { DbArticulosComponent } from './db-articulos.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticuloDataService } from './services/articuloDataService';

@NgModule({
  declarations: [
    DbArticulosComponent
    ],
  imports: [
    HttpClientModule
  ],
  exports: [
    DbArticulosComponent
  ]
})
export class DbArticulosModule { 

  static forRoot(configuration: any): ModuleWithProviders<DbArticulosModule> {
    console.log("INTO STATIC");
    console.log(configuration);
    return {
      ngModule: DbArticulosModule,
      providers: [ArticuloDataService,{provide: 'config', useValue: configuration}]
    };
  }

}
