package com.shidroogim.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import org.json.JSONObject;

@IdClass(JobProducts.class)
@Entity(name = "jobproducts")
public class JobProducts implements Serializable {

	private static final long serialVersionUID = -8423399107545211981L;

	@Id
	@Column(name = "j_id")
	private int jId;
	@Id
	@Column(name = "job_product_id")
	private int jobProductId;
	@Column(name = "job_product_number")
	private int jobProductNumber;
	@Column(name = "job_product_name")
	private String jobProductName;
	@Column(name = "job_product_quantity")
	private int jobProductQuantity;
	@Column(name = "job_product_missing")
	private String jobProductMissing; // The quantity that is missing in stock for the job.
	@Column(name = "job_product_cost")
	private double jobProductCost;
	@Column(name = "job_product_subtotal")
	private double jobProductSubtotal;
	@Column(name = "job_product_inst")
	private String jobProductInst; // Was the product installed or not?

	public JobProducts() {

	}

	public JobProducts(int jId, int jobProductId, int jobProductNumber, String jobProductName, int jobProductQuantity,
			String jobProductMissing, double jobProductCost, double jobProductSubtotal, String jobProductInst) {
		super();
		this.jId = jId;
		this.jobProductId = jobProductId;
		this.jobProductNumber = jobProductNumber;
		this.jobProductName = jobProductName;
		this.jobProductQuantity = jobProductQuantity;
		this.jobProductMissing = jobProductMissing;
		this.jobProductCost = jobProductCost;
		this.jobProductSubtotal = jobProductSubtotal;
		this.jobProductInst = jobProductInst;
	}



	public int getjId() {
		return jId;
	}

	public void setjId(int jId) {
		this.jId = jId;
	}

	public int getJobProductId() {
		return jobProductId;
	}

	public void setJobProductId(int jobProductId) {
		this.jobProductId = jobProductId;
	}

	public int getJobProductNumber() {
		return jobProductNumber;
	}

	public void setJobProductNumber(int jobProductNumber) {
		this.jobProductNumber = jobProductNumber;
	}

	public String getJobProductName() {
		return jobProductName;
	}

	public void setJobProductName(String jobProductName) {
		this.jobProductName = jobProductName;
	}

	public int getJobProductQuantity() {
		return jobProductQuantity;
	}

	public void setJobProductQuantity(int jobProductQuantity) {
		this.jobProductQuantity = jobProductQuantity;
	}

	public String getJobProductMissing() {
		return jobProductMissing;
	}

	public void setJobProductMissing(String jobProductMissing) {
		this.jobProductMissing = jobProductMissing;
	}

	public double getJobProductCost() {
		return jobProductCost;
	}

	public void setJobProductCost(double jobProductCost) {
		this.jobProductCost = jobProductCost;
	}

	public double getJobProductSubtotal() {
		return jobProductSubtotal;
	}

	public void setJobProductSubtotal(double jobProductSubtotal) {
		this.jobProductSubtotal = jobProductSubtotal;
	}

	public String getJobProductInst() {
		return jobProductInst;
	}

	public void setJobProductInst(String jobProductInst) {
		this.jobProductInst = jobProductInst;
	}

	public JSONObject toJSON() {
		JSONObject jobProducts = new JSONObject();

		jobProducts.put("jId", this.jId);
		jobProducts.put("jobProductId", this.jobProductId);
		jobProducts.put("jobProductNumber", this.jobProductNumber);
		jobProducts.put("jobProductName", this.jobProductName);
		jobProducts.put("jobProductQuantity", this.jobProductQuantity);
		jobProducts.put("jobProductMissing", this.jobProductMissing);
		jobProducts.put("jobProductCost", this.jobProductCost);
		jobProducts.put("jobProductSubtotal", this.jobProductSubtotal);
		jobProducts.put("jobProductInst", this.jobProductInst);

		return jobProducts;
	}

	@Override
	public String toString() {
		return "JobProducts [jId=" + jId + ", jobProductId=" + jobProductId + ", jobProductNumber=" + jobProductNumber
				+ ", jobProductName=" + jobProductName + ", jobProductQuantity=" + jobProductQuantity
				+ ", jobProductMissing=" + jobProductMissing + ", jobProductCost=" + jobProductCost
				+ ", jobProductSubtotal=" + jobProductSubtotal + ", jobProductInst=" + jobProductInst + "]";
	}
}
