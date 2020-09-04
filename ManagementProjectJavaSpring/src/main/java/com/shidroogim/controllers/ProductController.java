package com.shidroogim.controllers;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shidroogim.components.ProductFacade;
import com.shidroogim.entities.Product;
import com.shidroogim.utils.ProductUtils;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class ProductController {

	private final ProductFacade pf;

	ProductController(@Autowired ApplicationContext context) {
		pf = context.getBean(ProductFacade.class);
	}

	public Product exception() {
		return null;
	}

	@RequestMapping("Shidroogim/getAllProducts")
	@ResponseBody
	public String getAllProducts() {
		JSONArray products = new JSONArray();
		for (Product product : pf.getAllProducts()) {
			products.put(product.toJSON());
		}
		return products.toString();
	}

	@RequestMapping("Shidroogim/searchProducts")
	@ResponseBody
	public String searchProducts(@RequestParam String searchInput) {
		return ProductUtils.sendProductJsonList(pf.searchProducts(searchInput));
	}

	@RequestMapping("Shidroogim/filterProductsByCategory")
	@ResponseBody
	public String filterProductsByCategory(@RequestParam String productCat) {
		return ProductUtils.sendProductJsonList(pf.filterProductsByCategory(productCat));
	}

	@RequestMapping("Shidroogim/newProductCatalogNumCheck")
	@ResponseBody
	public String newProductCatalogNumCheck(@RequestParam String productCatalogNum) {
		return pf.newProductCatalogNumCheck(productCatalogNum).toJSON().toString();
	}

	@RequestMapping("Shidroogim/editProductCatalogNumCheck")
	@ResponseBody
	public String editProductCatalogNumCheck(@RequestParam String productId, 
			@RequestParam String productCatalogNum) {
		if(productId.equals("") || productId.equals(null)) {
			return exception().toJSON().toString();
		}else {
		return pf.editProductCatalogNumCheck(Integer.parseInt(productId), 
				productCatalogNum).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/getProductById")
	@ResponseBody
	public String getProductById(String productId) {
		if (productId.equals("") || productId.equals(null)) {
			return exception().toJSON().toString();
		} else {
			return pf.getProductById(Integer.parseInt(productId)).toJSON().toString();
	}
	}

	@RequestMapping("Shidroogim/createNewProduct")
	@ResponseBody
	public String createNewProduct(@RequestParam String productCat, @RequestParam String productName,
			@RequestParam String productManuf, @RequestParam String productCatalogNum, @RequestParam String productQuan,
			@RequestParam String productOnSaleQuan, @RequestParam String productCost,
			@RequestParam String productOnSaleCost, @RequestParam String productImgFile) {

		if (productQuan.equals("") || productQuan.equals(null)) {
			productQuan = "0";
		}
		if (productOnSaleQuan.equals("") || productOnSaleQuan.equals(null)) {
			productOnSaleQuan = "0";
		}
		if (productCost.equals("") || productCost.equals(null)) {
			productCost = "0";
		}
		if (productOnSaleCost.equals("") || productOnSaleCost.equals(null)) {
			productOnSaleCost = "0";
		}
		if (productCat.equalsIgnoreCase("") || productCat.equalsIgnoreCase(null) || productName.equalsIgnoreCase("")
				|| productName.equalsIgnoreCase(null) || productCatalogNum.equalsIgnoreCase("")
				|| productCatalogNum.equalsIgnoreCase(null)) {
			return exception().toJSON().toString();
		} else {
			return pf
					.createNewProduct(productCat, productName, productManuf, productCatalogNum,
							Integer.parseInt(productQuan), Integer.parseInt(productOnSaleQuan),
							Double.parseDouble(productCost), Double.parseDouble(productOnSaleCost), productImgFile)
					.toJSON().toString();
		}

	}

	@RequestMapping("Shidroogim/editProduct")
	@ResponseBody
	public String editProduct(String productId, @RequestParam String productCat, @RequestParam String productName,
			@RequestParam String productManuf, @RequestParam String productCatalogNum, @RequestParam String productQuan,
			@RequestParam String productOnSaleQuan, @RequestParam String productCost,
			@RequestParam String productOnSaleCost, @RequestParam String productImgFile) {

		if (productQuan.equals("") || productQuan.equals(null)) {
			productQuan = "0";
		}
		if (productOnSaleQuan.equals("") || productOnSaleQuan.equals(null)) {
			productOnSaleQuan = "0";
		}
		if (productCost.equals("") || productCost.equals(null)) {
			productCost = "0";
		}
		if (productOnSaleCost.equals("") || productOnSaleCost.equals(null)) {
			productOnSaleCost = "0";
		}

		return pf
				.editProduct(Integer.parseInt(productId), productCat, productName, productManuf, productCatalogNum,
						Integer.parseInt(productQuan), Integer.parseInt(productOnSaleQuan),
						Double.parseDouble(productCost), Double.parseDouble(productOnSaleCost), productImgFile)
				.toJSON().toString();
	}

	@RequestMapping("Shidroogim/deleteProduct")
	@ResponseBody
	public String deleteProduct(String productId) {
		if (productId.equalsIgnoreCase("") || productId.equals(null)) {
			return exception().toJSON().toString();
		} else {
			return pf.deleteProduct(Integer.parseInt(productId)).toJSON().toString();
		}
	}

	@RequestMapping("Shidroogim/sortByProductIdAsc")
	@ResponseBody
	public String sortByProductIdAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductIdAsc());
	}

	@RequestMapping("Shidroogim/sortByProductIdDesc")
	@ResponseBody
	public String sortByProductIdDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductIdDesc());
	}

	@RequestMapping("Shidroogim/sortByProductCatAsc")
	@ResponseBody
	public String sortByProductCatAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductCatAsc());
	}

	@RequestMapping("Shidroogim/sortByProductCatDesc")
	@ResponseBody
	public String sortByProductCatDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductCatDesc());
	}

	@RequestMapping("Shidroogim/sortByProductNameAsc")
	@ResponseBody
	public String sortByProductNameAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductNameAsc());
	}

	@RequestMapping("Shidroogim/sortByProductNameDesc")
	@ResponseBody
	public String sortByProductNameDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductNameDesc());
	}

	@RequestMapping("Shidroogim/sortByProductManufAsc")
	@ResponseBody
	public String sortByProductManufAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductManufAsc());
	}

	@RequestMapping("Shidroogim/sortByProductManufDesc")
	@ResponseBody
	public String sortByProductManufDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductManufDesc());
	}

	@RequestMapping("Shidroogim/sortByProductCatalogNumAsc")
	@ResponseBody
	public String sortByProductCatalogNumAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductCatalogNumAsc());
	}

	@RequestMapping("Shidroogim/sortByProductCatalogNumDesc")
	@ResponseBody
	public String sortByProductCatalogNumDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductCatalogNumDesc());
	}

	@RequestMapping("Shidroogim/sortByProductQuanAsc")
	@ResponseBody
	public String sortByProductQuanAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductQuanAsc());
	}

	@RequestMapping("Shidroogim/sortByProductQuanDesc")
	@ResponseBody
	public String sortByProductQuanDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductQuanDesc());
	}

	@RequestMapping("Shidroogim/sortByProductOnSaleQuanAsc")
	@ResponseBody
	public String sortByProductOnSaleQuanAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductOnSaleQuanAsc());
	}

	@RequestMapping("Shidroogim/sortByProductOnSaleQuanDesc")
	@ResponseBody
	public String sortByProductOnSaleQuanDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductOnSaleQuanDesc());
	}

	@RequestMapping("Shidroogim/sortByProductCostAsc")
	@ResponseBody
	public String sortByProductCostAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductCostAsc());
	}

	@RequestMapping("Shidroogim/sortByProductCostDesc")
	@ResponseBody
	public String sortByProductCostDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductCostDesc());
	}

	@RequestMapping("Shidroogim/sortByProductOnSaleCostAsc")
	@ResponseBody
	public String sortByProductOnSaleCostAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductOnSaleCostAsc());
	}

	@RequestMapping("Shidroogim/sortByProductOnSaleCostDesc")
	@ResponseBody
	public String sortByProductOnSaleCostDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductOnSaleCostDesc());
	}

	@RequestMapping("Shidroogim/sortByProductTotalCostAsc")
	@ResponseBody
	public String sortByProductTotalCostAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductTotalCostAsc());
	}

	@RequestMapping("Shidroogim/sortByProductTotalCostDesc")
	@ResponseBody
	public String sortByProductTotalCostDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductTotalCostDesc());
	}

	@RequestMapping("Shidroogim/sortByProductOnSaleTotalCostAsc")
	@ResponseBody
	public String sortByProductOnSaleTotalCostAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductOnSaleTotalCostAsc());
	}

	@RequestMapping("Shidroogim/sortByProductOnSaleTotalCostDesc")
	@ResponseBody
	public String sortByProductOnSaleTotalCostDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductOnSaleTotalCostDesc());
	}

	@RequestMapping("Shidroogim/sortByProductCombinedTotalCostAsc")
	@ResponseBody
	public String sortByProductCombinedTotalCostAsc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductCombinedTotalCostAsc());
	}

	@RequestMapping("Shidroogim/sortByProductCombinedTotalCostDesc")
	@ResponseBody
	public String sortByProductCombinedTotalCostDesc() {
		return ProductUtils.sendProductJsonList(pf.sortByProductCombinedTotalCostDesc());
	}

}
