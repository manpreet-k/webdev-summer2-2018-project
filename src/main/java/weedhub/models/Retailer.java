package weedhub.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonRootName;

@Entity
public class Retailer extends User {
	private String shoppingCart;
	private String inventory;
	
	public Retailer() {
		setShoppingCart("");
		setInventory("");
	}

	public String getShoppingCart() {
		return shoppingCart;
	}
	public void setShoppingCart(String shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
	public String getInventory() {
		return inventory;
	}
	public void setInventory(String inventory) {
		this.inventory = inventory;
	}
}
