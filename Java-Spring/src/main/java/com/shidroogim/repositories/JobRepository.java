package com.shidroogim.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.shidroogim.entities.Job;

public interface JobRepository extends CrudRepository<Job, Integer> {

	List<Job> findByJobNumber(Integer jobNumber);
	
	List<Job> findByJobNumberContaining(Integer jobNumber);
	
	List<Job> findByJobStage(String jobStage);

	List<Job> findByCustNameContainingOrCustAddressContainingOrJobOriginContainingOrJobType
	(String custName, String custAddress, String jobOrigin, String jobType);

	List<Job> findByOrderByJobIdAsc();
	List<Job> findByOrderByJobIdDesc();
	
	List<Job> findByOrderByJobNumberAsc();
	List<Job> findByOrderByJobNumberDesc();
	
	List<Job> findByOrderByCustNameAsc();
	List<Job> findByOrderByCustNameDesc();
	
	List<Job> findByOrderByCustAddressAsc();
	List<Job> findByOrderByCustAddressDesc();
	
	List<Job> findByOrderByJobDescriptionAsc();
	List<Job> findByOrderByJobDescriptionDesc();
	
	List<Job> findByOrderByJobOriginAsc();
	List<Job> findByOrderByJobOriginDesc();
	
	List<Job> findByOrderByJobTypeAsc();
	List<Job> findByOrderByJobTypeDesc();
	
	List<Job> findByOrderByJobRemarksAsc();
	List<Job> findByOrderByJobRemarksDesc();
	
	List<Job> findByOrderByMatCostAsc();
	List<Job> findByOrderByMatCostDesc();
	
	List<Job> findByOrderByLaborCostAsc();
	List<Job> findByOrderByLaborCostDesc();
	
	List<Job> findByOrderByCustPaymentAsc();
	List<Job> findByOrderByCustPaymentDesc();
	
	List<Job> findByOrderByProfitAsc();
	List<Job> findByOrderByProfitDesc();
	
	List<Job> findByOrderByProfitPercAsc();
	List<Job> findByOrderByProfitPercDesc();
	
	List<Job> findByOrderByJobDateOfOfferAsc();
	List<Job> findByOrderByJobDateOfOfferDesc();
	
	List<Job> findByOrderByDateOfInstallAsc();
	List<Job> findByOrderByDateOfInstallDesc();
	
	List<Job> findByOrderByDateOfCompleatAsc();
	List<Job> findByOrderByDateOfCompleatDesc();
}