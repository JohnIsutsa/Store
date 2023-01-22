import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [{
  path: 'store',
  component: HomeComponent
},
{
  path: 'home',
  component: LandingComponent

},
{
  path: 'cart',
  component: CartComponent
},
{
  path: '', redirectTo: 'home', pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
