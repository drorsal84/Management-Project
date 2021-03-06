import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/Services/snackbar-service/SnackbarService';
import { productService } from 'src/app/Services/product-service/ProductService';
import { Observable } from 'rxjs';
import { JobProduct } from 'src/app/Models/JobProduct';
import { Product } from 'src/app/models/Product';
import { Offer } from 'src/app/Models/Offer';
import { offerService } from 'src/app/Services/offer-service/OfferService';
import { OfferProduct } from 'src/app/Models/OfferProducts';
import { WorkService } from 'src/app/Services/work-service/WorkService';
import { Job } from 'src/app/Models/Job';
import { StringService } from 'src/app/Services/string-service/StringService';
import { PaginationService } from 'src/app/Services/pagination-service/PaginationService';
import { SpinnerService } from 'src/app/Services/spinner-service/SpinnerService';
import { ModalService } from 'src/app/Services/modal-service/ModalService';

@Component({
  selector: 'app-active-offers',
  templateUrl: './active-offers.component.html',
  styleUrls: ['./active-offers.component.css']
})
export class ActiveOffersComponent implements OnInit, OnDestroy {

  offerReceivedList = [
    { value: 'כן', label: 'כן' },
    { value: 'לא', label: 'לא' },
  ];

  public page: number = this.paginationService.page; // First page in the pagination.
  public pageSize: number = this.paginationService.pageSize; // Number of product shown per page in pagination.
  public pageSizeArray: any[] = this.paginationService.pageSizeArray; // Page size options.
  public paginationForm: FormGroup;

  public modalServiceSub: any;// ModalService subscription object.
  public offerId: number; // Used for offer edit.
  public tempOfferNumber: number; // Used for offer edit number check.
  public offerProduct: JobProduct; // Object used in editing and deleting offer JobProducts.
  public offer: Offer; // Object for refreshing jobProducts after edit or delete.
  public custPayment: number; // Variable for setting jobProduct table total cost.
  public offerProductName: string; // Used in editing JobProducts.
  public oId: number; // Used in editing Jobs or JobProducts.
  public offerProductId: number; // Used in deleting jobProducts.
  public tempProductId: number; // Used in editing JobProducts.
  public title: string;
  public newJobSubmitted = false; // Submitted boolean for input forms functions.
  public editOfferSubmitted = false; // Submitted boolean for input forms functions.
  public offerProductSubmitted = false; // Submitted boolean for input forms functions.
  public editOfferProductSubmitted = false; // Submitted boolean for input forms functions.
  public offerStage: string = "AO"; // Variable for JobStageJobListSwitcher function.

  public createNewJobForm: FormGroup;
  public editOfferForm: FormGroup;
  public activeOfferOfferProductAddForm: FormGroup;
  public activeOfferOfferProductEditForm: FormGroup;
  public offerSearchForm: FormGroup;
  public offerProductList: OfferProduct[] = []; // Jobproduct list for the offer product table.
  public offerList: Offer[] = []; // Job list for jobs table.
  public productList: Product[] = []; // Product list for getting the product names from the product sql table.

  constructor(public router: Router, private formBuilder: FormBuilder,
    private snackbarService: SnackbarService, private productService: productService,
    private offerService: offerService, private workService: WorkService,
    private stringService: StringService, private paginationService: PaginationService,
    private spinnerService: SpinnerService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.offerListSwitcher();
    this.sortByProductNameAsc();
    this.title = "הצעות פעילות";

    if (sessionStorage.getItem(this.stringService.loginToken) === null) { // If there is no session token navigate to the login page.
      this.router.navigate([{ outlets: { primary: this.stringService.login, headerOutlet: null } }]);
    }
    this.modalServiceSub = this.modalService.triggerConfirm.subscribe(val => { // Service for modal confirm functions.
      if (val !== null && val === 'deleteProduct') {
        this.deleteActiveOfferProducts();
      }
      if (val !== null && val === 'delete') {
        this.deleteOffer();
      }
      if (val !== null && val === 'confirm') {
        this.offerStageSwitcher();
      }
    });
    this.offerSearchForm = this.formBuilder.group({
      searchInput: [''],
    });

    this.paginationForm = this.formBuilder.group({
      pageSize: [''],
    });

    this.createNewJobForm = this.formBuilder.group({
      laborCost: ['', [Validators.required, Validators.max(2147483647)]],
      dateOfInstall: ['', Validators.required],
    });

    this.editOfferForm = this.formBuilder.group({
      offerNumber: [''],
      offerCustName: [''],
      offerCustAddress: [''],
      offerDescription: [''],
      offerOrigin: [''],
      offerType: [''],
      offerRemarks: [''],
      offerReceived: [''],
      dateOfOffer: [''],
    });

    this.activeOfferOfferProductAddForm = this.formBuilder.group({
      offerProductNumber: ['', Validators.max(2147483647)],
      offerProductId: ['', Validators.required],
      offerProductQuantity: ['', Validators.max(2147483647)],
      offerProductCost: ['', Validators.max(2147483647)],
    });

    this.activeOfferOfferProductEditForm = this.formBuilder.group({
      offerProductNumber: [''],
      offerProductId: [''],
      offerProductQuantity: [''],
      offerProductCost: [''],
    });
  }

  ngOnDestroy(): void {
    this.modalServiceSub.unsubscribe();
  }

  get v() { return this.createNewJobForm.controls; }
  get k() { return this.editOfferForm.controls; }
  get f() { return this.activeOfferOfferProductAddForm.controls; }
  get z() { return this.activeOfferOfferProductEditForm.controls; }

  offerListSwitcher() {
    const observer: Observable<Offer[]> = this.workService.offerListSwitcher(this.offerStage)

    observer.subscribe(
      (res) => {
        this.offerList = res;
      },
      (error) => {
        alert(this.stringService.olLoadFail);
      }
    );
  }

  moveOfferToHistoryModalOpen() {
    this.modalService.openModal(this.modalService.createModalObject(this.stringService.confirmModal,
      this.stringService.moveOfferToHistoryID, this.stringService.moveOfferToHistoryBTN,
      this.stringService.moveOfferToHistoryHeadline, this.stringService.moveOfferToHistoryText));
  }

  // Switch offer offerStage from active offer to offer history.
  offerStageSwitcher() {

    const currOfferStage = "OH";

    const observer: Observable<Offer> = this.workService.offerStageSwitcher
      (this.offerId, this.offerStage, currOfferStage)

    observer.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          document.getElementById(this.stringService.editActiveOfferClose).click();
          this.snackbarService.show(this.stringService.offerMovedToHistory);
          this.offerListSwitcher();
        }, 1300);
      },
      (error) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.snackbarService.show(this.stringService.offerMovedToHistoryFail, 'danger');
        }, 1300);
      }
    );
  }

  selectPaginationPageSize() {
    this.pageSize = this.paginationForm.controls[this.stringService.pageSize].value;
  }

  searchOffers() {
    var searchInput = this.offerSearchForm.controls[this.stringService.searchInput].value;

    const observer: Observable<Offer[]> = this.offerService.searchOffers(searchInput);
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
      }
    );
  }

  redirectToNewOffer() {
    this.router.navigate([{ outlets: { primary: this.stringService.newOffer, headerOutlet: this.stringService.navbar } }]);
  }

  openCreateNewJobModal() {
    document.getElementById(this.stringService.editActiveOfferClose).click();
  }

  createNewJob() {

    this.newJobSubmitted = true;
    // stop here if form is invalid.
    if (this.createNewJobForm.invalid) {
      return;
    }

    const laborCost = this.createNewJobForm.controls[this.stringService.laborCost].value;
    const dateOfInstall = this.createNewJobForm.controls[this.stringService.dateOfInstall].value;

    const observer: Observable<Job> = this.workService.createNewJob
      (this.offerId, laborCost, dateOfInstall)

    observer.subscribe(
      (res) => {
        this.newJobSubmitted = false;
        this.spinnerService.showSpinner();
        setTimeout(() => {
          document.getElementById(this.stringService.createNewJobModalClose).click();
          this.snackbarService.show(this.stringService.jobCreated);
          this.offerListSwitcher();
        }, 1300);
      },
      (error) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.snackbarService.show(this.stringService.jobCreateFail, 'danger');
        }, 1300);
      }
    );
  }

  getOfferEditForm(offer: Offer) {

    this.editOfferForm = this.formBuilder.group({
      offerNumber: [offer.offerNumber, Validators.max(2147483647)],
      offerCustName: [offer.offerCustName],
      offerCustAddress: [offer.offerCustAddress],
      offerDescription: [offer.offerDescription],
      offerOrigin: [offer.offerOrigin],
      offerType: [offer.offerType],
      offerRemarks: [offer.offerRemarks],
      offerReceived: [offer.offerReceived],
      dateOfOffer: [offer.dateOfOffer],
    });
    this.offerId = offer.offerId;
    this.tempOfferNumber = offer.offerNumber;
    this.editOfferSubmitted = false;
  }

  editActiveOffer() {

    this.editOfferSubmitted = true;
    // stop here if form is invalid.
    if (this.editOfferForm.invalid) {
      return;
    }

    let offerNumber = this.editOfferForm.controls[this.stringService.offerNumber].value;
    let offerCustName = this.editOfferForm.controls[this.stringService.offerCustName].value;
    let offerCustAddress = this.editOfferForm.controls[this.stringService.offerCustAddress].value;
    let offerDescription = this.editOfferForm.controls[this.stringService.offerDescription].value;
    let offerOrigin = this.editOfferForm.controls[this.stringService.offerOrigin].value;
    let offerType = this.editOfferForm.controls[this.stringService.offerType].value;
    let offerRemarks = this.editOfferForm.controls[this.stringService.offerRemarks].value;
    let offerReceived = this.editOfferForm.controls[this.stringService.offerReceived].value;
    let dateOfOffer = this.editOfferForm.controls[this.stringService.dateOfOffer].value;

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
    if (offerReceived === (null)) {
      offerReceived = 'לא';
    }
    const observer: Observable<Offer> = this.offerService.offerNumberCheckForEdit(offerNumber, this.tempOfferNumber);

    // Result offerNumber check.
    observer.subscribe(
      (res) => {
        const observer1: Observable<Offer> = this.offerService.editOffer
          (this.offerId, offerNumber, offerCustName, offerCustAddress, offerDescription, offerOrigin, offerType,
            offerRemarks, offerReceived, dateOfOffer);

        // Result for edit offer.
        observer1.subscribe(
          (res) => {
            this.spinnerService.showSpinner();
            setTimeout(() => {
              document.getElementById(this.stringService.editActiveOfferClose).click();
              this.snackbarService.show(this.stringService.offerEdited);
              this.editOfferForm.reset();
              this.offerListSwitcher();
            }, 1300);
          },
          // Error for edit offer.
          (error) => {
            this.spinnerService.showSpinner();
            setTimeout(() => {
              this.snackbarService.show(this.stringService.offerEditFail, 'danger');
            }, 1300);
          }
        );
      },
      // Error offerNumber check.
      (error) => {
        this.modalService.openModal(this.modalService.createModalObject(this.stringService.valueExistsModal,
          this.stringService.newOfferNumErrorID, this.stringService.newOfferNumErrorBTN,
          this.stringService.newOfferNumErrorHeadline, this.stringService.newOfferNumErrorText));
      }
    );
  }


  openDeleteOfferConfirmModal(offer: Offer) {
    this.offerId = offer.offerId;
    this.modalService.openModal(this.modalService.createModalObject(this.stringService.confirmModal,
      this.stringService.deleteOfferID, this.stringService.deleteOfferBTN,
      this.stringService.deleteOfferHeadline, this.stringService.deleteOfferText));
  }

  deleteOffer() {
    const observer: Observable<Offer> = this.offerService.deleteOffer
      (this.offerId);
    observer.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.offerListSwitcher();
          this.snackbarService.show(this.stringService.offerDeleted);
        }, 1300);
      },
      (error) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.snackbarService.show(this.stringService.offerDeleteFail, 'danger');
        }, 1300);
      }
    );
  }

  openOfferProductsModal(offer: Offer) {

    this.offer = offer;
    this.oId = offer.offerId;
    const observer: Observable<OfferProduct[]> = this.offerService.getActiveOfferProductsList(offer.offerId)

    observer.subscribe(
      (res) => {
        this.offerProductList = res;
        this.custPayment = 0;
        for (let i = 0; i < this.offerProductList.length; i++) { // Calculate custPayment after offerProduct add.
          this.custPayment += this.offerProductList[i].offerProductSubtotal;
        }
      },
      (error) => {
        this.custPayment = 0;
        this.offerProductList = [];
        this.snackbarService.show(this.stringService.noOfferProducts, 'danger');
      }
    );
  }

  addActiveOfferProduct() {

    this.offerProductSubmitted = true;
    // stop here if form is invalid.
    if (this.activeOfferOfferProductAddForm.invalid) {
      return;
    }

    // Gets the product name by it's id for the offerProduct table.
    const observer: Observable<Product> = this.productService.getProductById
      (this.activeOfferOfferProductAddForm.controls[this.stringService.offerProductId].value);
    observer.subscribe(
      (res) => {
        this.offerProductName = res.productName;
      },
      (error) => {
        alert(this.stringService.productIdFail);
      }
    );

    let offerProductNumber = this.activeOfferOfferProductAddForm.controls[this.stringService.offerProductNumber].value;
    let offerProductId = this.activeOfferOfferProductAddForm.controls[this.stringService.offerProductId].value;
    let offerProductQuantity = this.activeOfferOfferProductAddForm.controls[this.stringService.offerProductQuantity].value;
    let offerProductCost = this.activeOfferOfferProductAddForm.controls[this.stringService.offerProductCost].value;
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

      const observer: Observable<OfferProduct> = this.offerService.offerProductIdCheckForActiveOfferAdd(this.oId,
        offerProductId);

      // Result offerProduct id check.
      observer.subscribe(
        (res) => {

          const observer1: Observable<OfferProduct> = this.offerService.addActiveOfferProduct
            (this.oId, offerProductId, offerProductNumber, this.offerProductName,
              offerProductQuantity, offerProductCost, offerProductSubtotal);

          // Result for add offerProduct.
          observer1.subscribe(
            (res) => {
              this.offerProductSubmitted = false;
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.openOfferProductsModal(this.offer);
                document.getElementById(this.stringService.newOfferProductClose).click();
                this.activeOfferOfferProductAddForm.reset();
                this.snackbarService.show(this.stringService.productAdded);
                this.offerListSwitcher();
              }, 1300);
            },
            // Error for add offerProduct.
            (error) => {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.snackbarService.show(this.stringService.productAddFail, 'danger');
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

  getEditActiveOfferOfferProductForm(offerProduct: OfferProduct): void {

    this.activeOfferOfferProductEditForm = this.formBuilder.group({
      offerProductNumber: [offerProduct.offerProductNumber, Validators.max(2147483647)],
      offerProductId: [offerProduct.offerProductId],
      offerProductQuantity: [offerProduct.offerProductQuantity, Validators.max(2147483647)],
      offerProductCost: [offerProduct.offerProductCost, Validators.max(2147483647)],
    });
    this.tempProductId = offerProduct.offerProductId;
    this.editOfferProductSubmitted = false;
  }

  editActiveOfferProduct() {

    this.editOfferProductSubmitted = true;
    // stop here if form is invalid.
    if (this.activeOfferOfferProductEditForm.invalid) {
      return;
    }

    // Gets the product name by it's id for the offerProduct table.
    const observer: Observable<Product> = this.productService.getProductById
      (this.activeOfferOfferProductEditForm.controls[this.stringService.offerProductId].value);
    observer.subscribe(
      (res) => {
        this.offerProductName = res.productName;
      },
      (error) => {
        alert(this.stringService.productIdFail);
      }
    );

    let offerProductNumber = this.activeOfferOfferProductEditForm.controls[this.stringService.offerProductNumber].value;
    let offerProductId = this.activeOfferOfferProductEditForm.controls[this.stringService.offerProductId].value;
    let offerProductQuantity = this.activeOfferOfferProductEditForm.controls[this.stringService.offerProductQuantity].value;
    let offerProductCost = this.activeOfferOfferProductEditForm.controls[this.stringService.offerProductCost].value;
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

      const observer: Observable<OfferProduct> = this.offerService.offerProductIdCheckForActiveOfferEdit(this.oId,
        offerProductId, this.tempProductId);

      // Result offerProduct id check.
      observer.subscribe(
        (res) => {

          const observer1: Observable<OfferProduct> = this.offerService.editActiveOfferProduct
            (this.oId, offerProductId, this.tempProductId, offerProductNumber, this.offerProductName,
              offerProductQuantity, offerProductCost, offerProductSubtotal);

          // Result for edit offerProduct.
          observer1.subscribe(
            (res) => {
              this.editOfferProductSubmitted = false;
              this.spinnerService.showSpinner();
              setTimeout(() => {
                document.getElementById(this.stringService.editProdClose).click();
                this.openOfferProductsModal(this.offer);
                this.snackbarService.show(this.stringService.productEdited);  
                this.offerListSwitcher();
              }, 1200);
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
    this.oId = offerProduct.oId;
    this.offerProductId = offerProduct.offerProductId;
    this.modalService.openModal(this.modalService.createModalObject(this.stringService.confirmModal,
      this.stringService.deleteProdID, this.stringService.deleteProdBTN, this.stringService.deleteProdHeadline,
      this.stringService.deleteProdText));
  }

  deleteActiveOfferProducts() {
    const observer: Observable<OfferProduct> = this.offerService.deleteActiveOfferProducts
      (this.oId, this.offerProductId);
    observer.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.openOfferProductsModal(this.offer);
          this.snackbarService.show(this.stringService.productDeleted);
          this.offerListSwitcher();
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

  // Sort functions

  sortByOfferIdAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferIdAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer id number`);
      }
    );
  }

  sortByOfferIdDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferIdDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer id number`);
      }
    );
  }

  sortByOfferNumberAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferNumberAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer number`);
      }
    );
  }

  sortByOfferNumberDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferNumberDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer number`);
      }
    );
  }

  sortByOfferCustNameAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferCustNameAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer name`);
      }
    );
  }

  sortByOfferCustNameDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferCustNameDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer name`);
      }
    );
  }

  sortByOfferCustAddressAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferCustAddressAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer address`);
      }
    );
  }

  sortByOfferCustAddressDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferCustAddressDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer address`);
      }
    );
  }

  sortByOfferDescriptionAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferDescriptionAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer description`);
      }
    );
  }

  sortByOfferDescriptionDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferDescriptionDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer description`);
      }
    );
  }

  sortByOfferOriginAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferOriginAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer origin`);
      }
    );
  }

  sortByOfferOriginDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferOriginDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer origin`);
      }
    );
  }

  sortByOfferTypeAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferTypeAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer type`);
      }
    );
  }

  sortByOfferTypeDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferTypeDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer type`);
      }
    );
  }

  sortByOfferRemarksAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferRemarksAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer remarks`);
      }
    );
  }

  sortByOfferRemarksDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferRemarksDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer remarks`);
      }
    );
  }

  sortByOfferCustPaymentsAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferCustPaymentsAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer payment`);
      }
    );
  }

  sortByOfferCustPaymentDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferCustPaymentDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer payment`);
      }
    );
  }

  sortByDateOfOfferAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByDateOfOfferAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} date of offer`);
      }
    );
  }

  sortByDateOfOfferDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByDateOfOfferDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} date of offer`);
      }
    );
  }

  sortByOfferReceivedAsc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferReceivedAsc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer received`);
      }
    );
  }

  sortByOfferReceivedDesc() {
    const observer: Observable<Offer[]> = this.offerService.sortByOfferReceivedDesc();
    observer.subscribe(
      (res) => {
        this.offerList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].offerStage === "AO") {
            this.offerList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} offer received`);
      }
    );
  }
}
