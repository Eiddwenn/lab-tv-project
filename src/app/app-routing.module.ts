import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MediaFinderComponent } from './components/media-finder/media-finder.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MediaDetailsComponent } from './components/media-details/media-details.component';
import { RestrictedAreaComponent } from './components/restricted-area/restricted-area.component';
import { loggedGuard } from './guards/logged.guard';
import { ContactComponent } from './components/contact/contact/contact.component';
import { DashNoLoginComponent } from './components/dash-no-login/dash-no-login/dash-no-login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'media-finder', component: MediaFinderComponent, canActivate: [loggedGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [loggedGuard]},
  {path: 'dash-no-login', component: DashNoLoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'media-details/:id', component: MediaDetailsComponent, canActivate: [loggedGuard]},
  {path: 'restricted-area', component: RestrictedAreaComponent, canActivate: [loggedGuard]},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '', redirectTo: '/dash-no-login', pathMatch: 'full'},
  {path: '**',  component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
