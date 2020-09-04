import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/Services/data-service/DataService';
import { SnackbarService } from 'src/app/Services/snackbar-service/SnackbarService';
import { Product } from 'src/app/models/Product';
import { productService } from 'src/app/Services/product-service/ProductService';
import { offerService } from 'src/app/Services/offer-service/OfferService';
import { OfferProduct } from 'src/app/Models/OfferProducts';
import { Offer } from 'src/app/Models/Offer';
import { StringService } from 'src/app/Services/string-service/StringService';
import { SpinnerService } from 'src/app/Services/spinner-service/SpinnerService';
import { ModalService } from 'src/app/Services/modal-service/ModalService';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent implements OnInit, OnDestroy {

  offerReceivedList = [
    { value: 'כן', label: 'כן' },
    { value: 'לא', label: 'לא' },
  ];

  public newOfferForm: FormGroup;
  public newOfferProductsForm: FormGroup;
  public editOfferProductsForm: FormGroup;
  
  public title: string;
  public dataServiceSub: any; // DataService subscription object.
  public modalServiceSub: any;// ModalService subscription object.
  public newOfferSubmitted = false; // Submitted boolean for input forms functions.
  public newOfferProductsSubmitted = false; // Submitted boolean for input forms functions.
  public editOfferProductsSubmitted = false; // Submitted boolean for input forms functions.
  public productList: Product[] = []; // Product list for getting the product names from the product sql table.
  public offerProductList: OfferProduct[] = []; // Jobproduct list for the offer product table.
  public tempOfferProductList: OfferProduct[] = []; // Jobproduct list for edit & delete offer products functions.

  public offerProductName: string; //Variable for inputing the jobProduct name in the table via his id.
  public tempOfferProductId: number; // Variable for finding the specific jobProduct to edit.
  public offerProductId: number; // Variable for finding the specific jobProduct to delete using the dataService.
  public custPayment: number = 0; // Variable for setting jobProduct table total cost.

  constructor(private router: Router, private formBuilder: FormBuilder, 
    private dataService: DataService, private snackbarService: SnackbarService, 
    private productService: productService, private offerService: offerService, 
    private stringService: StringService, private spinnerService: SpinnerService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.title = "צור הצעה";
    this.sortByProductNameAsc();
    this.getOfferProductsList();

    if (sessionStorage.getItem(this.stringService.loginToken) === null) { // If there is no session token navigate to the login page.
      this.router.navigate([{ outlets: { primary: this.stringService.login, headerOutlet: null } }]);
    }
    this.dataServiceSub = this.dataService.activeProduct.subscribe(offerProductId => this.offerProductId = offerProductId);
    this.modalServiceSub = this.modalService.triggerConfirm.subscribe(val => { // Service for modal confirm functions.
      if (val !== null) {
        this.deleteOfferProducts();
      }
    });

    this.newOfferForm = this.formBuilder.group({
      offerNumber: ['', [Validators.required, Validators.max(2147483647)]],
      offerCustName: ['', Validators.required],
      offerCustAddress: ['', Validators.required],
      offerDescription: [''],
      offerOrigin: [''],
      offerType: [''],
      offerRemarks: [''],
      offerReceived: [''],
      dateOfOffer: ['', Validators.required],
    });

    this.newOfferProductsForm = this.formBuilder.group({
      offerProductNumber: ['', Validators.max(2147483647)],
      offerProductId: ['', Validators.required], // This control value is the product ID for spring methods!
      offerProductQuantity: ['', Validators.max(2147483647)],
      offerProductCost: ['', Validators.max(2147483647)],
    });

    this.editOfferProductsForm = this.formBuilder.group({
      offerProductNumber: [''],
      offerProductId: [''], // This control value is the product ID for spring methods!
      offerProductQuantity: [''],
      offerProductCost: [''],
    });
  }

  ngOnDestroy(): void {
    this.dataServiceSub.unsubscribe();
    this.modalServiceSub.unsubscribe();
  }

  get f() { return this.newOfferForm.controls; }
  get v() { return this.newOfferProductsForm.controls; }
  get k() { return this.editOfferProductsForm.controls; }

  // Get the offerProductList after page refresh.
  getOfferProductsList() {
    const observer: Observable<OfferProduct[]> = this.offerService.getOfferProductsList()

    observer.subscribe(
      (res) => {
        this.offerProductList = res;
      },
      (error) => {
        alert(this.stringService.plLoadFail);
      }
    );
  }
  
  redirectToActiveOffers() {
    this.router.navigate([{ outlets: { primary: this.stringService.activeOffers, headerOutlet: this.stringService.navbar } }]);
  }

  createNewOffer() {

    this.newOfferSubmitted = true;
    // stop here if form is invalid.
    if (this.newOfferForm.invalid) {
      return;
    }

    let offerNumber = this.newOfferForm.controls[this.stringService.offerNumber].value;
    let offerCustName = this.newOfferForm.controls[this.stringService.offerCustName].value;
    let offerCustAddress = this.newOfferForm.controls[this.stringService.offerCustAddress].value;
    let offerDescription = this.newOfferForm.controls[this.stringService.offerDescription].value;
    let offerOrigin = this.newOfferForm.controls[this.stringService.offerOrigin].value;
    let offerType = this.newOfferForm.controls[this.stringService.offerType].value;
    let offerRemarks = this.newOfferForm.controls[this.stringService.offerRemarks].value;
    let offerReceived = this.newOfferForm.controls[this.stringService.offerReceived].value;
    let dateOfOffer = this.newOfferForm.controls[this.stringService.dateOfOffer].value;

    if (offerCustAddress === (null)) {
      offerCustAddress = '';
    }
    if (offerDescription === (null)) {
      offerDescription = '';
    }
    if (offerOrigin === (null)) {
      offerOrigin = '';
    }
    if (offerType === (null)) {
      offerType = '';
    }
    if (offerRemarks === (null)) {
      offerRemarks = '';
    }
    if (this.custPayment === (null)) {
      this.custPayment = 0;
    }
    if (offerReceived === (null)) {
      offerReceived = 'לא';
    }

    const observer: Observable<Offer> = this.offerService.offerNumberCheck(offerNumber);

    // Result offerNumber check.
    observer.subscribe(
      (res) => {
        const observer1: Observable<Offer> = this.offerService.createNewOffer
          (offerNumber, offerCustName, offerCustAddress, offerDescription, offerOrigin, offerType,
            offerRemarks, this.custPayment, offerReceived, dateOfOffer);

        // Result for create new offer.
        observer1.subscribe(
          (res) => {
            this.newOfferSubmitted = false;
            this.spinnerService.showSpinner();
            setTimeout(() => {
              this.snackbarService.show(this.stringService.offerCreated);
              this.newOfferForm.reset();
              this.getOfferProductsList();
              this.custPayment = 0;
            }, 1300);
          },
          // Error for create new offer.
          (error) => {
            this.snackbarService.show(this.stringService.offerCreateFail, 'danger');
          }
        );
      },
      // Error offerNumber check.
      (error) => {
        this.newOfferSubmitted = false;
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.modalService.openModal(this.modalService.createModalObject(this.stringService.valueExistsModal, 
            this.stringService.newOfferNumErrorID, this.stringService.newOfferNumErrorBTN, 
            this.stringService.newOfferNumErrorHeadline, this.stringService.newOfferNumErrorText));
        }, 1300);
      }
    );
  }

  addToOfferProductTable() {

    this.newOfferProductsSubmitted = true;
    // stop here if form is invalid.
    if (this.newOfferProductsForm.invalid) {
      return;
    }

    // Gets the product name by it's id for the JobProduct table.
    const observer: Observable<Product> = this.productService.getProductById
      (this.newOfferProductsForm.controls[this.stringService.offerProductId].value);
    observer.subscribe(
      (res) => {
        this.offerProductName = res.productName;
      },
      (error) => {
        alert(this.stringService.productIdFail);
      }
    );

    let offerProductNumber = this.newOfferProductsForm.controls[this.stringService.offerProductNumber].value;
    let offerProductId = this.newOfferProductsForm.controls[this.stringService.offerProductId].value;
    let offerProductQuantity = this.newOfferProductsForm.controls[this.stringService.offerProductQuantity].value;
    let offerProductCost = this.newOfferProductsForm.controls[this.stringService.offerProductCost].value;
    let offerProductSubtotal = offerProductCost * offerProductQuantity;

    if (offerProductNumber === (null)) {
      offerProductNumber = '0';
    }
    if (offerProductId === (null)) {
      offerProductId = '0';
    }
    if (this.offerProductName === (null)) {
      this.offerProductName = '-';
    }
    if (offerProductQuantity === (null)) {
      offerProductQuantity = '0';
    }
    if (offerProductCost === (null)) {
      offerProductCost = '0';
    }
    if (offerProductSubtotal === (null)) {
      offerProductSubtotal = 0;
    }

    setTimeout(() => {

      const observer: Observable<OfferProduct> = this.offerService.offerProductIdCheck(offerProductId);

      // Result offerProduct id check.
      observer.subscribe(
        (res) => {

          const observer1: Observable<OfferProduct[]> = this.offerService.addToOfferProductTable
            (offerProductNumber, offerProductId, this.offerProductName, offerProductQuantity,
              offerProductCost, offerProductSubtotal);

          // Result for add offerProduct.
          observer1.subscribe(
            (res) => {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                document.getElementById(this.stringService.newProdModalClose).click();
                this.offerProductList = res;
                this.custPayment = 0;
                this.newOfferProductsForm.reset();
                for (let i = 0; i < this.offerProductList.length; i++) { // Calculate custPayment after offerProduct add.
                  this.custPayment += this.offerProductList[i].offerProductSubtotal;
                }
                this.snackbarService.show(this.stringService.productAdded);
              }, 1300);
            },
            // Error for add offerProduct.
            (error) => {
              this.snackbarService.show(this.stringService.productAddFail, 'danger');
            }
          );
        },
        // Error for offerProduct id check.
        (error) => {
          this.spinnerService.showSpinner();
          setTimeout(() => {
            this.modalService.openModal(this.modalService.createModalObject(this.stringService.valueExistsModal,
              this.stringService.prodExistsInOfferID, this.stringService.prodExistsInOfferBTN,
              this.stringService.prodExistsInOfferHeadline, this.stringService.prodExistsInOfferText));
          }, 1300);
        }
      );
    }, 100);
  }

  getEditForm(offerProduct: OfferProduct): void {

    this.editOfferProductsForm = this.formBuilder.group({
      offerProductNumber: [offerProduct.offerProductNumber, Validators.max(2147483647)],
      offerProductId: [offerProduct.offerProductId],
      offerProductQuantity: [offerProduct.offerProductQuantity, Validators.max(2147483647)],
      offerProductCost: [offerProduct.offerProductCost, Validators.max(2147483647)],
    });
    this.tempOfferProductId = offerProduct.offerProductId;
    this.editOfferProductsSubmitted = false;
  }

  editOfferProduct() {

    this.editOfferProductsSubmitted = true;
    // stop here if form is invalid.
    if (this.editOfferProductsForm.invalid) {
      return;
    }

    // Gets the product name by it's id for the JobProduct table.
    const observer: Observable<Product> = this.productService.getProductById
      (this.editOfferProductsForm.controls[this.stringService.offerProductId].value);
    observer.subscribe(
      (res) => {
        this.offerProductName = res.productName;
      },
      (error) => {
        alert(this.stringService.productIdFail);
      }
    );

    let offerProductNumber = this.editOfferProductsForm.controls[this.stringService.offerProductNumber].value;
    let offerProductId = this.editOfferProductsForm.controls[this.stringService.offerProductId].value;
    let offerProductQuantity = this.editOfferProductsForm.controls[this.stringService.offerProductQuantity].value;
    let offerProductCost = this.editOfferProductsForm.controls[this.stringService.offerProductCost].value;
    let offerProductSubtotal = offerProductCost * offerProductQuantity;

    if (offerProductNumber === (null)) {
      offerProductNumber = '0';
    }
    if (this.tempOfferProductId === (null)) {
      this.tempOfferProductId = 0;
    }
    if (offerProductId === (null)) {
      offerProductId = '0';
    }
    if (this.offerProductName === (null)) {
      this.offerProductName = '-';
    }
    if (offerProductQuantity === (null)) {
      offerProductQuantity = '0';
    }
    if (offerProductCost === (null)) {
      offerProductCost = '0';
    }
    if (offerProductSubtotal === (null)) {
      offerProductSubtotal = 0;
    }

    setTimeout(() => {

      const observer: Observable<OfferProduct> = this.offerService.offerProductIdCheckForEdit(offerProductId,
        this.tempOfferProductId);

      // Result offerProduct id check.
      observer.subscribe(
        (res) => {

          const observer1: Observable<OfferProduct[]> = this.offerService.editOfferProducts
            (offerProductNumber, this.tempOfferProductId, offerProductId, this.offerProductName,
              offerProductQuantity, offerProductCost, offerProductSubtotal);

          // Result for edit offerProduct.
          observer1.subscribe(
            (res) => {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.offerProductList = res;
                this.custPayment = 0;
                for (let i = 0; i < this.offerProductList.length; i++) { // Calculate custPayment after offerProduct edit.
                  this.custPayment += this.offerProductList[i].offerProductSubtotal;
                }
                document.getElementById(this.stringService.editProdClose).click();
                this.snackbarService.show(this.stringService.productEdited);
              }, 1300);
            },
            // Error for edit offerProduct.
            (error) => {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.snackbarService.show(this.stringService.productEditFail, 'danger');
              }, 1300);
            }
          );
        },
        // Error for offerProduct id check.
        (error) => {
          this.modalService.openModal(this.modalService.createModalObject(this.stringService.valueExistsModal,
            this.stringService.prodExistsInOfferID, this.stringService.prodExistsInOfferBTN,
            this.stringService.prodExistsInOfferHeadline, this.stringService.prodExistsInOfferText));
        }
      );
    }, 100);
  }

  public openDeleteOfferProductConfirmModal(offerProduct: OfferProduct) {
    this.dataService.changeId(offerProduct.offerProductId);
    this.modalService.openModal(this.modalService.createModalObject(this.stringService.confirmModal, 
      this.stringService.deleteProdID, this.stringService.deleteProdBTN, this.stringService.deleteProdHeadline,
      this.stringService.deleteProdText));
  }

  deleteOfferProducts() {
    const observer: Observable<OfferProduct[]> = this.offerService.deleteOfferProducts(this.offerProductId);

    observer.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.offerProductList = res;
          this.custPayment = 0;
          for (let i = 0; i < this.offerProductList.length; i++) { // Calculate custPayment after offerProduct delete.
            this.custPayment += this.offerProductList[i].offerProductSubtotal;
          }
          this.snackbarService.show(this.stringService.productDeleted);
        }, 1300);
      },
      (error) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.snackbarService.show(this.stringService.productDeleteFail, 'danger');
        }, 1300);
      }
    );
  }

  getProductName(offerProductId) {
    const observer: Observable<Product> = this.productService.getProductById(offerProductId);
    observer.subscribe(
      (res) => {
        this.offerProductName = res.productName;
      },
      (error) => {
        alert(this.stringService.productIdFail);
      }
    );
    return this.offerProductName;
  }

  // Method for getting product name in offer add product table.
  sortByProductNameAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductNameAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product name`);
      }
    );
  }
}