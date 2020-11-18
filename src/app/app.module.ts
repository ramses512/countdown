import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@app/interceptor/error.interceptor';
import { JwtInterceptor } from '@app/interceptor/jwt.interceptor';
import { AuthComponent } from '@layout/auth/auth.component';
import { ContentComponent } from '@layout/content/content.component';
import { HeaderComponent } from '@layout/header/header.component';
import { SharedModule } from '@shared/shared.module';
import { fakeBackendProvider } from '@app/interceptor/back.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
