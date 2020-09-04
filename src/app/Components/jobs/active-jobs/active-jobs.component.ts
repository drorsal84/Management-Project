import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/Services/snackbar-service/SnackbarService';
import { productService } from 'src/app/Services/product-service/ProductService';
import { jobService } from 'src/app/Services/job-service/JobService';
import { Observable } from 'rxjs';
import { Job } from 'src/app/Models/Job';
import { JobProduct } from 'src/app/Models/JobProduct';
import { Product } from 'src/app/models/Product';
import { WorkService } from 'src/app/Services/work-service/WorkService';
import { StringService } from 'src/app/Services/string-service/StringService';
import { ModalService } from 'src/app/Services/modal-service/ModalService';
import { PaginationService } from 'src/app/Services/pagination-service/PaginationService';
import { SpinnerService } from 'src/app/Services/spinner-service/SpinnerService';

@Component({
  selector: 'app-active-jobs',
  templateUrl: './active-jobs.component.html',
  styleUrls: ['./active-jobs.component.css']
})
export class ActiveJobsComponent implements OnInit, OnDestroy {

  public page: number = this.paginationService.page; // First page in the pagination.
  public pageSize: number = this.paginationService.pageSize; // Number of product shown per page in pagination.
  public pageSizeArray: any[] = this.paginationService.pageSizeArray; // Page size options.
  public paginationForm: FormGroup;

  public modalServiceSub: any;// ModalService subscription object.
  public jobStage: string = "AJ";
  public jobId: number; // Used for offer edit.
  public tempJobNumber: number; // Used for offer edit number check.
  public jobProduct: JobProduct; // Object used in editing and deleting offer JobProducts.
  public job: Job; // Object for refreshing jobProducts after edit or delete.
  public custPayment: number; // Variable for setting jobProduct table total cost.
  public jobProductName: string; // Used in editing JobProducts.
  public jId: number; // Used in editing Jobs or JobProducts.
  public jobProductId; // Used in deleting jobProducts.
  public tempProductId: number; // Used in editing JobProducts.
  public prevJobProductQuantity: number; // Used in editing JobProducts.
  public title: string;
  public editJobSubmitted = false; // Submitted boolean for input forms functions.
  public jobProductsSubmitted = false; // Submitted boolean for input forms functions.
  public editJobProductsSubmitted = false; // Submitted boolean for input forms functions.
  public newJobHistorySubmitted = false;

  public editJobForm: FormGroup;
  public createNewJobHistoryForm: FormGroup;
  public activeJobJobProductAddForm: FormGroup;
  public activeJobJobProductEditForm: FormGroup;
  public jobSearchForm: FormGroup;
  public jobProductList: JobProduct[] = []; // Jobproduct list for the job product table.
  public jobsList: Job[] = []; // Job list for jobs table.
  public productList: Product[] = []; // Product list for getting the product names from the product sql table.
  public jobProductQuantityArray: string[] = []; // Array for productInst variable.

  constructor(public router: Router, private formBuilder: FormBuilder,
    private snackbarService: SnackbarService, private productService: productService,
    private jobService: jobService, private workService: WorkService,
    private stringService: StringService, private paginationService: PaginationService,
    private spinnerService: SpinnerService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.jobListSwitcher();
    this.sortByProductNameAsc();
    this.title = "עבודות פעילות";

    if (sessionStorage.getItem(this.stringService.loginToken) === null) { // If there is no session token navigate to the login page.
      this.router.navigate([{ outlets: { primary: this.stringService.login, headerOutlet: null } }]);
    }
    this.modalServiceSub = this.modalService.triggerConfirm.subscribe(val => { // Service for modal confirm functions.
      if (val !== null && val === 'deleteProduct') {
        this.deleteActiveJobProducts();
      }
      if (val !== null && val === 'delete') {
        this.deleteJob();
      }
      if (val !== null && val === 'confirm') {
        this.moveJobToHistory();
      }
    });
    this.jobSearchForm = this.formBuilder.group({
      searchInput: [''],
    });

    this.paginationForm = this.formBuilder.group({
      pageSize: [''],
    });

    this.editJobForm = this.formBuilder.group({
      jobDescription: [''],
      jobOrigin: [''],
      jobType: [''],
      jobRemarks: [''],
      laborCost: [''],
      dateOfInstall: [''],
    });

    this.activeJobJobProductAddForm = this.formBuilder.group({
      jobProductNumber: ['', Validators.max(2147483647)],
      jobProductId: ['', Validators.required],
      jobProductQuantity: ['', Validators.max(2147483647)],
      jobProductCost: ['', Validators.max(2147483647)],
    });

    this.createNewJobHistoryForm = this.formBuilder.group({
      dateOfCompleat: ['', Validators.required],
    });

    this.activeJobJobProductEditForm = this.formBuilder.group({
      jobProductNumber: [''],
      jobProductId: [''],
      jobProductQuantity: [''],
      jobProductCost: [''],
      jobProductInst: [''],
    });
  }

  ngOnDestroy(): void {
    this.modalServiceSub.unsubscribe();
  }

  get v() { return this.createNewJobHistoryForm.controls; }
  get k() { return this.editJobForm.controls; }
  get f() { return this.activeJobJobProductAddForm.controls; }
  get z() { return this.activeJobJobProductEditForm.controls; }

  jobListSwitcher() {
    const observer: Observable<Job[]> = this.workService.jobListSwitcher(this.jobStage)

    observer.subscribe(
      (res) => {
        this.jobsList = res;
      },
      (error) => {
        alert(this.stringService.jlLoadFail);
      }
    );
  }

  moveJobToHistoryModalOpen() {
    document.getElementById(this.stringService.editActiveJobClose).click();
  }

  moveJobToHistory() {

    this.newJobHistorySubmitted = true;
    // stop here if form is invalid.
    if (this.createNewJobHistoryForm.invalid) {
      return;
    }

    const dateOfCompleat = this.createNewJobHistoryForm.controls[this.stringService.dateOfCompleat].value;

    const observer: Observable<Job> = this.jobService.setJobDateOfCompleat
      (this.jobId, dateOfCompleat)

    observer.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          document.getElementById(this.stringService.createNewJobHistoryModalClose).click();
          this.snackbarService.show(this.stringService.jobMovedToHistory);
          this.jobListSwitcher();
        }, 1300);
      },
      (error) => {
        this.snackbarService.show(this.stringService.jobMovedToHistoryFail, 'danger');
      }
    );
  }

  selectPaginationPageSize() {
    this.pageSize = this.paginationForm.controls[this.stringService.pageSize].value;
  }

  searchJobs() {
    const searchInput = this.jobSearchForm.controls[this.stringService.searchInput].value;

    const observer: Observable<Job[]> = this.jobService.searchJobs(searchInput);
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
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

  getJobEditForm(job: Job) {

    this.editJobForm = this.formBuilder.group({
      jobDescription: [job.jobDescription],
      jobOrigin: [job.jobOrigin],
      jobType: [job.jobType],
      jobRemarks: [job.jobRemarks],
      laborCost: [job.laborCost, Validators.max(2147483647)],
      dateOfInstall: [job.dateOfInstall],
    });
    this.jobId = job.jobId;
    this.tempJobNumber = job.jobNumber;
    this.editJobSubmitted = false;
  }

  editActiveJob() {

    this.editJobSubmitted = true;
    // stop here if form is invalid.
    if (this.editJobForm.invalid) {
      return;
    }

    let jobDescription = this.editJobForm.controls[this.stringService.jobDescription].value;
    let jobOrigin = this.editJobForm.controls[this.stringService.jobOrigin].value;
    let jobType = this.editJobForm.controls[this.stringService.jobType].value;
    let jobRemarks = this.editJobForm.controls[this.stringService.jobRemarks].value;
    let laborCost = this.editJobForm.controls[this.stringService.laborCost].value;
    let dateOfInstall = this.editJobForm.controls[this.stringService.dateOfInstall].value;

    if (jobDescription === (null)) {
      jobDescription = '';
    }
    if (jobOrigin === (null)) {
      jobOrigin = '';
    }
    if (jobType === (null)) {
      jobType = '';
    }
    if (jobRemarks === (null)) {
      jobRemarks = '';
    }
    if (laborCost === (null)) {
      laborCost = '0';
    }

    const observer1: Observable<Job> = this.jobService.editJob
      (this.jobId, jobDescription, jobOrigin, jobType,
        jobRemarks, laborCost, dateOfInstall);

    // Result for edit offer.
    observer1.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          document.getElementById(this.stringService.editActiveJobClose).click();
          this.snackbarService.show(this.stringService.jobEdited);
          this.editJobForm.reset();
          this.jobListSwitcher();
        }, 1300);
      },
      // Error for edit offer.
      (error) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.snackbarService.show(this.stringService.jobEditedFail, 'danger');
        }, 1300);
      }
    );

  }

  openDeleteJobConfirmModal(job: Job) {
    this.jobId = job.jobId;
    this.modalService.openModal(this.modalService.createModalObject(this.stringService.confirmModal,
      this.stringService.deleteJobID, this.stringService.deleteJobBTN,
      this.stringService.deleteJobHeadline, this.stringService.deleteJobText));
  }

  deleteJob() {
    const observer: Observable<Job> = this.jobService.deleteJob
      (this.jobId);
    observer.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.jobListSwitcher();
          this.snackbarService.show(this.stringService.jobDeleted);
        }, 1300);
      },
      (error) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.snackbarService.show(this.stringService.jobDeletedFail, 'danger');
        }, 1300);
      }
    );
  }

  openJobProductsModal(job: Job) {

    this.job = job;
    this.jId = job.jobId;
    const observer: Observable<JobProduct[]> = this.jobService.getActiveJobJobProductsList(job.jobId)

    observer.subscribe(
      (res) => {
        this.jobProductList = res;
        this.custPayment = 0;
        for (let i = 0; i < this.jobProductList.length; i++) { // Calculate custPayment after jobProduct add.
          this.custPayment += this.jobProductList[i].jobProductSubtotal;
        }
      },
      (error) => {
        this.custPayment = 0;
        this.jobProductList = [];
        this.snackbarService.show(this.stringService.noJobProducts, 'danger');
      }
    );

  }

  addActiveJobProduct() {

    this.jobProductsSubmitted = true;
    // stop here if form is invalid.
    if (this.activeJobJobProductAddForm.invalid) {
      return;
    }

    // Gets the product name by it's id for the JobProduct table.
    const observer: Observable<Product> = this.productService.getProductById
      (this.activeJobJobProductAddForm.controls[this.stringService.jobProductId].value);
    observer.subscribe(
      (res) => {
        this.jobProductName = res.productName;
      },
      (error) => {
        alert(this.stringService.productIdFail);
      }
    );

    let jobProductNumber = this.activeJobJobProductAddForm.controls[this.stringService.jobProductNumber].value;
    let jobProductId = this.activeJobJobProductAddForm.controls[this.stringService.jobProductId].value;
    let jobProductQuantity = this.activeJobJobProductAddForm.controls[this.stringService.jobProductQuantity].value;
    let jobProductCost = this.activeJobJobProductAddForm.controls[this.stringService.jobProductCost].value;
    let jobProductSubtotal = jobProductCost * jobProductQuantity;

    if (jobProductNumber === (null)) {
      jobProductNumber = '0';
    }
    if (jobProductId === (null)) {
      jobProductId = '0';
    }
    if (this.jobProductName === (null)) {
      this.jobProductName = '-';
    }
    if (jobProductQuantity === (null)) {
      jobProductQuantity = '0';
    }
    if (jobProductCost === (null)) {
      jobProductCost = '0';
    }
    if (jobProductSubtotal === (null)) {
      jobProductSubtotal = 0;
    }

    setTimeout(() => {

      const observer: Observable<JobProduct> = this.jobService.jobProductIdCheckForActiveJobAdd(this.jId,
        jobProductId);

      // Result jobProduct id check.
      observer.subscribe(
        (res) => {

          const observer1: Observable<JobProduct> = this.jobService.addActiveJobProduct
            (this.jId, jobProductId, jobProductNumber, this.jobProductName,
              jobProductQuantity, jobProductCost, jobProductSubtotal);

          // Result for add jobProduct.
          observer1.subscribe(
            (res) => {
              this.jobProductsSubmitted = false;
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.openJobProductsModal(this.job);
                document.getElementById(this.stringService.newJobProductClose).click();
                this.activeJobJobProductAddForm.reset();
                this.snackbarService.show(this.stringService.productAdded);
                this.jobListSwitcher();
              }, 1300);
            },
            // Error for add jobProduct.
            (error) => {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.snackbarService.show(this.stringService.productAddFail, 'danger');
              }, 1300);
            }
          );
        },
        // Error for jobProduct id check.
        (error) => {
          this.modalService.openModal(this.modalService.createModalObject(this.stringService.valueExistsModal,
            this.stringService.prodExistsInJobID, this.stringService.prodExistsInJobBTN,
            this.stringService.prodExistsInJobHeadline, this.stringService.prodExistsInJobText));
        }
      );
    }, 100);

  }

  getEditActiveJobJobProductForm(jobProduct: JobProduct): void {

    this.activeJobJobProductEditForm = this.formBuilder.group({
      jobProductNumber: [jobProduct.jobProductNumber, Validators.max(2147483647)],
      jobProductId: [jobProduct.jobProductId],
      jobProductQuantity: [jobProduct.jobProductQuantity, Validators.max(2147483647)],
      jobProductCost: [jobProduct.jobProductCost, Validators.max(2147483647)],
      jobProductInst: [jobProduct.jobProductInst],
    });
    this.tempProductId = jobProduct.jobProductId;
    this.prevJobProductQuantity = jobProduct.jobProductQuantity;
    this.editJobProductsSubmitted = false;

    if (this.jobProductQuantityArray.length > 0) {
      this.jobProductQuantityArray = [];
    }
    for (var i = jobProduct.jobProductQuantity; i > 0; i--) {
      this.jobProductQuantityArray.push(i.toString());
    }
    this.jobProductQuantityArray.reverse();
  }

  editActiveJobProduct() {

    this.editJobProductsSubmitted = true;
    // stop here if form is invalid.
    if (this.activeJobJobProductEditForm.invalid) {
      return;
    }

    // Gets the product name by it's id for the JobProduct table.
    const observer: Observable<Product> = this.productService.getProductById
      (this.activeJobJobProductEditForm.controls[this.stringService.jobProductId].value);
    observer.subscribe(
      (res) => {
        this.jobProductName = res.productName;
      },
      (error) => {
        alert(this.stringService.productIdFail);
      }
    );

    let jobProductNumber = this.activeJobJobProductEditForm.controls[this.stringService.jobProductNumber].value;
    let jobProductId = this.activeJobJobProductEditForm.controls[this.stringService.jobProductId].value;
    let jobProductQuantity = this.activeJobJobProductEditForm.controls[this.stringService.jobProductQuantity].value;
    let jobProductCost = this.activeJobJobProductEditForm.controls[this.stringService.jobProductCost].value;
    let editJobProductInst = this.activeJobJobProductEditForm.controls[this.stringService.jobProductInst].value;
    let jobProductSubtotal = jobProductCost * jobProductQuantity;

    if (jobProductNumber === (null)) {
      jobProductNumber = '0';
    }
    if (jobProductId === (null)) {
      jobProductId = '0';
    }
    if (this.jobProductName === (null)) {
      this.jobProductName = '-';
    }
    if (jobProductQuantity === (null)) {
      jobProductQuantity = '0';
    }
    if (jobProductCost === (null)) {
      jobProductCost = '0';
    }
    if (jobProductSubtotal === (null)) {
      jobProductSubtotal = 0;
    }
    if (editJobProductInst === (null)) {
      editJobProductInst = 'המוצר טרם הותקן';
    }

    setTimeout(() => {

      const observer: Observable<JobProduct> = this.jobService.jobProductIdCheckForActiveJobEdit(this.jId,
        jobProductId, this.tempProductId);

      // Result jobProduct id check.
      observer.subscribe(
        (res) => {

          const observer1: Observable<JobProduct> = this.jobService.editActiveJobProduct
            (this.jId, jobProductId, this.tempProductId, jobProductNumber, this.jobProductName,
              this.prevJobProductQuantity, jobProductQuantity, jobProductCost, jobProductSubtotal,
              editJobProductInst);

          // Result for edit jobProduct.
          observer1.subscribe(
            (res) => {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.openJobProductsModal(this.job);
                this.snackbarService.show(this.stringService.productEdited);
                document.getElementById(this.stringService.editProdClose).click();
                this.jobListSwitcher();
              }, 1300);
            },
            // Error for edit jobProduct.
            (error) => {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.snackbarService.show(this.stringService.productEditFail, 'danger');
              }, 1300);
            }
          );
        },
        // Error for jobProduct id check.
        (error) => {
          this.modalService.openModal(this.modalService.createModalObject(this.stringService.valueExistsModal,
            this.stringService.prodExistsInJobID, this.stringService.prodExistsInJobBTN,
            this.stringService.prodExistsInJobHeadline, this.stringService.prodExistsInJobText));
        }
      );
    }, 100);
  }

  public openDeleteJobProductConfirmModal(jobProduct: JobProduct) {
    this.jId = jobProduct.jId;
    this.jobProductId = jobProduct.jobProductId;
    this.modalService.openModal(this.modalService.createModalObject(this.stringService.confirmModal,
      this.stringService.deleteProdID, this.stringService.deleteProdBTN, this.stringService.deleteProdHeadline,
      this.stringService.deleteProdText));
  }

  deleteActiveJobProducts() {
    const observer: Observable<Job> = this.jobService.deleteActiveJobProducts
      (this.jId, this.jobProductId);
    observer.subscribe(
      (res) => {
        this.spinnerService.showSpinner();
        setTimeout(() => {
          this.openJobProductsModal(this.job);
          this.snackbarService.show(this.stringService.productDeleted);
          this.jobListSwitcher();
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


  getProductName(jobProductId) {
    const observer: Observable<Product> = this.productService.getProductById(jobProductId);
    observer.subscribe(
      (res) => {
        this.jobProductName = res.productName;
      },
      (error) => {
        alert(this.stringService.productIdFail);
      }
    );
    return this.jobProductName;
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

  sortByJobIdAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobIdAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job id number`);
      }
    );
  }

  sortByJobIdDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobIdDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job id number`);
      }
    );
  }

  sortByJobNumberAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobNumberAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job number`);
      }
    );
  }

  sortByJobNumberDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobNumberDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job number`);
      }
    );
  }

  sortByCustNameAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByCustNameAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer name`);
      }
    );
  }

  sortByCustNameDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByCustNameDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer name`);
      }
    );
  }

  sortByCustAddressAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByCustAddressAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer address`);
      }
    );
  }

  sortByCustAddressDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByCustAddressDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer address`);
      }
    );
  }

  sortByJobDescriptionAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobDescriptionAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job description`);
      }
    );
  }

  sortByJobDescriptionDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobDescriptionDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job description`);
      }
    );
  }

  sortByJobOriginAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobOriginAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job origin`);
      }
    );
  }

  sortByJobOriginDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobOriginDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job origin`);
      }
    );
  }

  sortByJobTypeAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobTypeAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job type`);
      }
    );
  }

  sortByJobTypeDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobTypeDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job type`);
      }
    );
  }

  sortByCustPaymentAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByCustPaymentAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer payment`);
      }
    );
  }

  sortByCustPaymentDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByCustPaymentDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} customer payment`);
      }
    );
  }

  sortByMatCostAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByMatCostAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} mat cost`);
      }
    );
  }

  sortByMatCostDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByMatCostDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} mat cost`);
      }
    );
  }

  sortByLaborCostAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByLaborCostAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} labor cost`);
      }
    );
  }

  sortByLaborCostDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByLaborCostDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} labor cost`);
      }
    );
  }

  sortByProfitAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByProfitAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} profit`);
      }
    );
  }

  sortByProfitDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByProfitDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} profit`);
      }
    );
  }

  sortByProfitPercAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByProfitPercAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} profit percent`);
      }
    );
  }

  sortByProfitPercDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByProfitPercDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        };
      },
      (error) => {
        alert(`${this.stringService.sortFail} profit percent`);
      }
    );
  }

  sortByJobDateOfOfferAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobDateOfOfferAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} date of offer`);
      }
    );
  }

  sortByJobDateOfOfferDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobDateOfOfferDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} date of offer`);
      }
    );
  }

  sortByDateOfInstallAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByDateOfInstallAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} date of install`);
      }
    );
  }

  sortByDateOfInstallDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByDateOfInstallDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} date of install`);
      }
    );
  }

  sortByJobRemarksAsc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobRemarksAsc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail} job remarks`);
      }
    );
  }

  sortByJobRemarksDesc() {
    const observer: Observable<Job[]> = this.jobService.sortByJobRemarksDesc();
    observer.subscribe(
      (res) => {
        this.jobsList = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].jobStage === "AJ") {
            this.jobsList.push(res[i]);
          }
        }
      },
      (error) => {
        alert(`${this.stringService.sortFail}  job remarks`);
      }
    );
  }

}