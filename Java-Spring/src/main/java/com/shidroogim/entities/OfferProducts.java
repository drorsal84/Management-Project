package com.shidroogim.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import org.json.JSONObject;

@IdClass(OfferProducts.class)
@Entity(name = "offerproducts")
public class OfferProducts implements Serializable{
	
	private static final long serialVersionUID = -8423399107545211981L;

	@Id
	@Column(name = "o_id")
	private int oId;
	@Id
	@Column(name = "offer_product_id")
	private int offerProductId;
	@Column(name = "offer_product_number")
	private int offerProductNumber;
	@Column(name = "offer_product_name")
	private String offerProductName;
	@Column(name = "offer_product_quantity")
	private int offerProductQuantity;
	@Column(name = "offer_product_missing")
	private String offerProductMissing; // The quantity that is missing in stock for the job.
	@Column(name = "offer_product_cost")
	private double offerProductCost;
	@Column(name = "offer_product_subtotal")
	private double offerProductSubtotal;

	public OfferProducts() {

	}

	public OfferProducts(int oId, int offerProductId, int offerProductNumber, String offerProductName,
			int offerProductQuantity, String offerProductMissing, double offerProductCost,
			double offerProductSubtotal) {
		super();
		this.oId = oId;
		this.offerProductId = offerProductId;
		this.offerProductNumber = offerProductNumber;
		this.offerProductName = offerProductName;
		this.offerProductQuantity = offerProductQuantity;
		this.offerProductMissing = offerProductMissing;
		this.offerProductCost = offerProductCost;
		this.offerProductSubtotal = offerProductSubtotal;
	}

	public int getoId() {
		return oId;
	}

	public void setoId(int oId) {
		this.oId = oId;
	}

	public int getOfferProductId() {
		return offerProductId;
	}

	public void setOfferProductId(int offerProductId) {
		this.offerProductId = offerProductId;
	}

	public int getOfferProductNumber() {
		return offerProductNumber;
	}

	public void setOfferProductNumber(int offerProductNumber) {
		this.offerProductNumber = offerProductNumber;
	}

	public String getOfferProductName() {
		return offerProductName;
	}

	public void setOfferProductName(String offerProductName) {
		this.offerProductName = offerProductName;
	}

	public int getOfferProductQuantity() {
		return offerProductQuantity;
	}

	public void setOfferProductQuantity(int offerProductQuantity) {
		this.offerProductQuantity = offerProductQuantity;
	}

	public String getOfferProductMissing() {
		return offerProductMissing;
	}

	public void setOfferProductMissing(String offerProductMissing) {
		this.offerProductMissing = offerProductMissing;
	}

	public double getOfferProductCost() {
		return offerProductCost;
	}

	public void setOfferProductCost(double offerProductCost) {
		this.offerProductCost = offerProductCost;
	}

	public double getOfferProductSubtotal() {
		return offerProductSubtotal;
	}

	public void setOfferProductSubtotal(double offerProductSubtotal) {
		this.offerProductSubtotal = offerProductSubtotal;
	}
	
	public JSONObject toJSON() {
		JSONObject offerProducts = new JSONObject();

		offerProducts.put("oId", this.oId);
		offerProducts.put("offerProductId", this.offerProductId);
		offerProducts.put("offerProductNumber", this.offerProductNumber);
		offerProducts.put("offerProductName", this.offerProductName);
		offerProducts.put("offerProductQuantity", this.offerProductQuantity);
		offerProducts.put("offerProductMissing", this.offerProductMissing);
		offerProducts.put("offerProductCost", this.offerProductCost);
		offerProducts.put("offerProductSubtotal", this.offerProductSubtotal);

		return offerProducts;
	}

	@Override
	public String toString() {
		return "OfferProducts [oId=" + oId + ", offerProductId=" + offerProductId + ", offerProductNumber="
				+ offerProductNumber + ", offerProductName=" + offerProductName + ", offerProductQuantity="
				+ offerProductQuantity + ", offerProductMissing=" + offerProductMissing + ", offerProductCost="
				+ offerProductCost + ", offerProductSubtotal=" + offerProductSubtotal + "]";
	}

}
