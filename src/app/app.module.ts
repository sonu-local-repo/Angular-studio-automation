import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@shared/modules/material.module';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FakeBackendProvider } from './fake-backend/fake-backend.interceptor';
import { ComponentsModule } from '@shared/components/components.module';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'green',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  fgsType: SPINNER.threeBounce,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,

};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    // NgxUiLoaderHttpModule.forRoot({ excludeRegexp: ['*order-task*'] }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    CoreModule,
    MaterialModule,
    ComponentsModule
  ],
  providers: [
    FakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
