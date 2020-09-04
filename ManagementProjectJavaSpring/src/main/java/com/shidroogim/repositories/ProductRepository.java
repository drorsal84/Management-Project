package com.shidroogim.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.shidroogim.entities.Product;

public interface ProductRepository extends CrudRepository<Product, Integer> {

	Optional<Product> findByProductName(String productName);

	List<Product> findByProductCat(String productCat);

	Optional<Product> findByProductCatalogNum(String productCatalogNum);
	
	List<Product> findByProductNameContainingOrProductCatalogNumContainingOrProductManufContaining
	(String productName, String productCatalogNum, String productManuf);
	
	List<Product> findByOrderByProductIdAsc();
	List<Product> findByOrderByProductIdDesc();
	
	List<Product> findByOrderByProductCatAsc();
	List<Product> findByOrderByProductCatDesc();
	
	List<Product> findByOrderByProductNameAsc();
	List<Product> findByOrderByProductNameDesc();
	
	List<Product> findByOrderByProductManufAsc();
	List<Product> findByOrderByProductManufDesc();
	
	List<Product> findByOrderByProductCatalogNumAsc();
	List<Product> findByOrderByProductCatalogNumDesc();
	
	List<Product> findByOrderByProductQuanAsc();
	List<Product> findByOrderByProductQuanDesc();
	
	List<Product> findByOrderByProductOnSaleQuanAsc();
	List<Product> findByOrderByProductOnSaleQuanDesc();
	
	List<Product> findByOrderByProductCostAsc();
	List<Product> findByOrderByProductCostDesc();
	
	List<Product> findByOrderByProductOnSaleCostAsc();
	List<Product> findByOrderByProductOnSaleCostDesc();
	
	List<Product> findByOrderByProductTotalCostAsc();
	List<Product> findByOrderByProductTotalCostDesc();
	
	List<Product> findByOrderByProductOnSaleTotalCostAsc();
	List<Product> findByOrderByProductOnSaleTotalCostDesc();
	
	List<Product> findByOrderByProductCombinedTotalCostAsc();
	List<Product> findByOrderByProductCombinedTotalCostDesc();
}