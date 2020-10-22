import { NgModule } from '@angular/core';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { SharedModule } from '../_shared/_module/shared.module';
import { FornecedorComponent } from './fornecedor.component';
import { FornecedorEditComponent } from './fornecedor-edit/fornecedor-edit.component';

@NgModule({
  declarations: [
    FornecedorComponent,
    FornecedorEditComponent,

  ],
  imports: [
    SharedModule,
    FornecedorRoutingModule
  ]
})
export class FornecedorModule { }
