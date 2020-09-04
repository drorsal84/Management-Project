package com.shidroogim.utils;

import java.util.List;

import org.json.JSONArray;

import com.shidroogim.entities.Product;
import com.shidroogim.enums.Category;

public interface ProductUtils {
	
	static void chooseCategory(Product product, String productCat) {

		if (productCat.equals(Category.CAM.toString())) {
			product.setProductCat(Category.CAM.getCatName());
		} else if (productCat.equals(Category.DVR.toString())) {
			product.setProductCat(Category.DVR.getCatName());
		} else if (productCat.equals(Category.DET.toString())) {
			product.setProductCat(Category.DET.getCatName());
		} else if (productCat.equals(Category.SIR.toString())) {
			product.setProductCat(Category.SIR.getCatName());
		} else if (productCat.equals(Category.KEY.toString())) {
			product.setProductCat(Category.KEY.getCatName());
		} else if (productCat.equals(Category.CON.toString())) {
			product.setProductCat(Category.CON.getCatName());
		} else if (productCat.equals(Category.INT.toString())) {
			product.setProductCat(Category.INT.getCatName());
		} else if (productCat.equals(Category.COD.toString())) {
			product.setProductCat(Category.COD.getCatName());
		} else if (productCat.equals(Category.BUT.toString())) {
			product.setProductCat(Category.BUT.getCatName());
		} else if (productCat.equals(Category.LOC.toString())) {
			product.setProductCat(Category.LOC.getCatName());
		} else if (productCat.equals(Category.BAT.toString())) {
			product.setProductCat(Category.BAT.getCatName());
		} else if (productCat.equals(Category.POW.toString())) {
			product.setProductCat(Category.POW.getCatName());
		} else {
			product.setProductCat(Category.ACC.getCatName());
		}
	}

	static String catFilterGetName(String productCat) {
		if (productCat.equals(Category.CAM.toString())) {
			return productCat = Category.CAM.getCatName();
		} else if (productCat.equals(Category.DVR.toString())) {
			return productCat = Category.DVR.getCatName();
		} else if (productCat.equals(Category.DET.toString())) {
			return productCat = Category.DET.getCatName();
		} else if (productCat.equals(Category.SIR.toString())) {
			return productCat = Category.SIR.getCatName();
		} else if (productCat.equals(Category.KEY.toString())) {
			return productCat = Category.KEY.getCatName();
		} else if (productCat.equals(Category.CON.toString())) {
			return productCat = Category.CON.getCatName();
		} else if (productCat.equals(Category.INT.toString())) {
			return productCat = Category.INT.getCatName();
		} else if (productCat.equals(Category.COD.toString())) {
			return productCat = Category.COD.getCatName();
		} else if (productCat.equals(Category.BUT.toString())) {
			return productCat = Category.BUT.getCatName();
		} else if (productCat.equals(Category.LOC.toString())) {
			return productCat = Category.LOC.getCatName();
		} else if (productCat.equals(Category.BAT.toString())) {
			return productCat = Category.BAT.getCatName();
		} else if (productCat.equals(Category.POW.toString())) {
			return productCat = Category.POW.getCatName();
		} else {
			return productCat = Category.ACC.getCatName();
		}
	}
	
	static List<Product> sortProductList(List<Product> productList) {
		if (productList.isEmpty()) {
			return null;
		} else {
			return productList;
		}
	}
	
	static String sendProductJsonList(List<Product> productsList) {
		JSONArray products = new JSONArray();
		for (Product product : productsList) {
			products.put(product.toJSON());
		}
		return products.toString();
	}

}
