import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MediaFinderComponent } from './components/media-finder/media-finder.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MediaDetailsComponent } from './components/media-details/media-details.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'media-finder', component: MediaFinderComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'media-details/:id', component: MediaDetailsComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**',  component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
