package com.shidroogim.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.json.JSONObject;

@Entity(name = "products")
public class Product{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private int productId;
	@Column(name = "product_category")
	private String productCat;
	@Column(name = "product_name")
	private String productName;
	@Column(name = "product_manufacturer")
	private String productManuf;
	@Column(name = "product_catalog_num")
	private String productCatalogNum;
	@Column(name = "product_quantity")
	private int productQuan;
	@Column(name = "product_on_sale_quantity")
	private int productOnSaleQuan;
	@Column(name = "product_cost")
	private double productCost;
	@Column(name = "product_on_sale_cost")
	private double productOnSaleCost;
	@Column(name = "product_total_cost")
	private double productTotalCost;
	@Column(name = "product_total_on_sale_cost")
	private double productOnSaleTotalCost;
	@Column(name = "product_combined_total_cost")
	private double productCombinedTotalCost;
	@Column(name = "product_imagefile")
	private String productImgFile;

	@ManyToMany(mappedBy = "jobProducts")
	List<Job> productsUsedInJob = new ArrayList<>();
	
	@ManyToMany(mappedBy = "offerProducts")
	List<Offer> productsUsedInOffer = new ArrayList<>();

	public Product() {
	}

	public Product(int productId, String productCat, String productName, String productManuf, String productCatalogNum,
			int productQuan, int productOnSaleQuan, double productCost, double productOnSaleCost,
			double productTotalCost, double productOnSaleTotalCost, double productCombinedTotalCost,
			String productImgFile, List<Job> productsUsedInJob, List<Offer> productsUsedInOffer) {
		super();
		this.productId = productId;
		this.productCat = productCat;
		this.productName = productName;
		this.productManuf = productManuf;
		this.productCatalogNum = productCatalogNum;
		this.productQuan = productQuan;
		this.productOnSaleQuan = productOnSaleQuan;
		this.productCost = productCost;
		this.productOnSaleCost = productOnSaleCost;
		this.productTotalCost = productTotalCost;
		this.productOnSaleTotalCost = productOnSaleTotalCost;
		this.productCombinedTotalCost = productCombinedTotalCost;
		this.productImgFile = productImgFile;
		this.productsUsedInJob = productsUsedInJob;
		this.productsUsedInOffer = productsUsedInOffer;
	}



	public String getProductCat() {
		return productCat;
	}

	public void setProductCat(String productCat) {
		this.productCat = productCat;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductManuf() {
		return productManuf;
	}

	public void setProductManuf(String productManuf) {
		this.productManuf = productManuf;
	}

	public String getProductCatalogNum() {
		return productCatalogNum;
	}

	public void setProductCatalogNum(String productCatalogNum) {
		this.productCatalogNum = productCatalogNum;
	}

	public int getProductQuan() {
		return productQuan;
	}

	public void setProductQuan(int productQuan) {
		this.productQuan = productQuan;
	}

	public int getProductOnSaleQuan() {
		return productOnSaleQuan;
	}

	public void setProductOnSaleQuan(int productOnSaleQuan) {
		this.productOnSaleQuan = productOnSaleQuan;
	}

	public double getProductCost() {
		return productCost;
	}

	public void setProductCost(double productCost) {
		this.productCost = productCost;
	}

	public double getProductOnSaleCost() {
		return productOnSaleCost;
	}

	public void setProductOnSaleCost(double productOnSaleCost) {
		this.productOnSaleCost = productOnSaleCost;
	}

	public double getProductTotalCost() {
		return productTotalCost;
	}

	public void setProductTotalCost(double productTotalCost) {
		this.productTotalCost = productTotalCost;
	}

	public double getProductOnSaleTotalCost() {
		return productOnSaleTotalCost;
	}

	public void setProductOnSaleTotalCost(double productOnSaleTotalCost) {
		this.productOnSaleTotalCost = productOnSaleTotalCost;
	}

	public double getProductCombinedTotalCost() {
		return productCombinedTotalCost;
	}

	public void setProductCombinedTotalCost(double productCombinedTotalCost) {
		this.productCombinedTotalCost = productCombinedTotalCost;
	}

	public String getProductImgFile() {
		return productImgFile;
	}

	public void setProductImgFile(String productImgFile) {
		this.productImgFile = productImgFile;
	}

	public List<Job> getProductsUsedInJob() {
		return productsUsedInJob;
	}

	public void setProductsUsedInJob(List<Job> productsUsedInJob) {
		this.productsUsedInJob = productsUsedInJob;
	}

	public List<Offer> getProductsUsedInOffer() {
		return productsUsedInOffer;
	}

	public void setProductsUsedInOffer(List<Offer> productsUsedInOffer) {
		this.productsUsedInOffer = productsUsedInOffer;
	}

	public int getProductId() {
		return productId;
	}

	public JSONObject toJSON() {

		JSONObject product = new JSONObject();

		product.put("productId", this.productId);
		product.put("productCat", this.productCat);
		product.put("productName", this.productName);
		product.put("productManuf", this.productManuf);
		product.put("productCatalogNum", this.productCatalogNum);
		product.put("productQuan", this.productQuan);
		product.put("productOnSaleQuan", this.productOnSaleQuan);
		product.put("productCost", this.productCost);
		product.put("productOnSaleCost", this.productOnSaleCost);
		product.put("productTotalCost", this.productTotalCost);
		product.put("productOnSaleTotalCost", this.productOnSaleTotalCost);
		product.put("productCombinedTotalCost", this.productCombinedTotalCost);
		product.put("productImgFile", this.productImgFile);

		return product;
	}

	@Override
	public String toString() {
		return "Product [productId=" + productId + ", productCat=" + productCat + ", productName=" + productName
				+ ", productManuf=" + productManuf + ", productCatalogNum="
				+ productCatalogNum + ", productQuan=" + productQuan + ", productOnSaleQuan=" + productOnSaleQuan
				+ ", productCost=" + productCost + ", productOnSaleCost=" + productOnSaleCost + ", productTotalCost="
				+ productTotalCost + ", productOnSaleTotalCost=" + productOnSaleTotalCost
				+ ", productCombinedTotalCost=" + productCombinedTotalCost + ", productImgFile=" + productImgFile + "]";
	}


}
