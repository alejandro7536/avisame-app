import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddreportComponent } from './pages/addreport/addreport.component';
import { TermsComponent } from './pages/terms/terms.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'add', component: AddreportComponent},
  {path: 'terms', component: TermsComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
