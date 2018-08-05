import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SignInComponent },
      { path: 'home', component: HomeComponent},
      { path: '**', component: HomeComponent} // last
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
