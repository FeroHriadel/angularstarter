import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//interceptor
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//redux:
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';

//modules:
import { HeaderModule } from './components/header/header.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { CategoriesPagesModule } from './pages/categories-pages/categories-pages.module';
import { SignupPageModule } from './pages/signup-page/signup-page.module';
import { TagsPagesModule } from './pages/tags-pages/tags-pages.module';
import { UsersPagesModule } from './pages/users-pages/users-pages.module';
import { ItemsPagesModule } from './pages/items-pages/items.pages.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeaderModule,
    HomePageModule,
    CategoriesPagesModule,
    SignupPageModule,
    TagsPagesModule,
    UsersPagesModule,
    ItemsPagesModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}], //activate interceptor like this
  bootstrap: [AppComponent]
})



export class AppModule { }
