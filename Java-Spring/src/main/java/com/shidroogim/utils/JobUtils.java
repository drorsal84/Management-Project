package com.shidroogim.utils;

import java.util.List;

import org.json.JSONArray;

import com.shidroogim.entities.Job;
import com.shidroogim.entities.JobProducts;
import com.shidroogim.repositories.ProductRepository;

public interface JobUtils {
	
	public static final ProductRepository pr = null;
	

	static List<Job> returnJobsList(List<Job> productList) {
		if (productList.isEmpty()) {
			return null;
		} else {
			return productList;
		}
	}
	
	static List<JobProducts> returnJobProductsList(List<JobProducts> jobProductsList) {
		if (jobProductsList.isEmpty()) {
			return null;
		} else {
			return jobProductsList;
		}
	}
	
	static String sendJobsJsonList(List<Job> jobsList) {
		JSONArray jobs = new JSONArray();
		for (Job job : jobsList) {
			jobs.put(job.toJSON());
		}
		return jobs.toString();
	}
	
	static String sendJobProductsJsonList(List<JobProducts> jobProductList) {
		JSONArray jobProducts = new JSONArray();
		for (JobProducts jobProduct : jobProductList) {
			jobProducts.put(jobProduct.toJSON());
		}
		return jobProducts.toString();
	}
		
	static void createJobProdcut(JobProducts jobProduct, final int jId, final int jobProductId, final int jobProductNumber, 
			final String jobProductName, final int jobProductQuantity, final double jobProductCost, final double jobProductSubtotal) {
		jobProduct.setjId(jId);
		jobProduct.setJobProductId(jobProductId);
		jobProduct.setJobProductNumber(jobProductNumber);
		jobProduct.setJobProductName(jobProductName);
		jobProduct.setJobProductQuantity(jobProductQuantity);
		jobProduct.setJobProductCost(jobProductCost);
		jobProduct.setJobProductSubtotal(jobProductSubtotal);
		jobProduct.setJobProductInst("המוצר טרם הותקן");
	}
}