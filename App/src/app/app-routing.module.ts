import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaComponent } from './pages/cadastros/empresa/empresa.component';
import { FornecedorComponent } from './pages/cadastros/fornecedor/fornecedor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cadastro/empresa',
        component: EmpresaComponent
      },
      {
        path: 'cadastro/fornecedor',
        component: FornecedorComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
