package com.shidroogim.controllers;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shidroogim.components.WorkService;
import com.shidroogim.utils.JobUtils;
import com.shidroogim.utils.OfferUtils;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class WorkServiceController {
	
	private final WorkService ws;
	
	public WorkServiceController(@Autowired ApplicationContext context) {
		ws = context.getBean(WorkService.class);
	}
	
	@RequestMapping("Shidroogim/offerListSwitcher")
	@ResponseBody
	public String offerListSwitcher(@RequestParam String offerStage) {
		return OfferUtils.sendOffersJsonList(ws.offerListSwitcher(offerStage));
	}
	
	@RequestMapping("Shidroogim/offerStageSwitcher")
	@ResponseBody
	public String offerStageSwitcher(@RequestParam String offerId, @RequestParam String prevOfferStage, 
			@RequestParam String currOfferStage) {
		return ws.offerStageSwitcher(Integer.parseInt(offerId), prevOfferStage, currOfferStage).toJSON().toString();
	}
	
	@RequestMapping("Shidroogim/jobListSwitcher")
	@ResponseBody
	public String jobListSwitcher(@RequestParam String jobStage) {
		return JobUtils.sendJobsJsonList(ws.jobListSwitcher(jobStage));
	}
	
	@RequestMapping("Shidroogim/createNewJob")
	@ResponseBody
	public String createNewJob(@RequestParam String offerId, @RequestParam String laborCost, 
			@RequestParam String dateOfInstall) {	
		return ws.createNewJob(Integer.parseInt(offerId), Double.parseDouble(laborCost), 
				LocalDate.parse(dateOfInstall)).toJSON().toString();
	}
}