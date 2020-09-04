package com.shidroogim.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.shidroogim.entities.Offer;

public interface OfferRepository extends CrudRepository<Offer, Integer>{


	List<Offer> findByOfferNumber(Integer offerNumber);
	
	List<Offer> findByOfferStage(String offerStage);

	List<Offer> findByOfferCustNameContainingOrOfferCustAddressContainingOrOfferOriginContainingOrOfferType(
			String offerCustName, String offerCustAddress, String offerOrigin, String offerType);

	List<Offer> findByOrderByOfferIdAsc();
	List<Offer> findByOrderByOfferIdDesc();
	
	List<Offer> findByOrderByOfferNumberAsc();
	List<Offer> findByOrderByOfferNumberDesc();
	
	List<Offer> findByOrderByOfferCustNameAsc();
	List<Offer> findByOrderByOfferCustNameDesc();
	
	List<Offer> findByOrderByOfferCustAddressAsc();
	List<Offer> findByOrderByOfferCustAddressDesc();
	
	List<Offer> findByOrderByOfferDescriptionAsc();
	List<Offer> findByOrderByOfferDescriptionDesc();
	
	List<Offer> findByOrderByOfferOriginAsc();
	List<Offer> findByOrderByOfferOriginDesc();
	
	List<Offer> findByOrderByOfferTypeAsc();
	List<Offer> findByOrderByOfferTypeDesc();
	
	List<Offer> findByOrderByOfferRemarksAsc();
	List<Offer> findByOrderByOfferRemarksDesc();
	
	List<Offer> findByOrderByOfferCustPaymentAsc();
	List<Offer> findByOrderByOfferCustPaymentDesc();
	
	List<Offer> findByOrderByDateOfOfferAsc();
	List<Offer> findByOrderByDateOfOfferDesc();
	
	List<Offer> findByOrderByOfferReceivedAsc();
	List<Offer> findByOrderByOfferReceivedDesc();
}