package weedhub.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonRootName;

@Entity
public class Producer extends User {
	private String inventory;
	
	public Producer() {
		setInventory("");
	}

	public String getInventory() {
		return inventory;
	}
	public void setInventory(String inventory) {
		this.inventory = inventory;
	}

}
