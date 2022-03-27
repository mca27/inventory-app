import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RequestService } from './service/requests.service';
import { RouteConstants } from './constants/route-counstants';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsComponent } from './products/products.component';
import {
  BuildingFilterPipe,
  CityFilterPipe,
  RateFilterPipe,
  StateFilterPipe,
} from './service/pipe-filters.service';
import { HomeComponent } from './home/home.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    DialogComponent,
    CityFilterPipe,
    StateFilterPipe,
    RateFilterPipe,
    BuildingFilterPipe,
    AboutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
  ],
  providers: [RequestService, RouteConstants, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}


