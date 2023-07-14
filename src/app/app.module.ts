import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RestrictedAreaComponent } from './components/restricted-area/restricted-area.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MediaDetailsComponent } from './components/media-details/media-details.component';
import { MediaFinderComponent } from './components/media-finder/media-finder.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button' 
import { MediaComponent } from './components/media/media.component';
import { NowPlayingComponent } from './components/now-playing/now-playing.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { PopularComponent } from './components/popular/popular.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    RestrictedAreaComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    MediaDetailsComponent,
    MediaFinderComponent,
    DashboardComponent,
    MediaComponent,
    NowPlayingComponent,
    TopRatedComponent,
    UpcomingComponent,
    PopularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CarouselModule,
    ButtonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
