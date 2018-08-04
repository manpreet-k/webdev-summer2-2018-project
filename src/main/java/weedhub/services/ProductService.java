package weedhub.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import weedhub.models.Product;
import weedhub.repositories.ProductRepository;

@RestController
public class ProductService {
	
	@Autowired
	ProductRepository<Product> productRepository;
	
	@GetMapping("/api/product")
	public List<Product> findAllProducts() {
		return (List<Product>) productRepository.findAll();
	}
	
	@PostMapping("/api/product")
	public Product addProduct(@RequestBody Product product) {
		return productRepository.save(product);
	}
	
	@PutMapping("/api/product/{pId}")
	public Product updateProduct(@PathVariable("pId") int pId, 
			@RequestBody Product product) {
		Optional<Product> productData = productRepository.findById(pId);
		if (productData.isPresent()) {
			return productRepository.save(product);
		} else {
			return null;
		}
	}
	
	@DeleteMapping("/api/product/{pId}")
	public void deleteProduct(@PathVariable("pId") int pId) {
		productRepository.deleteById(pId);
	}

}
