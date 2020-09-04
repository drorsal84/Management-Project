package com.shidroogim.components;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.shidroogim.entities.Job;
import com.shidroogim.entities.JobProducts;
import com.shidroogim.entities.Offer;
import com.shidroogim.entities.OfferProducts;
import com.shidroogim.enums.WorkStage;
import com.shidroogim.repositories.JobProductsRepository;
import com.shidroogim.repositories.JobRepository;
import com.shidroogim.repositories.OfferProductsRepository;
import com.shidroogim.repositories.OfferRepository;
import com.shidroogim.repositories.ProductRepository;

@Service
public class WorkService {

	private final ProductRepository pr;
	private final JobRepository jr;
	private final OfferRepository or;
	private final OfferProductsRepository opr;
	private final JobProductsRepository jpr;

	public WorkService(@Autowired ApplicationContext context) {
		pr = context.getBean(ProductRepository.class);
		jr = context.getBean(JobRepository.class);
		or = context.getBean(OfferRepository.class);
		opr = context.getBean(OfferProductsRepository.class);
		jpr = context.getBean(JobProductsRepository.class);
	}

	// Function for populating the offer tables in the various offer components.
	public List<Offer> offerListSwitcher(final String offerStage) {

		if (offerStage.equals("") || offerStage.equals(null)) {
			return null;
		} else {
			// Gets the list for the active offer component.
			if (offerStage.equals(WorkStage.AO.getWorkStageName())) {
				return or.findByOfferStage(WorkStage.AO.getWorkStageName());
				// Gets the list for the offer history component.
			} else if (offerStage.equals(WorkStage.OH.getWorkStageName())) {
				return or.findByOfferStage(WorkStage.OH.getWorkStageName());
			}
		}
		return null;
	}

	// Function for populating the job tables in the various job components.
	public List<Job> jobListSwitcher(final String jobStage) {

		if (jobStage.equals("") || jobStage.equals(null)) {
			return null;
		} else {
			// Gets the list for the active job component.
			if (jobStage.equals(WorkStage.AJ.getWorkStageName())) {
				return jr.findByJobStage(WorkStage.AJ.getWorkStageName());
			} // Gets the list for the job history component.
			else if (jobStage.equals(WorkStage.JH.getWorkStageName())) {
				return jr.findByJobStage(WorkStage.JH.getWorkStageName());
			}
		}
		return null;
	}

	// Function to switch offer between offer lists, takes the previous offerStage &
	// current offerStage, and sets the offerStage of the offer accordingly.
	public Offer offerStageSwitcher(final int offerId, final String prevOfferStage, final String currOfferStage) {
		if (or.findById(offerId).isEmpty() || offerId == 0 || prevOfferStage.equals("") || prevOfferStage.equals(null)
				|| currOfferStage.equals("") || currOfferStage.equals(null)) {
			return null;
		} else {
			// From active offer to offer history.
			if (prevOfferStage.equals(WorkStage.AO.getWorkStageName())
					&& currOfferStage.equals(WorkStage.OH.getWorkStageName())) {
				or.findById(offerId).get().setOfferStage(WorkStage.OH.getWorkStageName());
				or.save(or.findById(offerId).get());
				return or.findById(offerId).get();
			} else if (prevOfferStage.equals(WorkStage.OH.getWorkStageName())
					&& currOfferStage.equals(WorkStage.AO.getWorkStageName())) {
				// From offer history to active offer
				or.findById(offerId).get().setOfferStage(WorkStage.AO.getWorkStageName());
				or.save(or.findById(offerId).get());
				return or.findById(offerId).get();
			}
		}
		return null;
	}
	
	@Transactional
	public Job createNewJob(final int offerId, final double laborCost, LocalDate dateOfInstall) {
		Job job = new Job();
		JobProducts jobProduct = new JobProducts();
		double matCost = 0;
		double jobProfit = 0;
		double jobProfitPerc = 0;
		int missing = 0;
		int howManyInStock = 0;

		if (or.findById(offerId).isEmpty() || offerId == 0) {
			return null;
		} else {
			job.setJobNumber(or.findById(offerId).get().getOfferNumber());
			job.setCustName(or.findById(offerId).get().getOfferCustName());
			job.setCustAddress(or.findById(offerId).get().getOfferCustAddress());
			job.setJobDescription(or.findById(offerId).get().getOfferDescription());
			job.setJobOrigin(or.findById(offerId).get().getOfferOrigin());
			job.setJobType(or.findById(offerId).get().getOfferType());
			job.setJobRemarks(or.findById(offerId).get().getOfferRemarks());
			job.setJobDateOfOffer(or.findById(offerId).get().getDateOfOffer());
			
			Date sqlDateOfInstall = Date.valueOf(dateOfInstall);
			job.setDateOfInstall(sqlDateOfInstall);
			
			job.setJobStage(WorkStage.AJ.getWorkStageName()); // set jobStage to active job.
			or.findById(offerId).get().setOfferStage(WorkStage.OH.getWorkStageName()); // set offerStage to offer history.
			
			// Calculate matCost.
			for (OfferProducts offerProduct : opr.findByoId(offerId)) {
				matCost += pr.findById(offerProduct.getOfferProductId()).get().getProductCost() * offerProduct.getOfferProductQuantity();
			}
			job.setMatCost(matCost);
			job.setLaborCost(laborCost);
			job.setCustPayment(or.findById(offerId).get().getOfferCustPayment());

			jobProfit = job.getCustPayment() - laborCost - matCost;
			jobProfitPerc = jobProfit / job.getCustPayment() * 100;
			job.setProfit(jobProfit);
			job.setProfitPerc(jobProfitPerc);
			jr.save(job);
			
			// Setting the jobProducts fields
			for (OfferProducts offerProduct : opr.findByoId(offerId)) {
				// Counter is equal to the offerProduct quantity and reduced by one each iteration.
				for (int i = offerProduct.getOfferProductQuantity(); i > 0; i--) {
					// If the products sale quantity is bigger than 0, reduce by 1 and set new sale quan and jobProduct missing. 
					if (pr.findById(offerProduct.getOfferProductId()).get().getProductOnSaleQuan() > 0) {
						pr.findById(offerProduct.getOfferProductId()).get().setProductOnSaleQuan(
								pr.findById(offerProduct.getOfferProductId()).get().getProductOnSaleQuan() - 1);
						pr.save(pr.findById(offerProduct.getOfferProductId()).get());
						howManyInStock = pr.findById(offerProduct.getOfferProductId()).get().getProductOnSaleQuan() + 
								pr.findById(offerProduct.getOfferProductId()).get().getProductQuan();
						jobProduct.setJobProductMissing(" ישנם עוד " + howManyInStock + " מוצרים  במלאי ");
						// If the products reg quantity is bigger than 0, reduce by 1 and set new reg quan and jobProduct missing. 
					} else if (pr.findById(offerProduct.getOfferProductId()).get().getProductQuan() > 0) {
						pr.findById(offerProduct.getOfferProductId()).get().setProductQuan(
								pr.findById(offerProduct.getOfferProductId()).get().getProductQuan() - 1);
						pr.save(pr.findById(offerProduct.getOfferProductId()).get());
						howManyInStock = pr.findById(offerProduct.getOfferProductId()).get().getProductQuan();
						jobProduct.setJobProductMissing(" ישנם עוד " + howManyInStock + " מוצרים  במלאי ");
						// If the products reg quantity is smaller or equals than 0, reduce by one 
						// (becomes negative) and set new reg quan and jobProduct missing.
					} else if(pr.findById(offerProduct.getOfferProductId()).get().getProductQuan() <= 0 ){
						pr.findById(offerProduct.getOfferProductId()).get().setProductQuan(
								pr.findById(offerProduct.getOfferProductId()).get().getProductQuan() - 1);
						pr.save(pr.findById(offerProduct.getOfferProductId()).get());	
						missing = pr.findById(offerProduct.getOfferProductId()).get().getProductQuan(); 
						missing = missing * -1;
						jobProduct.setJobProductMissing(" חסרים " + missing + " מוצרים  במלאי ");
					}
				}
				// Set the the other jobProduct fields.
				jobProduct.setjId(job.getJobId());
				jobProduct.setJobProductId(offerProduct.getOfferProductId());
				jobProduct.setJobProductNumber(offerProduct.getOfferProductNumber());
				jobProduct.setJobProductName(offerProduct.getOfferProductName());
				jobProduct.setJobProductQuantity(offerProduct.getOfferProductQuantity());
				jobProduct.setJobProductCost(offerProduct.getOfferProductCost());
				jobProduct.setJobProductSubtotal(offerProduct.getOfferProductSubtotal());
				jobProduct.setJobProductInst("המוצר טרם הותקן");
				jpr.save(jobProduct);
			}
			return job;
		}	
	}
}