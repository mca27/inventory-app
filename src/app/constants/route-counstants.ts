import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class RouteConstants {
  BASE_URL = environment.BASE_URL;
  CONTEXT_PATH = environment.CONTEXT_ROOT;
  COMPLETE_URL = this.BASE_URL + this.CONTEXT_PATH
  GET_ALL_PRODUCTS = '/products/all';
  GET_SINGLE_PRODUCT = '/product/';
  ADD_PRODUCT = '/add/product/';
  UPDATE_PRODUCT = '/update/product/';
  DELETE_PRODUCT = '/delete/product/'
}
