package com.shidroogim.entities;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.json.JSONArray;
import org.json.JSONObject;

@Entity(name = "offers")
public class Offer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "offer_id")
	private int offerId;
	@Column(name = "offer_number")
	private int offerNumber;
	@Column(name = "offer_cust_name")
	private String offerCustName;
	@Column(name = "offer_cust_address")
	private String offerCustAddress;
	@Column(name = "offer_desc")
	private String offerDescription;
	@Column(name = "offer_origin")
	private String offerOrigin;
	@Column(name = "offer_type")
	private String offerType;
	@Column(name = "offer_remarks")
	private String offerRemarks;
	@Column(name = "offer_cust_payment")
	private double offerCustPayment;
	@Column(name = "date_of_offer")
	private Date dateOfOffer;
	@Column(name = "offer_stage")
	private String offerStage;
	@Column(name = "offer_received")
	private String offerReceived; //Did the customer respond to the offer that was sent to him or didn't he?

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "offerproducts", joinColumns = @JoinColumn(name = "o_id", referencedColumnName = "offer_id"), 
	inverseJoinColumns = @JoinColumn(name = "offer_product_id", referencedColumnName = "product_id"))
	List<Product> offerProducts = new ArrayList<>();
	
	public Offer(){
		
	}

	public Offer(int offerId, int offerNumber, String offerCustName, String offerCustAddress, String offerDescription,
			String offerOrigin, String offerType, String offerRemarks, double offerCustPayment, Date dateOfOffer,
			String offerStage, String offerReceived, List<Product> offerProducts) {
		super();
		this.offerId = offerId;
		this.offerNumber = offerNumber;
		this.offerCustName = offerCustName;
		this.offerCustAddress = offerCustAddress;
		this.offerDescription = offerDescription;
		this.offerOrigin = offerOrigin;
		this.offerType = offerType;
		this.offerRemarks = offerRemarks;
		this.offerCustPayment = offerCustPayment;
		this.dateOfOffer = dateOfOffer;
		this.offerStage = offerStage;
		this.offerReceived = offerReceived;
		this.offerProducts = offerProducts;
	}

	public int getOfferNumber() {
		return offerNumber;
	}

	public void setOfferNumber(int offerNumber) {
		this.offerNumber = offerNumber;
	}

	public String getOfferCustName() {
		return offerCustName;
	}

	public void setOfferCustName(String offerCustName) {
		this.offerCustName = offerCustName;
	}

	public String getOfferCustAddress() {
		return offerCustAddress;
	}

	public void setOfferCustAddress(String offerCustAddress) {
		this.offerCustAddress = offerCustAddress;
	}

	public String getOfferDescription() {
		return offerDescription;
	}

	public void setOfferDescription(String offerDescription) {
		this.offerDescription = offerDescription;
	}

	public String getOfferOrigin() {
		return offerOrigin;
	}

	public void setOfferOrigin(String offerOrigin) {
		this.offerOrigin = offerOrigin;
	}

	public String getOfferType() {
		return offerType;
	}

	public void setOfferType(String offerType) {
		this.offerType = offerType;
	}

	public String getOfferRemarks() {
		return offerRemarks;
	}

	public void setOfferRemarks(String offerRemarks) {
		this.offerRemarks = offerRemarks;
	}

	public double getOfferCustPayment() {
		return offerCustPayment;
	}

	public void setOfferCustPayment(double offerCustPayment) {
		this.offerCustPayment = offerCustPayment;
	}

	public Date getDateOfOffer() {
		return dateOfOffer;
	}

	public void setDateOfOffer(Date dateOfOffer) {
		this.dateOfOffer = dateOfOffer;
	}

	public String getOfferStage() {
		return offerStage;
	}

	public void setOfferStage(String offerStage) {
		this.offerStage = offerStage;
	}

	public String getOfferReceived() {
		return offerReceived;
	}

	public void setOfferReceived(String offerReceived) {
		this.offerReceived = offerReceived;
	}

	public List<Product> getOfferProducts() {
		return offerProducts;
	}

	public void setOfferProducts(List<Product> offerProducts) {
		this.offerProducts = offerProducts;
	}

	public int getOfferId() {
		return offerId;
	}
	
	public JSONObject toJSON() {

		JSONObject offer = new JSONObject();
		JSONArray jsonOfferProducts = new JSONArray();

		offer.put("offerId", this.offerId);
		offer.put("offerNumber", this.offerNumber);
		offer.put("offerCustName", this.offerCustName);
		offer.put("offerCustAddress", this.offerCustAddress);
		offer.put("offerDescription", this.offerDescription);
		offer.put("offerOrigin", this.offerOrigin);
		offer.put("offerType", this.offerType);
		offer.put("offerRemarks", this.offerRemarks);
		offer.put("offerCustPayment", this.offerCustPayment);
		offer.put("dateOfOffer", this.dateOfOffer);
		offer.put("offerStage", this.offerStage);
		offer.put("offerReceived", this.offerReceived);

		for (Product product : this.getOfferProducts()) {
			
			jsonOfferProducts.put(product);
		}
		offer.put("jsonOfferProducts", jsonOfferProducts);

		return offer;

	}

	@Override
	public String toString() {
		return "Offer [offerId=" + offerId + ", offerNumber=" + offerNumber + ", offerCustName=" + offerCustName + ", offerCustAddress="
				+ offerCustAddress + ", offerDescription=" + offerDescription + ", offerOrigin=" + offerOrigin
				+ ", offerType=" + offerType + ", offerRemarks=" + offerRemarks + ", offerCustPayment=" + offerCustPayment
				+ ", dateOfOffer=" + dateOfOffer + ", offerStage=" + offerStage + ", offerReceived=" + offerReceived
				+ ", offerProducts=" + offerProducts + "]";
	}

}
