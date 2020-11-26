import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { HomeComponent } from './pages/home/home.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'quem-somos', component: QuemSomosComponent},
  {path: 'fale-conosco', component: FaleConoscoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
