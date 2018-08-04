package weedhub.models;

import javax.persistence.*;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private int productId;
	private double price;
	private double inventory;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getInventory() {
		return inventory;
	}
	public void setInventory(double inventory) {
		this.inventory = inventory;
	}
}
