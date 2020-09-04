import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StringService {

  // ***** General strings *****
  public youAreIdleModalClose: string = 'youAreIdleModalClose';
  public youAreIdleModalOpen: string = 'youAreIdleModalOpen';
  public idle: string = 'עקב חוסר פעילות המערכת תתנתק בעוד';
  public searchInput: string = 'searchInput';
  public pageSize: string = 'pageSize';
  public logoutFail: string = 'Unable to logout!';
  public tokenNotFound: string = 'Token not found!'
  public sortFail: string = 'Failed to sort by';


  // Components names
  public login: string = 'login';
  public navbar: string = 'navbar';
  public homepage: string = 'homepage';
  public activeOffers: string = 'active-offers';
  public newOffer: string = 'new-offer';

  // ***** Modal strings *****

  // Modal types
  public valueExistsModal: string = 'valueExistsModal';
  public confirmModal: string = 'confirmModal';

  // New product catalogue number error
  public newProdCatNumErrorID: string = 'catNumErrorModalForNewProd';
  public newProdCatNumErrorBTN: string = 'openCatNumErrorModalForNewProd';
  public newProdCatNumErrorHeadline: string = '!הוספה נכשלה';
  public prodCatNumErrorText: string = 'המספר הקטלוגי שהזנת כבר קיים במערכת, יש להזין מספר אחר';

  // Edit product catalogue number error
  public editProdCatNumErrorID: string = 'catNumErrorModalForEditProd';
  public editProdCatNumErrorBTN: string = 'openCatNumErrorModalForEditProd';
  public editProdCatNumErrorHeadline: string = '!עריכה נכשלה';

  // Delete product
  public deleteProdID: string = 'deleteProductConfirmModel';
  public deleteProdBTN: string = 'deleteProductConfirmModelOpen';
  public deleteProdHeadline: string = '?האם את\\ה בטוח\\ה שברצונך למחוק את המוצר';
  public deleteProdText: '';

  // New offer number error
  public newOfferNumErrorID: string = 'offerNumberAlreadyExistModal';
  public newOfferNumErrorBTN: string = 'openOfferNumberAlreadyExistModal';
  public newOfferNumErrorHeadline: string = '!שמירת ההצעה נכשלה';
  public newOfferNumErrorText: string = 'מספר ההצעה שהזנת כבר קיים במערכת, יש להזין מספר אחר';

  // Product already exists in offer
  public prodExistsInOfferID: string = 'productAlreadyExistModal';
  public prodExistsInOfferBTN: string = 'openProductAlreadyExistModal';
  public prodExistsInOfferHeadline: string = '!הוספת המוצר נכשלה';
  public prodExistsInOfferText: string = 'המוצר שבחרת כבר נוסף להצעה, יש לבחור מוצר אחר';

  // Move offer to History
  public moveOfferToHistoryID: string = 'moveToOfferHistoryConfirmModal';
  public moveOfferToHistoryBTN: string = 'moveToOfferHistoryConfirmModalOpen';
  public moveOfferToHistoryHeadline: string = 'להעברת ההצעה להיסטורייה יש ללחוץ על אישור'
  public moveOfferToHistoryText: string = '';

  // Move offer to active
  public moveOfferToActiveID: string = 'moveToActiveOfferConfirmModal';
  public moveOfferToActiveBTN: string = 'moveToActiveOfferConfirmModalOpen';
  public moveOfferToActiveHeadline: string = 'להעברת ההצעה להצעות הפעילות יש ללחוץ על אישור'
  public moveOfferToActiveText: string = '';

  // Delete offer
  public deleteOfferID: string = 'deleteOfferConfirmModal';
  public deleteOfferBTN: string = 'deleteOfferConfirmModalOpen';
  public deleteOfferHeadline: string = '?האם את\\ה בטוח\\ה שברצונך למחוק את ההצעה';
  public deleteOfferText: string = '';

  // Move job to History
  public moveJobToActiveID: string = 'moveToJobActiveConfirmModal';
  public moveJobToActiveBTN: string = 'moveToJobActiveConfirmModalOpen';
  public moveJobToActiveHeadline: string = 'להעברת העבודה לעבודות הפעילות יש ללחוץ על אישור'
  public moveJobToActiveText: string = '';

  // Delete job
  public deleteJobID: string = 'deleteJobConfirmModal';
  public deleteJobBTN: string = 'deleteJobConfirmModalOpen';
  public deleteJobHeadline: string = '?האם את\\ה בטוח\\ה שברצונך למחוק את העבודה';
  public deleteJobText: string = '';

  // Product already exists in job
  public prodExistsInJobID: string = 'productAlreadyExistModal';
  public prodExistsInJobBTN: string = 'openProductAlreadyExistModal';
  public prodExistsInJobHeadline: string = '!הוספת המוצר נכשלה';
  public prodExistsInJobText: string = 'המוצר שבחרת כבר נוסף לעבודה, יש לבחור מוצר אחר';

  // ***** Login strings *****
  public loginToken: string = 'token';
  public userName: string = 'userName';
  public password: string = 'password';
  public loginFailedSnackbar: string = 'loginFailed';
  public loginFailed: string = 'שם משתמש או סיסמה שגויים';


  // ***** Product strings *****
  public plLoadFail: string = 'Failed to load the products';
  public prodCatFilterFail: string = 'Failed to filter products by category';
  public productIdFail: string = 'Failed to find product by id';

  // Product Controls
  public productCat: string = 'productCat';
  public productName: string = 'productName';
  public productManuf: string = 'productManuf';
  public productCatalogNum: string = 'productCatalogNum';
  public productQuan: string = 'productQuan';
  public productOnSaleQuan: string = 'productOnSaleQuan';
  public productCost: string = 'productCost';
  public productOnSaleCost: string = 'productOnSaleCost';
  public productImgFile: string = 'productImgFile';

  // Product HTML elements
  public newProdModalClose: string = 'newProdClose';
  public editProdClose: string = 'editProdClose';
  public deleteProductConfirmModelOpen: string = 'deleteProductConfirmModelOpen';

  public productAddedSnackbar: string = 'productAddedSnackbar';
  public productFailedToAddSnackbar: string = 'productFailedToAddSnackbar';
  public productEditedSnackbar: string = 'productEditedSnackbar';
  public productFailedToEditSnackbar: string = 'productFailedToEditSnackbar';
  public productDeletedSnackbar: string = 'productDeletedSnackbar';
  public productFailedToDeleteSnackbar: string = 'productFailedToDeleteSnackbar';

  // Product snackbar messages
  public productAdded: string = 'המוצר נוסף לטבלה בהצלחה';
  public productAddFail: string = 'יצירת המוצר נכשלה';
  public productEdited: string = 'המוצר עודכן בהצלחה';
  public productEditFail: string = 'עדכון המוצר נכשל';
  public productDeleted: string = 'המוצר נמחק בהצלחה';
  public productDeleteFail: string = 'מחיקת המוצר נכשלה';

  // ***** Offer strings *****
  public olLoadFail: string = 'Failed to load offers'

  // Offer HTML elements
  public openOfferNumberAlreadyExistModal: string = 'openOfferNumberAlreadyExistModal';
  public moveToOfferHistoryConfirmModal: string = 'moveToOfferHistoryConfirmModal';
  public moveToActiveOfferConfirmModalClose: string = 'moveToActiveOfferConfirmModalClose';
  public editActiveOfferClose: string = 'editActiveOfferClose';
  public editOffersHistoryClose: string = 'editOffersHistoryClose';
  public deleteActiveOfferConfirmModalOpen: string = 'deleteActiveOfferConfirmModalOpen';
  public deleteOfferHistoryConfirmModalOpen: string = 'deleteOfferHistoryConfirmModalOpen';

  public offerMovedToHistorySnackbar: string = 'offerMovedToHistorySnackbar';
  public failedToMoveOfferToHistorySnackbar: string = 'failedToMoveOfferToHistorySnackbar';
  public offerMovedToActiveOfferSnackbar: string = 'offerMovedToActiveOfferSnackbar';
  public failedToMoveOfferToActiveOfferSnackbar: string = 'failedToMoveOfferToActiveOfferSnackbar';
  public offerCreatedSnackbar: string = 'offerCreatedSnackbar';
  public failedToCreateOfferSnackbar: string = 'failedToCreateOfferSnackbar';
  public offerEditedSnackbar: string = 'offerEditedSnackbar';
  public failedToEditOfferSnackbar: string = 'failedToEditOfferSnackbar';
  public offerDeletedSnackbar: string = 'offerDeletedSnackbar';
  public failedToDeleteOfferSnackbar: string = 'failedToDeleteOfferSnackbar';

  // Offer Controls
  public offerNumber: string = 'offerNumber';
  public offerCustName: string = 'offerCustName';
  public offerCustAddress: string = 'offerCustAddress';
  public offerDescription: string = 'offerDescription';
  public offerOrigin: string = 'offerOrigin';
  public offerType: string = 'offerType';
  public offerRemarks: string = 'offerRemarks';
  public offerReceived: string = 'offerReceived';
  public dateOfOffer: string = 'dateOfOffer';

  // Offer snackbar messages
  public offerCreated: string = 'ההצעה נוצרה בהצלחה';
  public offerCreateFail: string = 'יצירת ההצעה נכשלה';
  public offerEdited: string = 'ההצעה נערכה בהצלחה';
  public offerEditFail: string = 'עריכת ההצעה נכשלה';
  public offerDeleted: string = 'ההצעה נמחקה בהצלחה';
  public offerDeleteFail: string = 'מחיקת ההצעה נכשלה';
  public offerMovedToHistory: string = 'ההצעה הועברה להיסטוריה בהצלחה';
  public offerMovedToHistoryFail: string = 'העברת ההצעה להיסטוריה נכשלה';
  public offerMovedToActive: string = 'ההצעה הועברה להצעות הפעילות בהצלחה';
  public offerMovedToActiveFail: string = 'העברת ההצעה להצעות הפעילות נכשלה';
  public noOfferProducts: string = 'אין מוצרים להצגה בהצעה זו';


  // ***** Offer Products strings *****
  public openProductAlreadyExistModal: string = 'openProductAlreadyExistModal';
  public deleteOfferProductConfirmModalOpen: string = 'deleteOfferProductConfirmModalOpen';
  public newOfferProductClose: string = 'newOfferProductClose';

  public noOfferProductsSnackbar: string = 'noOfferProductsSnackbar';

  // Offer Products controls
  public offerProductId: string = 'offerProductId';
  public offerProductNumber: string = 'offerProductNumber';
  public offerProductQuantity: string = 'offerProductQuantity';
  public offerProductCost: string = 'offerProductCost';


  // ***** Job strings *****
  public jlLoadFail: string = 'Failed to load jobs'


  // Job HTML elements
  public editActiveJobClose: string = 'editActiveJobClose';
  public createNewJobModalClose: string = 'createNewJobModalClose';
  public createNewJobHistoryModalClose: string = 'createNewJobHistoryModalClose';
  public deleteActiveJobConfirmModalOpen: string = 'deleteActiveJobConfirmModalOpen';
  public deleteJobsHistoryConfirmModalOpen: string = 'deleteJobsHistoryConfirmModalOpen';
  public jobsHistoryJobClose: string = 'jobsHistoryJobClose';
  public movedToActiveJobsSnackbar: string = 'movedToActiveJobsSnackbar';
  public failedToMoveToActiveJobsSnackbar: string = 'failedToMoveToActiveJobsSnackbar';

  public jobMovedToHistorySnackbar: string = 'jobMovedToHistorySnackbar';
  public failedToMoveToHistoryJobSnackbar: string = 'failedToMoveToHistoryJobSnackbar';
  public jobCreatedSnackbar: string = 'jobCreatedSnackbar';
  public failedToCreateJobSnackbar: string = 'failedToCreateJobSnackbar';
  public jobEditedSnackbar: string = 'jobEditedSnackbar';
  public failedToEditJobSnackbar: string = 'failedToEditJobSnackbar';
  public jobDeletedSnackbar: string = 'jobDeletedSnackbar';
  public failedToDeleteJobSnackbar: string = 'failedToDeleteJobSnackbar';

  // Job controls
  public laborCost: string = 'laborCost';
  public dateOfInstall: string = 'dateOfInstall';
  public dateOfCompleat: string = 'dateOfCompleat';
  public jobDescription: string = 'jobDescription';
  public jobOrigin: string = 'jobOrigin';
  public jobType: string = 'jobType';
  public jobRemarks: string = 'jobRemarks';

  // Job snackbar messages
  public jobCreated: string = 'העבודה הופעלה בהצלחה';
  public jobCreateFail: string = 'הפעלת העבודה נכשלה';
  public jobEdited: string = 'העבודה נערכה בהצלחה';
  public jobEditedFail: string = 'עריכת העבודה נכשלה';
  public jobDeleted: string = 'העבודה נמחקה בהצלחה';
  public jobDeletedFail: string = 'מחיקת העבודה נכשלה';
  public noJobProducts: string = 'אין מוצרים להצגה בעבודה זו';
  public jobMovedToHistory: string = 'העבודה הועברה להיסטוריה בהצלחה';
  public jobMovedToHistoryFail: string = 'העברת העבודה להיסטוריה נכשלה';
  public jobMovedToActive: string = 'העבודה הועברה לעבודות הפעילות';
  public jobMovedToActiveFail: string = 'העברת העבודה לעבודות הפעילות נכשלה';


  // ***** Job Products *****
  public newJobProductClose: string = 'newJobProductClose';
  public deleteJobProductConfirmModalOpen: string = 'deleteJobProductConfirmModalOpen';
  public noJobProductsSnackbar: string = 'noJobProductsSnackbar';

  // controls
  public jobProductId: string = 'jobProductId';
  public jobProductNumber: string = 'jobProductNumber';
  public jobProductQuantity: string = 'jobProductQuantity';
  public jobProductCost: string = 'jobProductCost';
  public jobProductInst: string = 'jobProductInst';
}