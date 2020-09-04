package com.shidroogim.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.shidroogim.entities.OfferProducts;

public interface OfferProductsRepository extends CrudRepository<OfferProducts, Integer>{
	
	List<OfferProducts> findByoId(Integer oId);
	Optional<OfferProducts> findByOfferProductId(Integer offerProductId);
	Optional<OfferProducts> findByoIdAndOfferProductId(Integer oId, Integer offerProductId);
}