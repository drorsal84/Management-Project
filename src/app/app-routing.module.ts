import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [

  { path : "", redirectTo:"/login", pathMatch:"full"},
  { path : "login", component: LoginComponent},
  { path : "homepage", component: HomepageComponent},
  { path : "navbar", component: NavbarComponent, outlet:"headerOutlet"},
  { path : "pagenotfound", component: PagenotfoundComponent},

  { path: 'products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule) },
  { path: 'jobs', loadChildren: () => import('./components/jobs/jobs.module').then(m => m.JobsModule) },

  { path : "**", redirectTo:"/pagenotfound", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
