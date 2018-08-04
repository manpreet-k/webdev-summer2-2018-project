package weedhub.models;

import javax.persistence.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonRootName;

@Entity
public class Buyer extends User {
	private String shoppingCart;
	
	public Buyer() {
		setShoppingCart("");
	}

	public String getShoppingCart() {
		return shoppingCart;
	}
	public void setShoppingCart(String shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
}
