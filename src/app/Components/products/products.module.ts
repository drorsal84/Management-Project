import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared-module/shared.module';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProductsModule { }
