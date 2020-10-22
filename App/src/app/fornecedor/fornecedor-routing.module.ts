import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorEditComponent } from './fornecedor-edit/fornecedor-edit.component';
import { FornecedorComponent } from './fornecedor.component';


const routes: Routes = [
  { path: '', component: FornecedorComponent },
  { path: 'new', component: FornecedorEditComponent },
  { path: 'fornecedor/:id/edit', component: FornecedorEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
