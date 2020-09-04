package com.shidroogim.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.shidroogim.entities.JobProducts;

public interface JobProductsRepository extends CrudRepository<JobProducts, Integer>{
	
	List<JobProducts> findByjId(Integer jId);
	Optional<JobProducts> findByJobProductId(Integer jobProductId);
	Optional<JobProducts> findByjIdAndJobProductId(Integer jId, Integer jobProductId);

}
