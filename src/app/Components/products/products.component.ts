import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { productService } from 'src/app/Services/product-service/ProductService';
import { DataService } from 'src/app/Services/data-service/DataService';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar-service/SnackbarService';
import { StringService } from 'src/app/Services/string-service/StringService';
import { ModalService } from 'src/app/Services/modal-service/ModalService';
import { SpinnerService } from 'src/app/Services/spinner-service/SpinnerService';
import { PaginationService } from 'src/app/Services/pagination-service/PaginationService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  Categories = [ // Products category array.
    { value: 'DET', label: 'גלאים' },
    { value: 'CON', label: 'רכזות' },
    { value: 'KEY', label: 'לוח מקשים' },
    { value: 'SIR', label: 'סירנות' },
    { value: 'CAM', label: 'מצלמות' },
    { value: 'DVR', label: 'DVR' },
    { value: 'INT', label: 'אינטרקום' },
    { value: 'COD', label: 'קודנים' },
    { value: 'BUT', label: 'לחצנים לאינטרקום' },
    { value: 'LOC', label: 'מנעולים חשמליים' },
    { value: 'BAT', label: 'סוללות' },
    { value: 'POW', label: 'ספקי כוח' },
    { value: 'ACC', label: 'ציוד נלווה' },
  ];

  public page: number = this.paginationService.page; // First page in the pagination.
  public pageSize: number = this.paginationService.pageSize; // Number of product shown per page in pagination.
  public pageSizeArray: any[] = this.paginationService.pageSizeArray; // Page size options.
  public paginationForm: FormGroup;

  public productsSearchForm: FormGroup; // Card header search input formgroup.
  public categorySearchForm: FormGroup; // Card header search input for category select.
  public newProdForm: FormGroup; // New product model formgroup.
  public editProdForm: FormGroup; // Edit product model formgroup.

  public dataServiceSub: any; // DataService subscription object.
  public modalServiceSub: any;// ModalService subscription object.
  public productList: Product[] = []; // Product list used in ngfor table
  public product: Product; // Product object for edit and delete functions in order to get the clicked item list ID.
  public submitted = false; // Submitted boolean for input forms functions.
  public submittedEdit = false; // Submitted boolean for input forms functions.
  public productId: number; // Variable used for DataService to stream the clicked product id throughout the component.
  public defaultCategory: string; // String used for default html option in category select (new product modal).
  public defaultColor: string; // String used for default html option in color select (new product modal).

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
    private productService: productService, private router: Router, 
    private snackbarService: SnackbarService, private spinnerService: SpinnerService,
    private stringService: StringService, private modalService: ModalService,
    private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.spinnerService.showSpinner(); // Initiate spinner when page is loaded.
    this.getAllProducts(); // Populate the table with products from the DB.
    if (sessionStorage.getItem(this.stringService.loginToken) === null) { // If there is no session token navigate to the login page.
      this.router.navigate([{ outlets: { primary: this.stringService.login, headerOutlet: null } }]);
    }
    this.dataServiceSub = this.dataService.activeProduct.subscribe(productId => this.productId = productId); // Data service subscription for the active productID
    this.modalServiceSub = this.modalService.triggerConfirm.subscribe(val => { // Service for modal confirm functions.
      if (val !== null) {
        this.deleteProduct();
      }
    });
    this.productsSearchForm = this.formBuilder.group({
      searchInput: [''],
    });

    this.categorySearchForm = this.formBuilder.group({
      productCat: [''],
    });

    this.paginationForm = this.formBuilder.group({
      pageSize: [''],
    });

    this.newProdForm = this.formBuilder.group({
      productCat: ['', Validators.required],
      productName: ['', Validators.required],
      productCatalogNum: ['', Validators.required],
      productManuf: [''],
      productQuan: ['', Validators.max(2147483647)],
      productOnSaleQuan: ['', Validators.max(2147483647)],
      productCost: ['', Validators.max(2147483647)],
      productOnSaleCost: ['', Validators.max(2147483647)],
      productImgFile: ['']
    });
    this.editProdForm = this.formBuilder.group({
      productCat: [''],
      productName: [''],
      productCatalogNum: [''],
      productManuf: [''],
      productQuan: [''],
      productOnSaleQuan: [''],
      productCost: [''],
      productOnSaleCost: [''],
      productImgFile: ['']
    });
  }

  ngOnDestroy(): void {
    this.dataServiceSub.unsubscribe(); 
    this.modalServiceSub.unsubscribe();
  }

  // function used for form controls on new product modal (name, category & catNumber).
  get f() { return this.newProdForm.controls; }
  get v() { return this.editProdForm.controls; }

  getAllProducts() {
    const observer: Observable<Product[]> = this.productService.getAllProducts();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(this.stringService.plLoadFail);
      }
    );
  }

  searchProducts() {
    const searchInput = this.productsSearchForm.controls[this.stringService.searchInput].value;
    const observer: Observable<Product[]> = this.productService.searchProducts(searchInput);
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
      }
    );
  }

  filterProductsByCategory() {
    const productCat = this.categorySearchForm.controls[this.stringService.productCat].value;
    const observer: Observable<Product[]> = this.productService.filterProductsByCategory(productCat);
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(this.stringService.prodCatFilterFail);
      }
    );
  }

  selectPaginationPageSize() {
    this.pageSize = this.paginationForm.controls[this.stringService.pageSize].value;
  }

  public createNewProduct(): void {

    this.submitted = true;

    // stop here if form is invalid.
    if (this.newProdForm.invalid) {
      return;
    }

    let productCat = this.newProdForm.controls[this.stringService.productCat].value;
    let productName = this.newProdForm.controls[this.stringService.productName].value;
    let productManuf = this.newProdForm.controls[this.stringService.productManuf].value;
    let productCatalogNum = this.newProdForm.controls[this.stringService.productCatalogNum].value;
    let productQuan = this.newProdForm.controls[this.stringService.productQuan].value;
    let productOnSaleQuan = this.newProdForm.controls[this.stringService.productOnSaleQuan].value;
    let productCost = this.newProdForm.controls[this.stringService.productCost].value;
    let productOnSaleCost = this.newProdForm.controls[this.stringService.productOnSaleCost].value;
    let productImgFile = this.newProdForm.controls[this.stringService.productImgFile].value;

    if (productQuan === (null)) {
      productQuan = '0';
    }
    if (productOnSaleQuan === (null)) {
      productOnSaleQuan = '0';
    }
    if (productCost === (null)) {
      productCost = '0';
    }
    if (productOnSaleCost === (null)) {
      productOnSaleCost = '0';
    }
    if (productManuf === (null)) {
      productManuf = '';
    }
    if (productImgFile === (null)) {
      productImgFile = '';
    }

    const observer: Observable<Product> = this.productService.newProductCatalogNumCheck(productCatalogNum);

    // Result for catalog number check.
    observer.subscribe(
      (res) => {

        const observer: Observable<Product> = this.productService.createNewProduct
          (productCat, productName, productManuf, productCatalogNum,
            productQuan, productOnSaleQuan, productCost, productOnSaleCost, productImgFile);

        // Result for create new product.
        observer.subscribe(
          (res) => {
            this.submitted = false;
            this.spinnerService.showSpinner();
            setTimeout(() => {
              document.getElementById(this.stringService.newProdModalClose).click();
              this.snackbarService.show(this.stringService.productAdded);
              this.getAllProducts();
            }, 1300);
            this.newProdForm.reset(); // Reset the form inputs.
          },
          (error) => {
            this.spinnerService.showSpinner();
            setTimeout(() => {
              this.snackbarService.show(this.stringService.productAddFail, 'danger');
            }, 1300);
          }
        );
      },
      // Error for catalog number check.
      (error) => {
        this.modalService.openModal(this.modalService.createModalObject(this.stringService.valueExistsModal,
          this.stringService.newProdCatNumErrorID, this.stringService.newProdCatNumErrorBTN,
          this.stringService.newProdCatNumErrorHeadline, this.stringService.prodCatNumErrorText));
      }
    );
  }

  // Function for getting the details of the product that the user clicked and wants to edit.
  public getEditForm(product: Product): void {

    this.dataService.changeId(product.productId);

    this.defaultCategory = product.productCat;
    this.defaultColor = product.productColor;

    this.editProdForm = this.formBuilder.group({
      productCat: [''],
      productName: [product.productName],
      productCatalogNum: [product.productCatalogNum],
      productManuf: [product.productManuf],
      productQuan: [product.productQuan, Validators.max(2147483647)],
      productOnSaleQuan: [product.productOnSaleQuan, Validators.max(2147483647)],
      productCost: [product.productCost, Validators.max(2147483647)],
      productOnSaleCost: [product.productOnSaleCost, Validators.max(2147483647)],
      productImgFile: [product.productImgFile]
    });
    this.submittedEdit = false;
  }

  public editProduct(): void {

    this.submittedEdit = true;

    // stop here if form is invalid.
    if (this.editProdForm.invalid) {
      return;
    }

    const productCat = this.editProdForm.controls[this.stringService.productCat].value;
    const productName = this.editProdForm.controls[this.stringService.productName].value;
    const productManuf = this.editProdForm.controls[this.stringService.productManuf].value;
    const productCatalogNum = this.editProdForm.controls[this.stringService.productCatalogNum].value;
    const productQuan = this.editProdForm.controls[this.stringService.productQuan].value;
    const productOnSaleQuan = this.editProdForm.controls[this.stringService.productOnSaleQuan].value;
    const productCost = this.editProdForm.controls[this.stringService.productCost].value;
    const productOnSaleCost = this.editProdForm.controls[this.stringService.productOnSaleCost].value;
    const productImgFile = this.editProdForm.controls[this.stringService.productImgFile].value;

    const observer: Observable<Product> = this.productService.editProductCatalogNumCheck(this.productId,
      productCatalogNum);

    // Result for check catalog number function.
    observer.subscribe(
      (res) => {

        const observer: Observable<Product> = this.productService.editProduct
          (this.productId, productCat, productName, productManuf, productCatalogNum,
            productQuan, productOnSaleQuan, productCost, productOnSaleCost, productImgFile);

        // Result for edit product function.
        observer.subscribe(
          (res) => {
            this.spinnerService.showSpinner();
            setTimeout(() => {
              document.getElementById(this.stringService.editProdClose).click();
              this.snackbarService.show(this.stringService.productEdited);
              this.getAllProducts();
            }, 1300);
          },
          (error) => {
            this.spinnerService.showSpinner();
            setTimeout(() => {
              this.snackbarService.show(this.stringService.productEditFail, 'danger');
            }, 1300);
          }
        );
      },
      // Error for check catalog number function.
      (error) => {
        this.modalService.openModal(this.modalService.createModalObject(this.stringService.valueExistsModal,
          this.stringService.editProdCatNumErrorID, this.stringService.editProdCatNumErrorBTN,
          this.stringService.editProdCatNumErrorHeadline, this.stringService.prodCatNumErrorText));
      }
    );
  }

  public openDeleteProductConfirmModel(product: Product) {
    this.dataService.changeId(product.productId);
    this.modalService.openModal(this.modalService.createModalObject(this.stringService.confirmModal, 
      this.stringService.deleteProdID, this.stringService.deleteProdBTN, this.stringService.deleteProdHeadline,
      this.stringService.deleteProdText));
  }

  public deleteProduct(): void {

    const observer: Observable<Product> = this.productService.deleteProduct(this.productId);
    observer.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.getAllProducts();
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

  // Sort functions

  sortByProductIdAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductIdAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product id number`);
      }
    );
  }

  sortByProductIdDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductIdDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product id number`);
      }
    );
  }

  sortByProductCatAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductCatAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product category`);
      }
    );
  }

  sortByProductCatDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductCatDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product category`);
      }
    );
  }

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

  sortByProductNameDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductNameDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product name`);
      }
    );
  }

  sortByProductManufAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductManufAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product manufacturer`);
      }
    );
  }

  sortByProductManufDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductManufDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product manufacturer`);
      }
    );
  }

  sortByProductCatalogNumAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductCatalogNumAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product catalog number`);
      }
    );
  }

  sortByProductCatalogNumDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductCatalogNumDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product catalog number`);
      }
    );
  }

  sortByProductQuanAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductQuanAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product quantity`);
      }
    );
  }

  sortByProductQuanDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductQuanDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product quantity`);
      }
    );
  }

  sortByProductOnSaleQuanAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductOnSaleQuanAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product on sale quantity`);
      }
    );
  }

  sortByProductOnSaleQuanDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductOnSaleQuanDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product on sale quantity`);
      }
    );
  }

  sortByProductCostAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductCostAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product cost`);
      }
    );
  }

  sortByProductCostDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductCostDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product cost`);
      }
    );
  }

  sortByProductOnSaleCostAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductOnSaleCostAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product on sale cost`);
      }
    );
  }

  sortByProductOnSaleCostDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductOnSaleCostDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product on sale cost`);
      }
    );
  }

  sortByProductTotalCostAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductTotalCostAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product total cost`);
      }
    );
  }

  sortByProductTotalCostDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductTotalCostDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product total cost`);
      }
    );
  }

  sortByProductOnSaleTotalCostAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductOnSaleTotalCostAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product on sale total cost`);
      }
    );
  }

  sortByProductOnSaleTotalCostDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductOnSaleTotalCostDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product on sale total cost`);
      }
    );
  }

  sortByProductCombinedTotalCostAsc() {
    const observer: Observable<Product[]> = this.productService.sortByProductCombinedTotalCostAsc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product combined total cost`);
      }
    );
  }

  sortByProductCombinedTotalCostDesc() {
    const observer: Observable<Product[]> = this.productService.sortByProductCombinedTotalCostDesc();
    observer.subscribe(
      (res) => {
        this.productList = res;
      },
      (error) => {
        alert(`${this.stringService.sortFail} product combined total cost`);
      }
    );
  }
}