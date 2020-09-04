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

@Entity(name = "jobs")
public class Job{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "job_id")
	private int jobId;
	@Column(name = "job_number")
	private int jobNumber;
	@Column(name = "cust_name")
	private String custName;
	@Column(name = "cust_address")
	private String custAddress;
	@Column(name = "job_desc")
	private String jobDescription;
	@Column(name = "job_origin")
	private String jobOrigin;
	@Column(name = "job_type")
	private String jobType;
	@Column(name = "job_remarks")
	private String jobRemarks;
	@Column(name = "mat_cost")
	private double matCost;
	@Column(name = "labor_cost")
	private double laborCost;
	@Column(name = "cust_payment")
	private double custPayment;
	@Column(name = "profit")
	private double profit;
	@Column(name = "profit_perc")
	private double profitPerc;
	@Column(name = "job_date_of_offer")
	private Date jobDateOfOffer;
	@Column(name = "date_of_install")
	private Date dateOfInstall;
	@Column(name = "date_of_compleat")
	private Date dateOfCompleat;
	@Column(name = "job_stage")
	private String jobStage;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "jobproducts", joinColumns = @JoinColumn(name = "j_id", referencedColumnName = "job_id"), 
	inverseJoinColumns = @JoinColumn(name = "job_product_id", referencedColumnName = "product_id"))
	List<Product> jobProducts = new ArrayList<>();

	public Job() {
	}
	
	public Job(int jobId, int jobNumber, String custName, String custAddress, String jobDescription, String jobOrigin,
			String jobType, String jobRemarks, double matCost, double laborCost, double custPayment, double profit,
			double profitPerc, Date jobDateOfOffer, Date dateOfInstall, Date dateOfCompleat, String jobStage, 
			List<Product> jobProducts) {
		super();
		this.jobId = jobId;
		this.jobNumber = jobNumber;
		this.custName = custName;
		this.custAddress = custAddress;
		this.jobDescription = jobDescription;
		this.jobOrigin = jobOrigin;
		this.jobType = jobType;
		this.jobRemarks = jobRemarks;
		this.matCost = matCost;
		this.laborCost = laborCost;
		this.custPayment = custPayment;
		this.profit = profit;
		this.profitPerc = profitPerc;
		this.jobDateOfOffer = jobDateOfOffer;
		this.dateOfInstall = dateOfInstall;
		this.dateOfCompleat = dateOfCompleat;
		this.jobStage = jobStage;
		this.jobProducts = jobProducts;
	}

	public int getJobNumber() {
		return jobNumber;
	}

	public void setJobNumber(int jobNumber) {
		this.jobNumber = jobNumber;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustAddress() {
		return custAddress;
	}

	public void setCustAddress(String custAddress) {
		this.custAddress = custAddress;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	public String getJobOrigin() {
		return jobOrigin;
	}

	public void setJobOrigin(String jobOrigin) {
		this.jobOrigin = jobOrigin;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getJobRemarks() {
		return jobRemarks;
	}

	public void setJobRemarks(String jobRemarks) {
		this.jobRemarks = jobRemarks;
	}

	public double getMatCost() {
		return matCost;
	}

	public void setMatCost(double matCost) {
		this.matCost = matCost;
	}

	public double getLaborCost() {
		return laborCost;
	}

	public void setLaborCost(double laborCost) {
		this.laborCost = laborCost;
	}

	public double getCustPayment() {
		return custPayment;
	}

	public void setCustPayment(double custPayment) {
		this.custPayment = custPayment;
	}

	public double getProfit() {
		return profit;
	}

	public void setProfit(double profit) {
		this.profit = profit;
	}

	public double getProfitPerc() {
		return profitPerc;
	}

	public void setProfitPerc(double profitPerc) {
		this.profitPerc = profitPerc;
	}

	public Date getJobDateOfOffer() {
		return jobDateOfOffer;
	}

	public void setJobDateOfOffer(Date jobDateOfOffer) {
		this.jobDateOfOffer = jobDateOfOffer;
	}

	public Date getDateOfInstall() {
		return dateOfInstall;
	}

	public void setDateOfInstall(Date dateOfInstall) {
		this.dateOfInstall = dateOfInstall;
	}

	public Date getDateOfCompleat() {
		return dateOfCompleat;
	}

	public void setDateOfCompleat(Date dateOfCompleat) {
		this.dateOfCompleat = dateOfCompleat;
	}

	public String getJobStage() {
		return jobStage;
	}

	public void setJobStage(String jobStage) {
		this.jobStage = jobStage;
	}

	public List<Product> getJobProducts() {
		return jobProducts;
	}

	public void setJobProducts(List<Product> jobProducts) {
		this.jobProducts = jobProducts;
	}

	public int getJobId() {
		return jobId;
	}

	public JSONObject toJSON() {

		JSONObject job = new JSONObject();
		JSONArray jsonJobProducts = new JSONArray();

		job.put("jobId", this.jobId);
		job.put("jobNumber", this.jobNumber);
		job.put("custName", this.custName);
		job.put("custAddress", this.custAddress);
		job.put("jobDescription", this.jobDescription);
		job.put("jobOrigin", this.jobOrigin);
		job.put("jobType", this.jobType);
		job.put("jobRemarks", this.jobRemarks);
		job.put("matCost", this.matCost);
		job.put("laborCost", this.laborCost);
		job.put("custPayment", this.custPayment);
		job.put("profit", this.profit);
		job.put("profitPerc", this.profitPerc);
		job.put("jobDateOfOffer", this.jobDateOfOffer);
		job.put("dateOfInstall", this.dateOfInstall);
		job.put("dateOfCompleat", this.dateOfCompleat);
		job.put("jobStage", this.jobStage);

		for (Product product : this.getJobProducts()) {
			
			jsonJobProducts.put(product);
		}
		job.put("jsonJobProducts", jsonJobProducts);

		return job;

	}

	@Override
	public String toString() {
		return "Job [jobId=" + jobId + ", jobNumber=" + jobNumber + ", custName=" + custName
				+ ", custAddress=" + custAddress + ", jobDescription=" + jobDescription + ", jobOrigin=" + jobOrigin
				+ ", jobType=" + jobType + ", jobRemarks=" + jobRemarks + ", matCost=" + matCost + ", laborCost="
				+ laborCost + ", custPayment=" + custPayment + ", profit=" + profit + ", profitPerc=" + profitPerc
				+ ", jobDateOfOffer=" + jobDateOfOffer + ", dateOfInstall=" + dateOfInstall + ", dateOfCompleat="
				+ dateOfCompleat + ", jobStage=" + jobStage + ", jobProducts="
				+ jobProducts + "]";
	}
}
