package weedhub.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import weedhub.models.User;

public interface UserRepository<T extends User> extends CrudRepository<T, Integer> {
	
	@Query("SELECT user FROM #{#entityName} as user WHERE user.username=:username AND user.password=:password")
	public T findUserByCredentials(@Param("username") String username, @Param("password") String password);
	
	@Query("SELECT user FROM #{#entityName} as user WHERE user.username=:username")
	public T findUserByUsername(@Param("username") String username);
}
