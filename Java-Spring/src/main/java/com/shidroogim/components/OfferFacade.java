package com.shidroogim.components;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;


import com.shidroogim.entities.Offer;
import com.shidroogim.entities.OfferProducts;
import com.shidroogim.enums.WorkStage;
import com.shidroogim.repositories.OfferProductsRepository;
import com.shidroogim.repositories.OfferRepository;
import com.shidroogim.repositories.ProductRepository;
import com.shidroogim.utils.OfferUtils;


@Component
public class OfferFacade {
	
	private final OfferRepository or;
	private final OfferProductsRepository opr;
	private final ProductRepository pr;
	private static List<OfferProducts> offerProductsList = new ArrayList<>();
	private static OfferProducts deleteThisOfferProduct = new OfferProducts();

	public OfferFacade(@Autowired ApplicationContext context) {
		or = context.getBean(OfferRepository.class);
		opr = context.getBean(OfferProductsRepository.class);
		pr = context.getBean(ProductRepository.class);
	}
	
	public List<Offer> searchOffers(final String searchInput) {
		
		int offerNumber = 0;
		List<Offer>offerSearchResults = new ArrayList<>();
		String[] numbers = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
		
		for (int i=0; i<numbers.length; i++) {
			if(searchInput.contains(numbers[i])) {
				offerNumber = Integer.parseInt(searchInput);
			}
		}
		String offerCustName = searchInput;
		String offerCustAddress = searchInput;
		String offerOrigin = searchInput;
		String offerType = searchInput;

		if(searchInput.equals("") || searchInput.equals(null)) {
			return null;
		}else {
			offerSearchResults.addAll(or.findByOfferCustNameContainingOrOfferCustAddressContainingOrOfferOriginContainingOrOfferType
					(offerCustName, offerCustAddress, offerOrigin, offerType));
			offerSearchResults.addAll(or.findByOfferNumber(offerNumber));
			
		return OfferUtils.returnOffersList(offerSearchResults);	
		}
	}
	
	public List<OfferProducts> getOfferProductsList() {
		return offerProductsList;
	}
	
	public List<OfferProducts> getActiveOfferProductsList(final int oId) {

		if (oId == 0) {
			return null;
		} else {
			return OfferUtils.returnOfferProductsList(opr.findByoId(oId));
		}
	}
	
	public Offer offerNumberCheck(final int offerNumber) {

		Offer emptyOffer = new Offer();
		
		if (offerNumber == 0 || or.findByOfferNumber(offerNumber).isEmpty()) {
			return emptyOffer;
		} else {
			return null;		
		}
	}

	public Offer offerNumberCheckForEdit(final int offerNumber, final int tempOfferNumber) {

		Offer emptyOffer = new Offer();

		for (Offer offerChecker : or.findAll()) {
			if (offerNumber == 0 || tempOfferNumber == 0 || 
					offerNumber == offerChecker.getOfferNumber() && offerNumber != tempOfferNumber) {
				return null;
			}
		}
		return emptyOffer;
	}
	
	public OfferProducts offerProductIdCheck(int offerProductId) {

		OfferProducts emptyOfferProduct = new OfferProducts();
		
		// Check if the product already exists in the list.
		for (OfferProducts offerProduct : offerProductsList) {
			if (offerProductId == offerProduct.getOfferProductId() || offerProductId == 0) {
				return null;
			}
		}
		return emptyOfferProduct;
	}

	public OfferProducts offerProductIdCheckForEdit(final int offerProductId, final int tempOfferProductId) {

		OfferProducts emptyOfferProduct = new OfferProducts();

		// Check if the product already exists in the list.
		for (OfferProducts offerProduct : offerProductsList) {
			if (offerProductId == offerProduct.getOfferProductId() && offerProductId != tempOfferProductId || 
					offerProductId == 0 || tempOfferProductId == 0) {
				return null;
			}
		}
		return emptyOfferProduct;
	}
	
	public OfferProducts offerProductIdCheckForActiveOfferAdd(final int oId, final int offerProductId) {

		OfferProducts emptyOfferProduct = new OfferProducts();
		
		if (opr.findByoIdAndOfferProductId(oId, offerProductId).isPresent() || oId == 0 || offerProductId == 0) {
			return null;
		} else {
			return emptyOfferProduct;
		}
	}

	public OfferProducts offerProductIdCheckForActiveOfferEdit(final int oId, final int offerProductId, final int tempOfferProductId) {

		List<OfferProducts> tempOfferProductsList = new ArrayList<>();
		OfferProducts emptyOfferProduct = new OfferProducts();
		
		for (OfferProducts offerProduct : opr.findByoId(oId)) {
			tempOfferProductsList.add(offerProduct);
		}
		tempOfferProductsList.remove(opr.findByoIdAndOfferProductId(oId, tempOfferProductId).get());

		for (OfferProducts offerProduct1 : tempOfferProductsList) {
			if (offerProduct1.getOfferProductId() == offerProductId || oId == 0 || 
					offerProductId == 0 || tempOfferProductId == 0) {
				return null;
			}
		}
		return emptyOfferProduct;
	}
	
	@Transactional
	public void editOfferCustPayment(List<OfferProducts> offerProductsList, final int offerId, double offerCustPayment) {
		
		for (OfferProducts offerProductCustPayment : offerProductsList) {
			offerCustPayment += offerProductCustPayment.getOfferProductSubtotal();
		}
		or.findById(offerId).get().setOfferCustPayment(offerCustPayment);
		or.save(or.findById(offerId).get());
	}
	
	@Transactional
	public Offer createNewOffer(final int offerNumber, final String offerCustName, final String offerCustAddress, final String offerDescription,
			final String offerOrigin, final String offerType, final String offerRemarks, final double offerCustPayment, final String offerReceived, 
			final LocalDate dateOfOffer) {
		
		Offer offer = new Offer();
		int offerProductMissing = 0;
		int howManyInStock = 0;
		if(offerNumber == 0 || offerCustName.equals("") || offerCustName.equals(null) || dateOfOffer.equals(null)) {
			return null;
		}else {
		offer.setOfferNumber(offerNumber);
		offer.setOfferCustName(offerCustName);

		OfferUtils.offerCheckerSetter(offer, offerCustAddress, offerDescription, offerOrigin, 
				offerType, offerRemarks, offerReceived);

		offer.setOfferCustPayment(offerCustPayment);
		offer.setOfferStage(WorkStage.AO.getWorkStageName());
		
		Date sqlDateOfOffer = Date.valueOf(dateOfOffer);
		offer.setDateOfOffer(sqlDateOfOffer);

		// If the products quantity needed for the offer are more than the quantity that
		// is available in stock, or stock is zero after the offer - setJobProductMissing.
		for (OfferProducts offerProduct : offerProductsList) {
			OfferUtils.setOfferProductMissing(pr.findById(offerProduct.getOfferProductId()).get(), offerProduct, offerProductMissing,
					howManyInStock);
		}

		or.save(offer);

		// SetoId by oId and save.
		for (OfferProducts offerProduct : offerProductsList) {
			offerProduct.setoId(offer.getOfferId());
			opr.save(offerProduct);
		}
		offerProductsList.clear();
		return offer;
		}
	}
	
	@Transactional
	public Offer editOffer(final int offerId, final int offerNumber, final String offerCustName, 
			final String offerCustAddress, final String offerDescription,
			final String offerOrigin, final String offerType, final String offerRemarks, 
			final String offerReceived, final LocalDate dateOfOffer) {

		if (offerId == 0 || offerNumber == 0 || offerCustName.equals("") || offerCustName.equals(null) || 
				dateOfOffer.equals(null) || or.findById(offerId).isEmpty()) {
			return null;
		} else {
			
			or.findById(offerId).get().setOfferNumber(offerNumber);
			or.findById(offerId).get().setOfferCustName(offerCustName);

			OfferUtils.offerCheckerSetter(or.findById(offerId).get(), offerCustAddress, offerDescription, offerOrigin, 
					offerType, offerRemarks, offerReceived);

			Date sqlDateOfOffer = Date.valueOf(dateOfOffer);
			or.findById(offerId).get().setDateOfOffer(sqlDateOfOffer);

			or.save(or.findById(offerId).get());

			return or.findById(offerId).get();
		}
	}
	
	@Transactional
	public Offer deleteOffer(final int offerId) {

		Offer emptyOffer = new Offer();

		if (offerId == 0 || or.findById(offerId).isEmpty()) {
			return null;
		} else {
			or.delete(or.findById(offerId).get());

			for (OfferProducts offerProduct : opr.findByoId(offerId)) {
				opr.delete(offerProduct);
			}
		}
		return emptyOffer;
	}
	
	public List<OfferProducts> addToOfferProductTable(final int offerProductId, final int offerProductNumber, 
			final String offerProductName,final int offerProductQuantity, final double offerProductCost, 
			final double offerProductSubtotal) {

		OfferProducts offerProduct = new OfferProducts();

		if(offerProductName.equals("") || offerProductName.equals(null)) {
			return null;
		}else {	
			OfferUtils.createOfferProdcut(offerProduct, offerProductId, offerProductNumber, 
				offerProductName, offerProductQuantity, offerProductCost, offerProductSubtotal);
		offerProductsList.add(offerProduct);
		return offerProductsList;
		}
	}
	
	public List<OfferProducts> editOfferProducts(final int offerProductId, final int tempOfferProductId,
			final int offerProductNumber, final String offerProductName, final int offerProductQuantity,
			final double offerProductCost, final double offerProductSubtotal) {
		offerProductsList.stream().filter(offerProduct -> offerProduct.getOfferProductId() == tempOfferProductId)
				.forEach(offerProduct -> {
					OfferUtils.createOfferProdcut(offerProduct, offerProductId, offerProductNumber, 
							offerProductName, offerProductQuantity, offerProductCost, offerProductSubtotal);
				});
		return offerProductsList;
	}
	
	public List<OfferProducts> deleteOfferProducts(final int offerProductId) {

		offerProductsList.stream().filter(offerProduct -> offerProduct.getOfferProductId() == offerProductId)
				.forEach(offerProduct -> {
					deleteThisOfferProduct = offerProduct;
				});
		offerProductsList.remove(deleteThisOfferProduct);
		return offerProductsList;
	}
	
	@Transactional
	public OfferProducts addActiveOfferProduct(final int oId, final int offerProductId, final int offerProductNumber, 
			final String offerProductName, final int offerProductQuantity, final double offerProductCost, 
			final double offerProductSubtotal) {

		OfferProducts offerProduct = new OfferProducts();
		int offerProductMissing = 0;
		int howManyInStock = 0;
		double custPayment = 0;
		
		if(oId == 0 || offerProductId == 0 || offerProductName.equals("") || offerProductName.equals(null)) {
			return null;
		}else {
			
			OfferUtils.createActiveOfferProdcut(offerProduct, oId, offerProductId, offerProductNumber, 
					offerProductName, offerProductQuantity, offerProductCost, offerProductSubtotal);
		
			OfferUtils.setOfferProductMissing(pr.findById(offerProduct.getOfferProductId()).get(), offerProduct, offerProductMissing,
				howManyInStock);
		opr.save(offerProduct);
		
		editOfferCustPayment(opr.findByoId(oId), oId, custPayment);
		return offerProduct;
		}
	}
	
	public OfferProducts editActiveOfferProduct(final int oId, final int offerProductId, final int tempOfferProductId, 
			final int offerProductNumber, final String offerProductName, final int offerProductQuantity, final double offerProductCost, 
			final double offerProductSubtotal) {
		OfferProducts offerProduct = new OfferProducts();
		int offerProductMissing = 0;
		int howManyInStock = 0;
		double custPayment = 0;
		if (oId == 0 || offerProductId == 0 || offerProductName.equals("") || offerProductName.equals(null) || 
				opr.findByoIdAndOfferProductId(oId, tempOfferProductId).isEmpty()) {
			return null;
		} else {
			opr.delete(opr.findByoIdAndOfferProductId(oId, tempOfferProductId).get());
			
			OfferUtils.createActiveOfferProdcut(offerProduct, oId, offerProductId, offerProductNumber, 
					offerProductName, offerProductQuantity, offerProductCost, offerProductSubtotal);

			OfferUtils.setOfferProductMissing(pr.findById(offerProduct.getOfferProductId()).get(), offerProduct, offerProductMissing,
					howManyInStock);		
		}
		opr.save(offerProduct);
		editOfferCustPayment(opr.findByoId(oId), oId, custPayment);
		return offerProduct;
	}
	
	public OfferProducts deleteActiveOfferProducts(final int oId, final int offerProductId) {

		OfferProducts emptyOfferProduct = new OfferProducts();
		double custPayment = 0;

		if (oId == 0 || offerProductId == 0 || 
				opr.findByoIdAndOfferProductId(oId, offerProductId).isEmpty()) {
			return null;
		} else {
			opr.delete(opr.findByoIdAndOfferProductId(oId, offerProductId).get());

			editOfferCustPayment(opr.findByoId(oId), oId, custPayment);

			return emptyOfferProduct;
		}
	}
	
	public List<Offer> sortByOfferIdAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferIdAsc());
	}

	public List<Offer> sortByOfferIdDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferIdDesc());
	}

	public List<Offer> sortByOfferNumberAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferNumberAsc());
	}

	public List<Offer> sortByOfferNumberDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferNumberDesc());
	}

	public List<Offer> sortByOfferCustNameAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferCustNameAsc());
	}

	public List<Offer> sortByOfferCustNameDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferCustNameDesc());
	}

	public List<Offer> sortByOfferCustAddressAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferCustAddressAsc());
	}

	public List<Offer> sortByOfferCustAddressDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferCustAddressDesc());
	}

	public List<Offer> sortByOfferDescriptionAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferDescriptionAsc());
	}

	public List<Offer> sortByOfferDescriptionDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferDescriptionDesc());
	}

	public List<Offer> sortByOfferOriginAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferOriginAsc());
	}

	public List<Offer> sortByOfferOriginDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferOriginDesc());
	}

	public List<Offer> sortByOfferTypeAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferTypeAsc());
	}

	public List<Offer> sortByOfferTypeDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferTypeDesc());
	}

	public List<Offer> sortByOfferRemarksAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferRemarksAsc());
	}

	public List<Offer> sortByOfferRemarksDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferRemarksDesc());
	}
	
	public List<Offer> sortByOfferCustPaymentsAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferCustPaymentAsc());
	}

	public List<Offer> sortByOfferCustPaymentDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferCustPaymentDesc());
	}

	public List<Offer> sortByDateOfOfferAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByDateOfOfferAsc());
	}

	public List<Offer> sortByDateOfOfferDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByDateOfOfferDesc());
	}

	public List<Offer> sortByOfferReceivedAsc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferReceivedAsc());
	}

	public List<Offer> sortByOfferReceivedDesc() {

		return OfferUtils.returnOffersList(or.findByOrderByOfferReceivedDesc());
	}

}
