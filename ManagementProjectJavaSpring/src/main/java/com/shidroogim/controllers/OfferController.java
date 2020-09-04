package com.shidroogim.controllers;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shidroogim.components.OfferFacade;
import com.shidroogim.entities.Offer;
import com.shidroogim.utils.OfferUtils;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class OfferController {

	private final OfferFacade of;
	
	public OfferController(@Autowired ApplicationContext context) {
		of = context.getBean(OfferFacade.class);
	}
	
	public Offer exception() {
		return null;
	}
	
	@RequestMapping("Shidroogim/searchOffers")
	@ResponseBody
	public String searchOffers(@RequestParam String searchInput) {
		if (searchInput.equalsIgnoreCase("") || searchInput.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return OfferUtils.sendOffersJsonList(of.searchOffers(searchInput));
		}
	}
	
	@RequestMapping("Shidroogim/getOfferProductsList")
	@ResponseBody
	public String getOfferProductsList() {
		return OfferUtils.sendOfferProductsJsonList(of.getOfferProductsList());
	}
	
	@RequestMapping("Shidroogim/offerNumberCheck")
	@ResponseBody
	public String offerNumberCheck(@RequestParam String offerNumber) {
		if (offerNumber.equalsIgnoreCase("") || offerNumber.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return of.offerNumberCheck(Integer.parseInt(offerNumber)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/offerNumberCheckForEdit")
	@ResponseBody
	public String offerNumberCheckForEdit(@RequestParam String offerNumber, @RequestParam String tempOfferNumber) {
		if (offerNumber.equalsIgnoreCase("") || offerNumber.equalsIgnoreCase(null)
				|| tempOfferNumber.equalsIgnoreCase("") || tempOfferNumber.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return of.offerNumberCheckForEdit(Integer.parseInt(offerNumber), Integer.parseInt(tempOfferNumber))
					.toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/offerProductIdCheck")
	@ResponseBody
	public String offerProductIdCheck(@RequestParam String offerProductId) {
		if (offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.offerProductIdCheck(Integer.parseInt(offerProductId)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/offerProductIdCheckForEdit")
	@ResponseBody
	public String offerProductIdCheckForEdit(@RequestParam String offerProductId, @RequestParam String tempOfferProductId) {
		if (offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null) ||
				tempOfferProductId.equalsIgnoreCase("") || tempOfferProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.offerProductIdCheckForEdit(Integer.parseInt(offerProductId), 
				Integer.parseInt(tempOfferProductId)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/offerProductIdCheckForActiveOfferAdd")
	@ResponseBody
	public String offerProductIdCheckForActiveOfferAdd(@RequestParam String oId, @RequestParam String offerProductId) {
		if (oId.equalsIgnoreCase("") || oId.equalsIgnoreCase(null) ||
				offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.offerProductIdCheckForActiveOfferAdd(Integer.parseInt(oId), 
				Integer.parseInt(offerProductId)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/offerProductIdCheckForActiveOfferEdit")
	@ResponseBody
	public String offerProductIdCheckForActiveOfferEdit(@RequestParam String oId, @RequestParam String offerProductId, 
			@RequestParam String tempOfferProductId) {
		if (oId.equalsIgnoreCase("") || oId.equalsIgnoreCase(null) ||
				offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.offerProductIdCheckForActiveOfferEdit(Integer.parseInt(oId), 
				Integer.parseInt(offerProductId), Integer.parseInt(tempOfferProductId)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/createNewOffer")
	@ResponseBody
	public String createNewOffer(@RequestParam String offerNumber, @RequestParam String offerCustName, 
			@RequestParam String offerCustAddress, @RequestParam String offerDescription, @RequestParam String offerOrigin,
			@RequestParam String offerType, @RequestParam String offerRemarks, @RequestParam String offerCustPayment,
			@RequestParam String offerReceived, @RequestParam String dateOfOffer) {
		if (offerNumber.equalsIgnoreCase("") || offerNumber.equalsIgnoreCase(null) ||
				offerCustPayment.equalsIgnoreCase("") || offerCustPayment.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.createNewOffer(Integer.parseInt(offerNumber), offerCustName, offerCustAddress, offerDescription, 
				offerOrigin, offerType, offerRemarks, Double.parseDouble(offerCustPayment), 
				offerReceived, LocalDate.parse(dateOfOffer)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/editOffer")
	@ResponseBody
	public String editOffer(@RequestParam String offerId, @RequestParam String offerNumber, @RequestParam String offerCustName, 
			@RequestParam String offerCustAddress, @RequestParam String offerDescription, @RequestParam String offerOrigin,
			@RequestParam String offerType, @RequestParam String offerRemarks, @RequestParam String offerReceived, 
			@RequestParam String dateOfOffer) {
		if (offerId.equalsIgnoreCase("") || offerId.equalsIgnoreCase(null) ||
				offerNumber.equalsIgnoreCase("") || offerNumber.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.editOffer(Integer.parseInt(offerId), Integer.parseInt(offerNumber), offerCustName, offerCustAddress, offerDescription, 
				offerOrigin, offerType, offerRemarks, offerReceived, LocalDate.parse(dateOfOffer)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/deleteOffer")
	@ResponseBody
	public String deleteOffer(@RequestParam String offerId) {
		if (offerId.equalsIgnoreCase("") || offerId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.deleteOffer(Integer.parseInt(offerId)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/getActiveOfferProductsList")
	@ResponseBody
	public String getActiveOfferProductsList(@RequestParam String oId) {
		if (oId.equalsIgnoreCase("") || oId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return OfferUtils.sendOfferProductsJsonList(of.getActiveOfferProductsList(Integer.parseInt(oId)));
		}
	}
	
	@RequestMapping("Shidroogim/addToOfferProductTable")
	@ResponseBody
	public String addToOfferProductTable(@RequestParam String offerProductId, @RequestParam String offerProductNumber,
			@RequestParam String offerProductName, @RequestParam String offerProductQuantity, @RequestParam String offerProductCost,
			@RequestParam String offerProductSubtotal) {
		if (offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null) ||
				offerProductNumber.equalsIgnoreCase("") || offerProductNumber.equalsIgnoreCase(null) ||
				offerProductQuantity.equalsIgnoreCase("") || offerProductQuantity.equalsIgnoreCase(null) ||
				offerProductCost.equalsIgnoreCase("") || offerProductCost.equalsIgnoreCase(null) ||
				offerProductSubtotal.equalsIgnoreCase("") || offerProductSubtotal.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return OfferUtils.sendOfferProductsJsonList(of.addToOfferProductTable(Integer.parseInt(offerProductId), 
				Integer.parseInt(offerProductNumber), offerProductName, Integer.parseInt(offerProductQuantity), 
				Double.parseDouble(offerProductCost), Double.parseDouble(offerProductSubtotal)));
		}
	}
	
	@RequestMapping("Shidroogim/editOfferProducts")
	@ResponseBody
	public String editOfferProducts(@RequestParam String offerProductId, @RequestParam String tempOfferProductId, 
			@RequestParam String offerProductNumber, @RequestParam String offerProductName, @RequestParam String offerProductQuantity,
			@RequestParam String offerProductCost, @RequestParam String offerProductSubtotal) {
		if (offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null) ||
				tempOfferProductId.equalsIgnoreCase("") || tempOfferProductId.equalsIgnoreCase(null) ||
				offerProductNumber.equalsIgnoreCase("") || offerProductNumber.equalsIgnoreCase(null) ||
				offerProductQuantity.equalsIgnoreCase("") || offerProductQuantity.equalsIgnoreCase(null) ||
				offerProductCost.equalsIgnoreCase("") || offerProductCost.equalsIgnoreCase(null) ||
				offerProductSubtotal.equalsIgnoreCase("") || offerProductSubtotal.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return OfferUtils.sendOfferProductsJsonList(of.editOfferProducts(Integer.parseInt(offerProductId), 
				Integer.parseInt(tempOfferProductId), Integer.parseInt(offerProductNumber), offerProductName, 
				Integer.parseInt(offerProductQuantity), Double.parseDouble(offerProductCost), 
				Double.parseDouble(offerProductSubtotal)));
		}
	}
	
	@RequestMapping("Shidroogim/deleteOfferProducts")
	@ResponseBody
	public String deleteOfferProducts(@RequestParam String offerProductId) {
		if (offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return OfferUtils.sendOfferProductsJsonList(of.deleteOfferProducts(Integer.parseInt(offerProductId)));
		}
	}
	
	@RequestMapping("Shidroogim/addActiveOfferProduct")
	@ResponseBody
	public String addActiveOfferProduct(@RequestParam String oId, @RequestParam String offerProductId,
			@RequestParam String offerProductNumber, @RequestParam String offerProductName, 
			@RequestParam String offerProductQuantity, @RequestParam String offerProductCost, 
			@RequestParam String offerProductSubtotal) {
		if (oId.equalsIgnoreCase("") || oId.equalsIgnoreCase(null) ||
				offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null) ||
				offerProductNumber.equalsIgnoreCase("") || offerProductNumber.equalsIgnoreCase(null) ||
				offerProductQuantity.equalsIgnoreCase("") || offerProductQuantity.equalsIgnoreCase(null) ||
				offerProductCost.equalsIgnoreCase("") || offerProductCost.equalsIgnoreCase(null) ||
				offerProductSubtotal.equalsIgnoreCase("") || offerProductSubtotal.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.addActiveOfferProduct(Integer.parseInt(oId), Integer.parseInt(offerProductId), 
				Integer.parseInt(offerProductNumber), offerProductName, Integer.parseInt(offerProductQuantity), 
				Double.parseDouble(offerProductCost), Double.parseDouble(offerProductSubtotal)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/editActiveOfferProduct")
	@ResponseBody
	public String editActiveOfferProduct(@RequestParam String oId, @RequestParam String offerProductId, 
			@RequestParam String tempOfferProductId, @RequestParam String offerProductNumber, 
			@RequestParam String offerProductName, @RequestParam String offerProductQuantity, 
			@RequestParam String offerProductCost, @RequestParam String offerProductSubtotal) {
		if (oId.equalsIgnoreCase("") || oId.equalsIgnoreCase(null) ||
				offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null) ||
				tempOfferProductId.equalsIgnoreCase("") || tempOfferProductId.equalsIgnoreCase(null) ||
				offerProductNumber.equalsIgnoreCase("") || offerProductNumber.equalsIgnoreCase(null) ||
				offerProductQuantity.equalsIgnoreCase("") || offerProductQuantity.equalsIgnoreCase(null) ||
				offerProductCost.equalsIgnoreCase("") || offerProductCost.equalsIgnoreCase(null) ||
				offerProductSubtotal.equalsIgnoreCase("") || offerProductSubtotal.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return of.editActiveOfferProduct(Integer.parseInt(oId), Integer.parseInt(offerProductId), 
				Integer.parseInt(tempOfferProductId), Integer.parseInt(offerProductNumber), offerProductName, 
				Integer.parseInt(offerProductQuantity), Double.parseDouble(offerProductCost), 
				Double.parseDouble(offerProductSubtotal)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/deleteActiveOfferProducts")
	@ResponseBody
	public String deleteActiveOfferProducts(@RequestParam String oId, @RequestParam String offerProductId) {
		if (oId.equalsIgnoreCase("") || oId.equalsIgnoreCase(null) ||
				offerProductId.equalsIgnoreCase("") || offerProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		}else {
		return of.deleteActiveOfferProducts(Integer.parseInt(oId), Integer.parseInt(offerProductId)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/sortByOfferIdAsc")
	@ResponseBody
	public String sortByOfferIdAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferIdAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferIdDesc")
	@ResponseBody
	public String sortByOfferIdDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferIdDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferNumberAsc")
	@ResponseBody
	public String sortByOfferNumberAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferNumberAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferNumberDesc")
	@ResponseBody
	public String sortByOfferNumberDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferNumberDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferCustNameAsc")
	@ResponseBody
	public String sortByOfferCustNameAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferCustNameAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferCustNameDesc")
	@ResponseBody
	public String sortByOfferCustNameDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferCustNameDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferCustAddressAsc")
	@ResponseBody
	public String sortByOfferCustAddressAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferCustAddressAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferCustAddressDesc")
	@ResponseBody
	public String sortByOfferCustAddressDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferCustAddressDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferDescriptionAsc")
	@ResponseBody
	public String sortByOfferDescriptionAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferDescriptionAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferDescriptionDesc")
	@ResponseBody
	public String sortByOfferDescriptionDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferDescriptionDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferOriginAsc")
	@ResponseBody
	public String sortByOfferOriginAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferOriginAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferOriginDesc")
	@ResponseBody
	public String sortByOfferOriginDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferOriginDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferTypeAsc")
	@ResponseBody
	public String sortByOfferTypeAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferTypeAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferTypeDesc")
	@ResponseBody
	public String sortByOfferTypeDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferTypeDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferRemarksAsc")
	@ResponseBody
	public String sortByOfferRemarksAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferRemarksAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferRemarksDesc")
	@ResponseBody
	public String sortByOfferRemarksDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferRemarksDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferCustPaymentsAsc")
	@ResponseBody
	public String sortByOfferCustPaymentsAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferCustPaymentsAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferCustPaymentDesc")
	@ResponseBody
	public String sortByOfferCustPaymentDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferCustPaymentDesc());
	}
	
	@RequestMapping("Shidroogim/sortByDateOfOfferAsc")
	@ResponseBody
	public String sortByDateOfOfferAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByDateOfOfferAsc());
	}
	
	@RequestMapping("Shidroogim/sortByDateOfOfferDesc")
	@ResponseBody
	public String sortByDateOfOfferDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByDateOfOfferDesc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferReceivedAsc")
	@ResponseBody
	public String sortByOfferReceivedAsc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferReceivedAsc());
	}
	
	@RequestMapping("Shidroogim/sortByOfferReceivedDesc")
	@ResponseBody
	public String sortByOfferReceivedDesc() {
		return OfferUtils.sendOffersJsonList(of.sortByOfferReceivedDesc());
	}
}
