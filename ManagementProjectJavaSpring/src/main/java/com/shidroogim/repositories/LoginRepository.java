package com.shidroogim.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.shidroogim.entities.Login;

public interface LoginRepository extends CrudRepository<Login, Integer>{
	
	Optional<Login> findByUserNameAndPassword (String userName, String password);
	Optional<Login> findByLoginToken (String loginToken);

}
