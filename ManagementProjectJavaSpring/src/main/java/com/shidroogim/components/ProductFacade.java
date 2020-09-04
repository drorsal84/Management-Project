package com.shidroogim.components;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.shidroogim.entities.Product;

import com.shidroogim.repositories.ProductRepository;
import com.shidroogim.utils.ProductUtils;

@Component
public class ProductFacade {

	private final ProductRepository pr;

	public ProductFacade(@Autowired ApplicationContext context) {

		pr = context.getBean(ProductRepository.class);
	}
	
	public List<Product> searchProducts(final String searchInput) {
		String productName = searchInput;
		String productCatalogNum = searchInput;
		String productManuf = searchInput;
		
		if(searchInput.equals("") || searchInput.equals(null)) {
			return null;
		}else {
			return pr.findByProductNameContainingOrProductCatalogNumContainingOrProductManufContaining
					(productName, productCatalogNum, productManuf);
		}
	}
	
	public List<Product> filterProductsByCategory(String productCat) {
		productCat = ProductUtils.catFilterGetName(productCat);
		if(productCat.equals("")|| productCat.equals(null)) {
			return null;
		}else {
			return pr.findByProductCat(productCat);
		}
	}

	public Product newProductCatalogNumCheck(final String productCatalogNum) {
		// Check if catalog number is unique
		Product emptyProduct = new Product();
		if (productCatalogNum.equals("") || productCatalogNum.equals(null) || 
				pr.findByProductCatalogNum(productCatalogNum.trim()).isPresent()) {	
			return null;
		} else {
			return emptyProduct;
		}
	}

	public Product editProductCatalogNumCheck(final int productId, final String productCatalogNum) {
		// Check if catalog number is unique
		Product emptyProduct = new Product();
		// creating an ArrayList to work with
		ArrayList<Product> filteredProducts = new ArrayList<>();
		if(productId == 0 || productCatalogNum.equals("") || productCatalogNum.equals(null)) {
			return null;
		}else {
		for (Product filteredProduct1 : pr.findAll()) {
			if (filteredProduct1.getProductId() != pr.findById(productId).get().getProductId()) {
				filteredProducts.add(filteredProduct1);
			}

			for (Product filteredProduct2 : filteredProducts) {
				if (productCatalogNum.trim().equalsIgnoreCase(filteredProduct2.getProductCatalogNum())) {
					return null;
				}
			}

		}
		}
		return emptyProduct;
	}
	
	public Product getProductById(final int productId) {
	  if(productId == 0 || pr.findById(productId).isEmpty()) {
		  return null;
	  }else {
		  return pr.findById(productId).get();
	  }
	}

	@Transactional
	public Product createNewProduct(final String productCat, final String productName, 
			final String productManuf, final String productCatalogNum, final int productQuan, 
			final int productOnSaleQuan, final double productCost, final double productOnSaleCost, 
			final String productImgFile) {

		Product product = new Product();
		double productTotalCost = 0;
		double productOnSaleTotalCost = 0;
		double productCombinedTotalCost = 0;
		if(productCat.equals("") || productCat.equals(null) || productName.equals("") ||
				productName.equals(null) || productCatalogNum.equals("") || 
				productCatalogNum.equals(null)) {
			return null;
		}else {
			
		ProductUtils.chooseCategory(product, productCat);
		product.setProductName(productName);
		product.setProductCatalogNum(productCatalogNum);

		if (productManuf.equals("") || productManuf.equals(null)) {
			product.setProductManuf("-");
		} else {
			product.setProductManuf(productManuf);
		}
		if (productImgFile.equals("") || productImgFile.equals(null)) {
			product.setProductImgFile("https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg");
		} else {
			product.setProductImgFile(productImgFile);
		}

		product.setProductQuan(productQuan);
		product.setProductOnSaleQuan(productOnSaleQuan);
		product.setProductCost(productCost);
		product.setProductOnSaleCost(productOnSaleCost);

		// Product regular total cost
		productTotalCost = productCost * productQuan;
		product.setProductTotalCost(productTotalCost);

		// Product on sale total cost
		productOnSaleTotalCost = productOnSaleCost * productOnSaleQuan;
		product.setProductOnSaleTotalCost(productOnSaleTotalCost);

		// Product regular + on sale total cost
		productCombinedTotalCost = productTotalCost + productOnSaleTotalCost;
		product.setProductCombinedTotalCost(productCombinedTotalCost);

		pr.save(product);

		return product;
		}
	}

	@Transactional
	public Product editProduct(final int productId, final String productCat, final String productName,
			final String productManuf, final String productCatalogNum, final int productQuan, 
			final int productOnSaleQuan, final double productCost, final double productOnSaleCost, 
			final String productImgFile) {

		double productTotalCost = 0;
		double productOnSaleTotalCost = 0;
		double productCombinedTotalCost = 0;
		if(productId == 0) {
			return null;
		}else {
		if (productCat.equals("") || productCat.equals(null)) {
			pr.findById(productId).get().setProductCat(pr.findById(productId).get().getProductCat());
		} else {
			ProductUtils.chooseCategory(pr.findById(productId).get(), productCat);
		}
		if (productName.equals("") || productName.equals(null)) {
			pr.findById(productId).get().setProductName(pr.findById(productId).get().getProductName());
		} else {
			pr.findById(productId).get().setProductName(productName);
		}
		if (productCatalogNum.equals("") || productCatalogNum.equals(null)) {
			pr.findById(productId).get().setProductCatalogNum(pr.findById(productId).get().getProductCatalogNum());
		} else {
			pr.findById(productId).get().setProductCatalogNum(productCatalogNum);
		}
		if (productManuf.equals("") || productManuf.equals(null)) {
			pr.findById(productId).get().setProductManuf("-");
		} else {
			pr.findById(productId).get().setProductManuf(productManuf);
		}
		if (productImgFile.equals("") || productImgFile.equals(null)) {
			pr.findById(productId).get()
					.setProductImgFile("https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg");
		} else {
			pr.findById(productId).get().setProductImgFile(productImgFile);
		}

		pr.findById(productId).get().setProductQuan(productQuan);
		pr.findById(productId).get().setProductOnSaleQuan(productOnSaleQuan);
		pr.findById(productId).get().setProductCost(productCost);
		pr.findById(productId).get().setProductOnSaleCost(productOnSaleCost);

		productTotalCost = productCost * productQuan;
		pr.findById(productId).get().setProductTotalCost(productTotalCost);

		productOnSaleTotalCost = productOnSaleCost * productOnSaleQuan;
		pr.findById(productId).get().setProductOnSaleTotalCost(productOnSaleTotalCost);

		productCombinedTotalCost = productTotalCost + productOnSaleTotalCost;
		pr.findById(productId).get().setProductCombinedTotalCost(productCombinedTotalCost);

		pr.save(pr.findById(productId).get());

		return pr.findById(productId).get();
		}
	}
	
	@Transactional
	public Product deleteProduct(final int productId) {
		Product product = new Product();
		if (productId == 0 || pr.findById(productId).isEmpty()) {
			return null;
		} else {
			pr.delete(pr.findById(productId).get());
			return product;
		}
	}

	public Iterable<Product> getAllProducts() {
		return pr.findAll();
	}
	
	public List<Product> sortByProductIdAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductIdAsc());
	}
	
	public List<Product> sortByProductIdDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductIdDesc());
	}
	
	public List<Product> sortByProductCatAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductCatAsc());
	}
	
	public List<Product> sortByProductCatDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductCatDesc());
	}
	
	public List<Product> sortByProductNameAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductNameAsc());
	}
	
	public List<Product> sortByProductNameDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductNameDesc());
	}
	
	public List<Product> sortByProductManufAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductManufAsc());
	}
	
	public List<Product> sortByProductManufDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductManufDesc());
	}
	
	public List<Product> sortByProductCatalogNumAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductCatalogNumAsc());
	}
	
	public List<Product> sortByProductCatalogNumDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductCatalogNumDesc());
	}
	
	public List<Product> sortByProductQuanAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductQuanAsc());
	}
	
	public List<Product> sortByProductQuanDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductQuanDesc());
	}
	
	public List<Product> sortByProductOnSaleQuanAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductOnSaleQuanAsc());
	}
	
	public List<Product> sortByProductOnSaleQuanDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductOnSaleQuanDesc());
	}
	
	public List<Product> sortByProductCostAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductCostAsc());
	}
	
	public List<Product> sortByProductCostDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductCostDesc());
	}
	
	public List<Product> sortByProductOnSaleCostAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductOnSaleCostAsc());
	}
	
	public List<Product> sortByProductOnSaleCostDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductOnSaleCostDesc());
	}
	
	public List<Product> sortByProductTotalCostAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductTotalCostAsc());
	}
	
	public List<Product> sortByProductTotalCostDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductTotalCostDesc());
	}
	
	public List<Product> sortByProductOnSaleTotalCostAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductOnSaleTotalCostAsc());
	}
	
	public List<Product> sortByProductOnSaleTotalCostDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductOnSaleTotalCostDesc());
	}
	
	public List<Product> sortByProductCombinedTotalCostAsc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductCombinedTotalCostAsc());
	}
	
	public List<Product> sortByProductCombinedTotalCostDesc(){

		return ProductUtils.sortProductList(pr.findByOrderByProductCombinedTotalCostDesc());
	}
}