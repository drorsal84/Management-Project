package com.shidroogim.utils;

import java.util.List;

import org.json.JSONArray;

import com.shidroogim.entities.Offer;
import com.shidroogim.entities.OfferProducts;
import com.shidroogim.entities.Product;

public interface OfferUtils {

	static List<Offer> returnOffersList(List<Offer> offerList) {
		if (offerList.isEmpty()) {
			return null;
		} else {
			return offerList;
		}
	}
	
	static List<OfferProducts> returnOfferProductsList(List<OfferProducts> offerProductsList) {
		if (offerProductsList.isEmpty()) {
			return null;
		} else {
			return offerProductsList;
		}
	}
	
	static String sendOffersJsonList(List<Offer> offersList) {
		JSONArray offers = new JSONArray();
		for (Offer offer : offersList) {
			offers.put(offer.toJSON());
		}
		return offers.toString();
	}
	
	static String sendOfferProductsJsonList(List<OfferProducts> offerProductsList) {
		JSONArray offerProducts = new JSONArray();
		for (OfferProducts offerProduct : offerProductsList) {
			offerProducts.put(offerProduct.toJSON());
		}
		return offerProducts.toString();
	}
	
	static void offerCheckerSetter(Offer offer, final String offerCustAddress, final String offerDescription,
			final String offerOrigin, final String offerType, final String offerRemarks, final String offerReceived) {
		
		if (offerCustAddress.equals("") || offerCustAddress.equals(null)) {
			offer.setOfferCustAddress("-");
		} else {
			offer.setOfferCustAddress(offerCustAddress);
		}
		if (offerDescription.equals("") || offerDescription.equals(null)) {
			offer.setOfferDescription("-");
		} else {
			offer.setOfferDescription(offerDescription);
		}
		if (offerOrigin.equals("") || offerOrigin.equals(null)) {
			offer.setOfferOrigin("-");
		} else {
			offer.setOfferOrigin(offerOrigin);
		}
		if (offerType.equals("") || offerType.equals(null)) {
			offer.setOfferType("-");
		} else {
			offer.setOfferType(offerType);
		}
		if (offerRemarks.equals("") || offerRemarks.equals(null)) {
			offer.setOfferRemarks("-");
		} else {
			offer.setOfferRemarks(offerRemarks);
		}
		if (offerReceived.equals("") || offerReceived.equals(null)) {
			offer.setOfferReceived("-");
		} else {
			offer.setOfferReceived(offerReceived);		
			}	
	}
	
	static void createOfferProdcut(OfferProducts offerProduct, final int offerProductId, final int offerProductNumber, final String offerProductName,
			final int offerProductQuantity, final double offerProductCost, final double offerProductSubtotal) {
		offerProduct.setOfferProductId(offerProductId);
		offerProduct.setOfferProductNumber(offerProductNumber);
		offerProduct.setOfferProductName(offerProductName);
		offerProduct.setOfferProductQuantity(offerProductQuantity);
		offerProduct.setOfferProductCost(offerProductCost);
		offerProduct.setOfferProductSubtotal(offerProductSubtotal);
	}
	
	static void createActiveOfferProdcut(OfferProducts offerProduct, final int oId, final int offerProductId, final int offerProductNumber, final String offerProductName,
			final int offerProductQuantity, final double offerProductCost, final double offerProductSubtotal) {
		offerProduct.setoId(oId);
		offerProduct.setOfferProductId(offerProductId);
		offerProduct.setOfferProductNumber(offerProductNumber);
		offerProduct.setOfferProductName(offerProductName);
		offerProduct.setOfferProductQuantity(offerProductQuantity);
		offerProduct.setOfferProductCost(offerProductCost);
		offerProduct.setOfferProductSubtotal(offerProductSubtotal);
	}
	
	static void setOfferProductMissing(Product product, OfferProducts offerProduct, int offerProductMissing,
			int howManyInStock) {
		if (product.getProductQuan() + product.getProductOnSaleQuan() - offerProduct.getOfferProductQuantity() <= 0) {
			offerProductMissing = product.getProductQuan() + product.getProductOnSaleQuan()
					- offerProduct.getOfferProductQuantity();
			offerProductMissing = offerProductMissing * -1;
			offerProduct.setOfferProductMissing(" חסרים " + offerProductMissing + " מוצרים  במלאי ");
		} else {
			howManyInStock = product.getProductQuan() + product.getProductOnSaleQuan() - offerProduct.getOfferProductQuantity();
			offerProduct.setOfferProductMissing(" ישנם עוד " + howManyInStock + " מוצרים  במלאי ");
		}
	}
}
