package weedhub.repositories;

import org.springframework.data.repository.CrudRepository;

import weedhub.models.Product;

public interface ProductRepository<T extends Product> extends CrudRepository<T, Integer> {

}
