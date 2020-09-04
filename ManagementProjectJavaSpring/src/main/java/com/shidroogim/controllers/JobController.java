package com.shidroogim.controllers;

import java.time.LocalDate;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shidroogim.components.JobFacade;
import com.shidroogim.entities.Job;
import com.shidroogim.utils.JobUtils;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class JobController {

	private final JobFacade jf;

	public JobController(@Autowired ApplicationContext context) {
		jf = context.getBean(JobFacade.class);
	}

	public Job exception() {
		return null;
	}
	
	@RequestMapping("Shidroogim/searchJobs")
	@ResponseBody
	public String searchJobs(@RequestParam String searchInput) {
		if (searchInput.equalsIgnoreCase("") || searchInput.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
		return JobUtils.sendJobsJsonList(jf.searchJobs(searchInput));
		}
	}
	
	@RequestMapping("Shidroogim/getActiveJobJobProductsList")
	@ResponseBody
	public String getActiveJobJobProductsList(@RequestParam String jId) {

		if (jId.equalsIgnoreCase("") || jId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return JobUtils.sendJobProductsJsonList(jf.getActiveJobJobProductsList(Integer.parseInt(jId)));
		}
	}

	@RequestMapping("Shidroogim/jobNumberCheck")
	@ResponseBody
	public String jobNumberCheck(@RequestParam String jobNumber) {
		if (jobNumber.equalsIgnoreCase("") || jobNumber.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.jobNumberCheck(Integer.parseInt(jobNumber)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/jobNumberCheckForEdit")
	@ResponseBody
	public String jobNumberCheckForEdit(@RequestParam String jobNumber, @RequestParam String tempJobNumber) {
		if (jobNumber.equalsIgnoreCase("") || jobNumber.equalsIgnoreCase(null)
				|| tempJobNumber.equalsIgnoreCase("") || tempJobNumber.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.jobNumberCheckForEdit(Integer.parseInt(jobNumber), Integer.parseInt(tempJobNumber))
					.toJSON().toString();
		}
	}

	@RequestMapping("Shidroogim/jobProductIdCheckForActiveJobAdd")
	@ResponseBody
	public String jobProductIdCheckForActiveJobAdd(@RequestParam String jId, @RequestParam String jobProductId) {
		if (jobProductId.equalsIgnoreCase("") || jobProductId.equalsIgnoreCase(null) || jId.equalsIgnoreCase("")
				|| jId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.jobProductIdCheckForActiveJobAdd(Integer.parseInt(jId), Integer.parseInt(jobProductId)).toJSON()
					.toString();
		}
	}

	@RequestMapping("Shidroogim/jobProductIdCheckForActiveJobEdit")
	@ResponseBody
	public String jobProductIdCheckForActiveJobEdit(@RequestParam String jId, @RequestParam String jobProductId,
			@RequestParam String tempProductId) {
		if (jobProductId.equalsIgnoreCase("") || jobProductId.equalsIgnoreCase(null) || jId.equalsIgnoreCase("")
				|| jId.equalsIgnoreCase(null) || tempProductId.equalsIgnoreCase("")
				|| tempProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.jobProductIdCheckForActiveJobEdit(Integer.parseInt(jId), Integer.parseInt(jobProductId),
					Integer.parseInt(tempProductId)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/editJob")
	@ResponseBody
	public String editJob(@RequestParam String jobId, @RequestParam String jobDescription, @RequestParam String jobOrigin,
			@RequestParam String jobType, @RequestParam String jobRemarks, @RequestParam String laborCost, 
			@RequestParam String dateOfInstall) {	
		if (jobId.equalsIgnoreCase("") || jobId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.editJob(Integer.parseInt(jobId), jobDescription, jobOrigin, jobType, jobRemarks,
					Double.parseDouble(laborCost), LocalDate.parse(dateOfInstall)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/deleteJob")
	@ResponseBody
	public String deleteJob(@RequestParam String jobId) {
		
		if (jobId.equalsIgnoreCase("") || jobId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.deleteJob(Integer.parseInt(jobId)).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/setJobDateOfCompleat")
	@ResponseBody
	public String setJobDateOfCompleat(@RequestParam String jobId, @RequestParam String dateOfCompleat) {
		
		if (jobId.equalsIgnoreCase("") || jobId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.setJobDateOfCompleat(Integer.parseInt(jobId), LocalDate.parse(dateOfCompleat)).toJSON().toString();
		}
	}

	@RequestMapping("Shidroogim/addActiveJobProduct")
	@ResponseBody
	public String addActiveJobProduct(@RequestParam String jId, @RequestParam String jobProductId,
			@RequestParam String jobProductNumber, @RequestParam String jobProductName,
			@RequestParam String jobProductQuantity, @RequestParam String jobProductCost,
			@RequestParam String jobProductSubtotal) {

		if (jId.equalsIgnoreCase("") || jId.equalsIgnoreCase(null) || jobProductId.equalsIgnoreCase("")
				|| jobProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf
					.addActiveJobProduct(Integer.parseInt(jId), Integer.parseInt(jobProductId),
							Integer.parseInt(jobProductNumber), jobProductName, Integer.parseInt(jobProductQuantity),
							Double.parseDouble(jobProductCost), Double.parseDouble(jobProductSubtotal))
					.toJSON().toString();
		}
	}

	@RequestMapping("Shidroogim/editActiveJobProduct")
	@ResponseBody
	public String editActiveJobProduct(@RequestParam String jId, @RequestParam String jobProductId,
			@RequestParam String tempProductId, @RequestParam String jobProductNumber,
			@RequestParam String jobProductName, @RequestParam String prevJobProductQuantity,
			@RequestParam String jobProductQuantity, @RequestParam String jobProductCost, 
			@RequestParam String jobProductSubtotal, @RequestParam String editJobProductInst) {

		if (jId.equalsIgnoreCase("") || jId.equalsIgnoreCase(null) || jobProductId.equalsIgnoreCase("")
				|| jobProductId.equalsIgnoreCase(null) || tempProductId.equalsIgnoreCase("")
				|| tempProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.editActiveJobProduct(Integer.parseInt(jId), Integer.parseInt(jobProductId),
					Integer.parseInt(tempProductId), Integer.parseInt(jobProductNumber), jobProductName,
					Integer.parseInt(prevJobProductQuantity), Integer.parseInt(jobProductQuantity), 
					Double.parseDouble(jobProductCost), Double.parseDouble(jobProductSubtotal), 
					editJobProductInst).toJSON().toString();
		}
	}

	@RequestMapping("Shidroogim/deleteActiveJobProducts")
	@ResponseBody
	public String deleteActiveJobProducts(@RequestParam String jId, @RequestParam String jobProductId) {

		if (jId.equalsIgnoreCase("") || jId.equalsIgnoreCase(null) || jobProductId.equalsIgnoreCase("")
				|| jobProductId.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return jf.deleteActiveJobProducts(Integer.parseInt(jId), Integer.parseInt(jobProductId)).toJSON()
					.toString();
		}
	}
	
	@RequestMapping("Shidroogim/sortByJobIdAsc")
	@ResponseBody
	public String sortByJobIdAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobIdAsc());
	}

	@RequestMapping("Shidroogim/sortByJobIdDesc")
	@ResponseBody
	public String sortByJobIdDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobIdDesc());
	}
	
	@RequestMapping("Shidroogim/sortByJobNumberAsc")
	@ResponseBody
	public String sortByJobNumberAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobNumberAsc());
	}

	@RequestMapping("Shidroogim/sortByJobNumberDesc")
	@ResponseBody
	public String sortByJobNumberDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobNumberDesc());
	}
	
	@RequestMapping("Shidroogim/sortByCustNameAsc")
	@ResponseBody
	public String sortByCustNameAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByCustNameAsc());
	}

	@RequestMapping("Shidroogim/sortByCustNameDesc")
	@ResponseBody
	public String sortByCustNameDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByCustNameDesc());
	}
	
	@RequestMapping("Shidroogim/sortByCustAddressAsc")
	@ResponseBody
	public String sortByCustAddressAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByCustAddressAsc());
	}

	@RequestMapping("Shidroogim/sortByCustAddressDesc")
	@ResponseBody
	public String sortByCustAddressDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByCustAddressDesc());
	}
	
	@RequestMapping("Shidroogim/sortByJobDescriptionAsc")
	@ResponseBody
	public String sortByJobDescriptionAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobDescriptionAsc());
	}

	@RequestMapping("Shidroogim/sortByJobDescriptionDesc")
	@ResponseBody
	public String sortByJobDescriptionDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobDescriptionDesc());
	}
	
	@RequestMapping("Shidroogim/sortByJobOriginAsc")
	@ResponseBody
	public String sortByJobOriginAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobOriginAsc());
	}

	@RequestMapping("Shidroogim/sortByJobOriginDesc")
	@ResponseBody
	public String sortByJobOriginDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobOriginDesc());
	}
	
	@RequestMapping("Shidroogim/sortByJobTypeAsc")
	@ResponseBody
	public String sortByJobTypeAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobTypeAsc());
	}

	@RequestMapping("Shidroogim/sortByJobTypeDesc")
	@ResponseBody
	public String sortByJobTypeDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobTypeDesc());
	}
	
	@RequestMapping("Shidroogim/sortByJobRemarksAsc")
	@ResponseBody
	public String sortByJobRemarksAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobRemarksAsc());
	}

	@RequestMapping("Shidroogim/sortByJobRemarksDesc")
	@ResponseBody
	public String sortByJobRemarksDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobRemarksDesc());
	}
	
	@RequestMapping("Shidroogim/sortByMatCostAsc")
	@ResponseBody
	public String sortByMatCostAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByMatCostAsc());
	}

	@RequestMapping("Shidroogim/sortByMatCostDesc")
	@ResponseBody
	public String sortByMatCostDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByMatCostDesc());
	}
	
	@RequestMapping("Shidroogim/sortByLaborCostAsc")
	@ResponseBody
	public String sortByLaborCostAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByLaborCostAsc());
	}

	@RequestMapping("Shidroogim/sortByLaborCostDesc")
	@ResponseBody
	public String sortByLaborCostDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByLaborCostDesc());
	}
	
	@RequestMapping("Shidroogim/sortByCustPaymentAsc")
	@ResponseBody
	public String sortByCustPaymentAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByCustPaymentAsc());
	}

	@RequestMapping("Shidroogim/sortByCustPaymentDesc")
	@ResponseBody
	public String sortByCustPaymentDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByCustPaymentDesc());
	}
	
	@RequestMapping("Shidroogim/sortByProfitAsc")
	@ResponseBody
	public String sortByProfitAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByProfitAsc());
	}

	@RequestMapping("Shidroogim/sortByProfitDesc")
	@ResponseBody
	public String sortByProfitDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByProfitDesc());
	}
	
	@RequestMapping("Shidroogim/sortByProfitPercAsc")
	@ResponseBody
	public String sortByProfitPercAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByProfitPercAsc());
	}

	@RequestMapping("Shidroogim/sortByProfitPercDesc")
	@ResponseBody
	public String sortByProfitPercDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByProfitPercDesc());
	}
	
	@RequestMapping("Shidroogim/sortByJobDateOfOfferAsc")
	@ResponseBody
	public String sortByJobDateOfOfferAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobDateOfOfferAsc());
	}

	@RequestMapping("Shidroogim/sortByJobDateOfOfferDesc")
	@ResponseBody
	public String sortByJobDateOfOfferDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByJobDateOfOfferDesc());
	}
	
	@RequestMapping("Shidroogim/sortByDateOfInstallAsc")
	@ResponseBody
	public String sortByDateOfInstallAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByDateOfInstallAsc());
	}

	@RequestMapping("Shidroogim/sortByDateOfInstallDesc")
	@ResponseBody
	public String sortByDateOfInstallDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByDateOfInstallDesc());
	}
	
	@RequestMapping("Shidroogim/sortByDateOfCompleatAsc")
	@ResponseBody
	public String sortByDateOfCompleatAsc() {
		return JobUtils.sendJobsJsonList(jf.sortByDateOfCompleatAsc());
	}

	@RequestMapping("Shidroogim/sortByDateOfCompleatDesc")
	@ResponseBody
	public String sortByDateOfCompleatDesc() {
		return JobUtils.sendJobsJsonList(jf.sortByDateOfCompleatDesc());
	}
}