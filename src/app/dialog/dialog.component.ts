import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteConstants } from '../constants/route-counstants';
import { RequestService } from '../service/requests.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  product: any;
  submitted = false;
  categories: any;
  errorMessage: any;
  showError: boolean = false;
  successMesssage: any;
  @Input() productData: any;
  @Input() isUpdate: boolean = false;
  product_id: any;

  constructor(
    protected ref: NgbModal,
    public activeModal: NgbActiveModal,
    private routeConstants: RouteConstants,
    private requestService: RequestService
  ) {
    this.product = {};
    this.categories = [
      {
        key: 'commercial',
        value: 'Commercial',
      },
      {
        key: 'space',
        value: 'Space',
      },
      {
        key: 'helicopter',
        value: 'Helicopter',
      },
    ];
  }
  ngOnInit(): void {
    if (this.productData) {
      this.product = this.productData;
      this.product_id = _.get(this.productData, 'product_id', '');
    }
  }
  addProduct(productForm: any) {
    this.submitted = true;
    if (!this.isUpdate) {
      const url =
        this.routeConstants.COMPLETE_URL + this.routeConstants.ADD_PRODUCT;
      this.requestService.create(url, this.product).subscribe(
        (response) => {
          this.showError = false;
          const productData = _.get(response, 'data', {});
          this.successMesssage = _.get(response, 'message', '');
          productForm.reset();
        },
        (error) => {
          this.errorMessage = _.get(error, 'error.message', '');
          this.showError = true;
          console.log('Error in getting products data');
        }
      );
    } else {
      const url =
        this.routeConstants.COMPLETE_URL +
        this.routeConstants.UPDATE_PRODUCT +
        this.product_id;
      const payload = {
        product_name: _.get(this.product, 'product_name', ''),
        product_category: _.get(this.product, 'product_category', ''),
        product_description: _.get(this.product, 'product_description', ''),
        units: _.get(this.product, 'units', 0),
      };
      this.requestService.update(url, payload).subscribe(
        (response) => {
          this.showError = false;
          const productData = _.get(response, 'data', {});
          this.successMesssage = _.get(response, 'message', '');
          // productForm.reset();
        },
        (error) => {
          this.errorMessage = _.get(error, 'error.message', '');
          this.showError = true;
          console.log('Error in getting products data');
        }
      );
    }
  }
  close() {
    this.activeModal.close();
  }
}
