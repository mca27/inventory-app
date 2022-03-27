import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouteConstants } from '../constants/route-counstants';
import { RequestService } from '../service/requests.service';
import * as _ from 'lodash';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsData: any;
  categoryFilter: any = new FormControl();
  perPage: any = new FormControl(10);
  category: any;
  page = 1;
  pageSize = 10;
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;

  load: boolean = false;
  totalDocs: any;
  errorMessage = '';
  showPaginate: boolean = true;
  productData: any;
  constructor(
    private routeConstants: RouteConstants,
    private requestService: RequestService,
    private modalService: NgbModal
  ) {}

  // Call the Products API once the Compoment gets initialized
  ngOnInit(): void {
    this.productsData = [];
    this.getProductsData();
  }

  // Get all Product data
  getProductsData() {
    this.load = true;
    let url = `${this.routeConstants.COMPLETE_URL}${this.routeConstants.GET_ALL_PRODUCTS}?page=${this.page}&perPage=${this.pageSize}`;
    if (this.category) {
      url += `&category=${this.category}`;
    }
    this.requestService.getAll(url).subscribe(
      (response) => {
        this.productsData = _.get(response, 'data.docs', []);
        console.log('productsData', response);
        this.load = false;
        this.totalDocs = _.get(response, 'data.totalDocs', 0);
        this.pageSize = _.get(response, 'data.limit', 0);
        this.hasNextPage = _.get(response, 'data.hasNextPage', false);
        this.hasPrevPage = _.get(response, 'data.hasPrevPage', false);
      },
      (error) => {
        this.load = false;
        this.errorMessage = _.get(error, 'error.message', '');
        console.log('Error in getting products data');
      }
    );
  }

  // Reset the filters which are applied currently
  resetFilters() {
    this.categoryFilter.reset();
    this.category = "";
    this.getProductsData();

  }

  // Since we are auto-generating product id, we are showing only 8 characters of generated Id
  productIdDisplay(productId: string) {
    if (productId.length > 8)
      return productId.substr(productId.length - 8).toUpperCase();
    else return productId.toUpperCase();
  }

  // Get single product by product Id
  getProduct(productId: string) {
    const url =
      this.routeConstants.COMPLETE_URL +
      this.routeConstants.GET_SINGLE_PRODUCT +
      productId;
    this.requestService.getById(url).subscribe(
      (response) => {
        this.productData = _.get(response, 'data', {});
        this.openDialog(this.productData, true);
      },
      (error) => {
        this.errorMessage = _.get(error, 'error.message', '');
        console.log('Error in getting products data');
      }
    );
  }

  // Delete Product by product Id
  deleteProduct(productId: string) {
    const url =
      this.routeConstants.COMPLETE_URL +
      this.routeConstants.DELETE_PRODUCT +
      productId;
    this.requestService.delete(url).subscribe(
      (response) => {
        this.productData = _.get(response, 'data', {});
        console.log('productData', this.productData);
        this.getProductsData();
      },
      (error) => {
        this.errorMessage = error.message;
        console.log('Error in getting products data');
      }
    );
  }

  // paginate when user clicks on paginated buttons
  paginate(pageNo: any) {
    console.log('pageNo', pageNo);
    this.page = pageNo;
    this.getProductsData();
  }
  
  // open add/update product dialog
  openDialog(data: any, isUpdate: boolean): void {
    console.log('data', data);

    const dialogRef = this.modalService.open(DialogComponent, {
      size: 'lg',
    });

    (<DialogComponent>dialogRef.componentInstance).productData = data;
    (<DialogComponent>dialogRef.componentInstance).isUpdate = isUpdate;

    dialogRef.result.then(
      (result) => {
        this.getProductsData();
      },
      (reason) => {}
    );
  }

  // Filter based on category search filter
  filterByCategory() {
    const category = _.get(this.categoryFilter, 'value', '');
    console.log('this.category', category);
    if (category.length >= 3) {
      this.category = category;
      this.getProductsData();
    }
  }

  // when user selects perpage value get the product data based on perPage
  setPerPage() {
    this.pageSize = _.get(this.perPage, 'value', '');
    this.getProductsData();
  }
}
