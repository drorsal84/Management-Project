package com.shidroogim.components;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.shidroogim.entities.Job;
import com.shidroogim.entities.JobProducts;
import com.shidroogim.repositories.JobProductsRepository;
import com.shidroogim.repositories.JobRepository;
import com.shidroogim.repositories.ProductRepository;
import com.shidroogim.utils.JobUtils;
import com.shidroogim.enums.WorkStage;

@Component
public class JobFacade {

	private final JobRepository jr;
	private final JobProductsRepository jpr;
	private final ProductRepository pr;

	public JobFacade(@Autowired ApplicationContext context) {
		jpr = context.getBean(JobProductsRepository.class);
		jr = context.getBean(JobRepository.class);
		pr = context.getBean(ProductRepository.class);
	}

	public List<Job> searchJobs(final String searchInput) {

		int jobNumber = 0;
		List<Job> jobSearchResults = new ArrayList<>();
		String[] numbers = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };

		for (int i = 0; i < numbers.length; i++) {
			if (searchInput.contains(numbers[i])) {
				jobNumber = Integer.parseInt(searchInput);
			}
		}
		String custName = searchInput;
		String custAddress = searchInput;
		String jobOrigin = searchInput;
		String jobType = searchInput;

		if (searchInput.equals("") || searchInput.equals(null)) {
			return null;
		} else {
			jobSearchResults.addAll(jr.findByCustNameContainingOrCustAddressContainingOrJobOriginContainingOrJobType(
					custName, custAddress, jobOrigin, jobType));
			jobSearchResults.addAll(jr.findByJobNumber(jobNumber));
			return JobUtils.returnJobsList(jobSearchResults);
		}
	}

	public List<JobProducts> getActiveJobJobProductsList(final int jId) {

		if (jId == 0) {
			return null;
		} else {
			return JobUtils.returnJobProductsList(jpr.findByjId(jId));
		}
	}

	@Transactional
	public void setJobProductMissing(JobProducts jobProduct, int missing, int howManyInStock) {

		for (int i = jobProduct.getJobProductQuantity(); i > 0; i--) {
			// If the products sale quantity is bigger than 0, reduce by 1 and set new sale
			// quan and jobProduct missing.
			if (pr.findById(jobProduct.getJobProductId()).get().getProductOnSaleQuan() > 0) {
				pr.findById(jobProduct.getJobProductId()).get().setProductOnSaleQuan(
						pr.findById(jobProduct.getJobProductId()).get().getProductOnSaleQuan() - 1);
				pr.save(pr.findById(jobProduct.getJobProductId()).get());
				howManyInStock = pr.findById(jobProduct.getJobProductId()).get().getProductOnSaleQuan()
						+ pr.findById(jobProduct.getJobProductId()).get().getProductQuan();
				jobProduct.setJobProductMissing(" ישנם עוד " + howManyInStock + " מוצרים  במלאי ");
				// If the products reg quantity is bigger than 0, reduce by 1 and set new reg
				// quan and jobProduct missing.
			} else if (pr.findById(jobProduct.getJobProductId()).get().getProductQuan() > 0) {
				pr.findById(jobProduct.getJobProductId()).get()
						.setProductQuan(pr.findById(jobProduct.getJobProductId()).get().getProductQuan() - 1);
				pr.save(pr.findById(jobProduct.getJobProductId()).get());
				howManyInStock = pr.findById(jobProduct.getJobProductId()).get().getProductQuan();
				jobProduct.setJobProductMissing(" ישנם עוד " + howManyInStock + " מוצרים  במלאי ");
				// If the products reg quantity is smaller or equals than 0, reduce by one
				// (becomes negative) and set new reg quan and jobProduct missing.
			} else if (pr.findById(jobProduct.getJobProductId()).get().getProductQuan() <= 0) {
				pr.findById(jobProduct.getJobProductId()).get()
						.setProductQuan(pr.findById(jobProduct.getJobProductId()).get().getProductQuan() - 1);
				pr.save(pr.findById(jobProduct.getJobProductId()).get());
				missing = pr.findById(jobProduct.getJobProductId()).get().getProductQuan();
				missing = missing * -1;
				jobProduct.setJobProductMissing(" חסרים " + missing + " מוצרים  במלאי ");
			}
		}
	}

	@Transactional
	public void setJobProductMissingForEdit(JobProducts jobProduct, int prevJobProductQuantity, int missing,
			int howManyInStock) {

		// Add to product quantity before reducing new quantity.
		pr.findById(jobProduct.getJobProductId()).get().setProductQuan(
				pr.findById(jobProduct.getJobProductId()).get().getProductQuan() + prevJobProductQuantity);
		pr.save(pr.findById(jobProduct.getJobProductId()).get());

		for (int i = jobProduct.getJobProductQuantity(); i > 0; i--) {
			// If the products sale quantity is bigger than 0, reduce by 1 and set new sale
			// quantity and jobProduct missing.
			if (pr.findById(jobProduct.getJobProductId()).get().getProductOnSaleQuan() > 0) {
				pr.findById(jobProduct.getJobProductId()).get().setProductOnSaleQuan(
						pr.findById(jobProduct.getJobProductId()).get().getProductOnSaleQuan() - 1);
				pr.save(pr.findById(jobProduct.getJobProductId()).get());
				howManyInStock = pr.findById(jobProduct.getJobProductId()).get().getProductOnSaleQuan()
						+ pr.findById(jobProduct.getJobProductId()).get().getProductQuan();
				jobProduct.setJobProductMissing(" ישנם עוד " + howManyInStock + " מוצרים  במלאי ");
				// If the products regular quantity is bigger than 0, reduce by 1 and set new
				// regular
				// quantity and jobProduct missing.
			} else if (pr.findById(jobProduct.getJobProductId()).get().getProductQuan() > 0) {
				pr.findById(jobProduct.getJobProductId()).get()
						.setProductQuan(pr.findById(jobProduct.getJobProductId()).get().getProductQuan() - 1);
				pr.save(pr.findById(jobProduct.getJobProductId()).get());
				howManyInStock = pr.findById(jobProduct.getJobProductId()).get().getProductQuan();
				jobProduct.setJobProductMissing(" ישנם עוד " + howManyInStock + " מוצרים  במלאי ");
				// If the products regular quantity is smaller or equals than 0, reduce by one
				// (becomes negative) and set new regular quantity and jobProduct missing.
			} else if (pr.findById(jobProduct.getJobProductId()).get().getProductQuan() <= 0) {
				pr.findById(jobProduct.getJobProductId()).get()
						.setProductQuan(pr.findById(jobProduct.getJobProductId()).get().getProductQuan() - 1);
				pr.save(pr.findById(jobProduct.getJobProductId()).get());
				missing = pr.findById(jobProduct.getJobProductId()).get().getProductQuan();
				missing = missing * -1;
				jobProduct.setJobProductMissing(" חסרים " + missing + " מוצרים  במלאי ");
			}
		}
	}

	public void editJobFinance(List<JobProducts> jobProductsList, final int jobId, double laborCost) {

		double matCost = 0;
		double custPayment = 0;
		double jobProfit = 0;
		double jobProfitPerc = 0;

		for (JobProducts jobProductCustPayment : jobProductsList) {
			custPayment += jobProductCustPayment.getJobProductSubtotal();
		}

		for (JobProducts jobProductMatCost : jobProductsList) {
			matCost += pr.findById(jobProductMatCost.getJobProductId()).get().getProductCost()
					* jobProductMatCost.getJobProductQuantity();
		}
		jobProfit = custPayment - laborCost - matCost;
		jobProfitPerc = jobProfit / custPayment * 100;

		jr.findById(jobId).get().setCustPayment(custPayment);
		jr.findById(jobId).get().setMatCost(matCost);
		jr.findById(jobId).get().setProfit(jobProfit);
		jr.findById(jobId).get().setProfitPerc(jobProfitPerc);
		jr.save(jr.findById(jobId).get());
	}

	public Job setJobDateOfCompleat(final int jobId, LocalDate dateOfCompleat) {

		if (jobId == 0 || jr.findById(jobId).isEmpty()) {
			return null;
		} else {

			if (jr.findById(jobId).get().getJobStage().equals(WorkStage.AJ.getWorkStageName())) {
				Date sqlDateOfCompleat = Date.valueOf(dateOfCompleat);
				jr.findById(jobId).get().setDateOfCompleat(sqlDateOfCompleat);
				jr.findById(jobId).get().setJobStage(WorkStage.JH.getWorkStageName());
				jr.save(jr.findById(jobId).get());
			} else if (dateOfCompleat.isEqual(LocalDate.of(1970, 01, 01))) {
				jr.findById(jobId).get().setDateOfCompleat(null);
				jr.findById(jobId).get().setJobStage(WorkStage.AJ.getWorkStageName());
				jr.save(jr.findById(jobId).get());
			} else if (jr.findById(jobId).get().getJobStage().equals(WorkStage.JH.getWorkStageName())
					&& dateOfCompleat != null) {
				Date sqlDateOfCompleat = Date.valueOf(dateOfCompleat);
				jr.findById(jobId).get().setDateOfCompleat(sqlDateOfCompleat);
				jr.save(jr.findById(jobId).get());
			}
			return jr.findById(jobId).get();
		}
	}

	public Job jobNumberCheck(final int jobNumber) {

		Job emptyJob = new Job();

		if (jobNumber == 0 || jr.findByJobNumber(jobNumber).isEmpty()) {
			return emptyJob;
		} else {
			return null;
		}
	}

	public Job jobNumberCheckForEdit(final int jobNumber, final int tempJobNumber) {

		Job emptyJob = new Job();

		for (Job jobChecker : jr.findAll()) {
			if (jobNumber == 0 || tempJobNumber == 0
					|| jobNumber == jobChecker.getJobNumber() && jobNumber != tempJobNumber) {
				return null;
			}
		}
		return emptyJob;
	}

	public JobProducts jobProductIdCheckForActiveJobAdd(final int jId, final int jobProductId) {

		JobProducts jobProduct = new JobProducts();
		if (jId == 0 || jobProductId == 0 || jpr.findByjIdAndJobProductId(jId, jobProductId).isPresent()) {
			return null;
		} else {
			return jobProduct;
		}
	}

	public JobProducts jobProductIdCheckForActiveJobEdit(final int jId, final int jobProductId,
			final int tempProductId) {

		List<JobProducts> tempJobProductsList = new ArrayList<>();
		for (JobProducts jobProduct : jpr.findByjId(jId)) {
			tempJobProductsList.add(jobProduct);
		}
		tempJobProductsList.remove(jpr.findByjIdAndJobProductId(jId, tempProductId).get());

		for (JobProducts jobProduct1 : tempJobProductsList) {
			if (jId == 0 || jobProductId == 0 || tempProductId == 0 || jobProduct1.getJobProductId() == jobProductId) {
				return null;
			}
		}
		return jpr.findByjIdAndJobProductId(jId, tempProductId).get();
	}

	@Transactional
	public Job editJob(final int jobId, final String jobDescription, final String jobOrigin, final String jobType,
			final String jobRemarks, final double laborCost, LocalDate dateOfInstall) {

		double jobProfit = 0;
		double jobProfitPerc = 0;

		if (jobId == 0 || jr.findById(jobId).isEmpty()) {
			return null;
		} else {
			jr.findById(jobId).get().setJobDescription(jobDescription);
			jr.findById(jobId).get().setJobOrigin(jobOrigin);
			jr.findById(jobId).get().setJobType(jobType);
			jr.findById(jobId).get().setJobRemarks(jobRemarks);

			Date sqlDateOfInstall = Date.valueOf(dateOfInstall);
			jr.findById(jobId).get().setDateOfInstall(sqlDateOfInstall);

			jr.findById(jobId).get().setLaborCost(laborCost);
			jobProfit = jr.findById(jobId).get().getCustPayment() - laborCost - jr.findById(jobId).get().getMatCost();
			jobProfitPerc = jobProfit / jr.findById(jobId).get().getCustPayment() * 100;
			jr.findById(jobId).get().setProfit(jobProfit);
			jr.findById(jobId).get().setProfitPerc(jobProfitPerc);

			jr.save(jr.findById(jobId).get());
			return jr.findById(jobId).get();
		}
	}

	@Transactional
	public Job deleteJob(final int jobId) {

		Job job = new Job();

		if (jobId == 0 || jr.findById(jobId).isEmpty()) {
			return null;
		} else {

			for (JobProducts jobProduct : jpr.findByjId(jobId)) {

				// Add to product quantity before deleting jobProduct.
				pr.findById(jobProduct.getJobProductId()).get()
						.setProductQuan(pr.findById(jobProduct.getJobProductId()).get().getProductQuan()
								+ jobProduct.getJobProductQuantity());
				pr.save(pr.findById(jobProduct.getJobProductId()).get());
			}
			jr.delete(jr.findById(jobId).get());
		}
		return job;
	}

	public JobProducts addActiveJobProduct(final int jId, final int jobProductId, final int jobProductNumber,
			final String jobProductName, final int jobProductQuantity, final double jobProductCost,
			final double jobProductSubtotal) {

		JobProducts jobProduct = new JobProducts();
		int JobProductMissing = 0;
		int howManyInStock = 0;

		if (jId == 0 || jobProductId == 0 || jobProductName.equals("") || jobProductName.equals(null)) {
			return null;
		} else {

			JobUtils.createJobProdcut(jobProduct, jId, jobProductId, jobProductNumber, jobProductName,
					jobProductQuantity, jobProductCost, jobProductSubtotal);

			setJobProductMissing(jobProduct, JobProductMissing, howManyInStock);
			jpr.save(jobProduct);

			editJobFinance(jpr.findByjId(jId), jId, jr.findById(jId).get().getLaborCost());
			return jobProduct;
		}
	}

	public JobProducts editActiveJobProduct(final int jId, final int jobProductId, final int tempProductId,
			final int jobProductNumber, final String jobProductName, final int prevJobProductQuantity,
			final int jobProductQuantity, final double jobProductCost, final double jobProductSubtotal,
			String editJobProductInst) {
		JobProducts jobProduct = new JobProducts();
		int JobProductMissing = 0;
		int howManyInStock = 0;

		if (jId == 0 || jobProductId == 0 || tempProductId == 0 || jobProductName.equals("")
				|| jobProductName.equals(null) || jpr.findByjIdAndJobProductId(jId, tempProductId).isEmpty()) {
			return null;
		} else {
			jpr.delete(jpr.findByjIdAndJobProductId(jId, tempProductId).get());

			JobUtils.createJobProdcut(jobProduct, jId, jobProductId, jobProductNumber, jobProductName,
					jobProductQuantity, jobProductCost, jobProductSubtotal);

			if (editJobProductInst.equals("המוצר טרם הותקן")) {
				jobProduct.setJobProductInst(editJobProductInst);
			} else if (editJobProductInst.length() < 5) {
				jobProduct.setJobProductInst(" הותקנו " + editJobProductInst + " מתוך " + jobProductQuantity);
			} else {
				editJobProductInst = editJobProductInst.substring(7, 11).trim();
				if (Integer.parseInt(editJobProductInst) > jobProductQuantity) {
					int tempValue = jobProductQuantity;
					editJobProductInst = String.valueOf(tempValue);
				}
				jobProduct.setJobProductInst(" הותקנו " + editJobProductInst + " מתוך " + jobProductQuantity);
			}

			setJobProductMissingForEdit(jobProduct, prevJobProductQuantity, JobProductMissing, howManyInStock);
			jpr.save(jobProduct);
		}

		editJobFinance(jpr.findByjId(jId), jId, jr.findById(jId).get().getLaborCost());

		return jobProduct;
	}

	public Job deleteActiveJobProducts(final int jId, final int jobProductId) {

		if (jId == 0 || jobProductId == 0 || jpr.findByjIdAndJobProductId(jId, jobProductId).isEmpty()) {
			return null;
		} else {
			// Add to product quantity before deleting jobProduct.
			pr.findById(jobProductId).get().setProductQuan(pr.findById(jobProductId).get().getProductQuan()
					+ jpr.findByJobProductId(jobProductId).get().getJobProductQuantity());
			pr.save(pr.findById(jobProductId).get());

			jpr.delete(jpr.findByjIdAndJobProductId(jId, jobProductId).get());

			editJobFinance(jpr.findByjId(jId), jId, jr.findById(jId).get().getLaborCost());

			return jr.findById(jId).get();
		}
	}

	public List<Job> sortByJobIdAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobIdAsc());
	}

	public List<Job> sortByJobIdDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobIdDesc());
	}

	public List<Job> sortByJobNumberAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobNumberAsc());
	}

	public List<Job> sortByJobNumberDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobNumberDesc());
	}

	public List<Job> sortByCustNameAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByCustNameAsc());
	}

	public List<Job> sortByCustNameDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByCustNameDesc());
	}

	public List<Job> sortByCustAddressAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByCustAddressAsc());
	}

	public List<Job> sortByCustAddressDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByCustAddressDesc());
	}

	public List<Job> sortByJobDescriptionAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobDescriptionAsc());
	}

	public List<Job> sortByJobDescriptionDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobDescriptionDesc());
	}

	public List<Job> sortByJobOriginAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobOriginAsc());
	}

	public List<Job> sortByJobOriginDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobOriginDesc());
	}

	public List<Job> sortByJobTypeAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobTypeAsc());
	}

	public List<Job> sortByJobTypeDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobTypeDesc());
	}

	public List<Job> sortByJobRemarksAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobRemarksAsc());
	}

	public List<Job> sortByJobRemarksDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobRemarksDesc());
	}

	public List<Job> sortByMatCostAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByMatCostAsc());
	}

	public List<Job> sortByMatCostDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByMatCostDesc());
	}

	public List<Job> sortByLaborCostAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByLaborCostAsc());
	}

	public List<Job> sortByLaborCostDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByLaborCostDesc());
	}

	public List<Job> sortByCustPaymentAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByCustPaymentAsc());
	}

	public List<Job> sortByCustPaymentDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByCustPaymentDesc());
	}

	public List<Job> sortByProfitAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByProfitAsc());
	}

	public List<Job> sortByProfitDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByProfitDesc());
	}

	public List<Job> sortByProfitPercAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByProfitPercAsc());
	}

	public List<Job> sortByProfitPercDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByProfitPercDesc());
	}

	public List<Job> sortByJobDateOfOfferAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobDateOfOfferAsc());
	}

	public List<Job> sortByJobDateOfOfferDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByJobDateOfOfferDesc());
	}

	public List<Job> sortByDateOfInstallAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByDateOfInstallAsc());
	}

	public List<Job> sortByDateOfInstallDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByDateOfInstallDesc());
	}

	public List<Job> sortByDateOfCompleatAsc() {

		return JobUtils.returnJobsList(jr.findByOrderByDateOfCompleatAsc());
	}

	public List<Job> sortByDateOfCompleatDesc() {

		return JobUtils.returnJobsList(jr.findByOrderByDateOfCompleatDesc());
	}
}