import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { environment } from './environments/environment';
import { HttpClientInterceptor, HTTPStatus } from './app/httpClient.interceptor';

const RxJS_Services = [];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000,
        preventDuplicates: true,
      })
    ),
    provideAnimations(),

    HTTPStatus, 

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));
