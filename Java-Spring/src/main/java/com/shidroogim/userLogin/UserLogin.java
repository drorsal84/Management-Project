package com.shidroogim.userLogin;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.shidroogim.entities.Login;
import com.shidroogim.repositories.LoginRepository;

@Component
public class UserLogin {

	private final LoginRepository loginRepository;

	UserLogin(@Autowired ApplicationContext context) {
		loginRepository = context.getBean(LoginRepository.class);
	}

	@Transactional
	public Login loginVerification(String userName, String password) {

		if (loginRepository.findByUserNameAndPassword(userName, password).isPresent()) {
			String token = UUID.randomUUID().toString();
			loginRepository.findByUserNameAndPassword(userName, password).get().setLoginToken(token);
			loginRepository.save(loginRepository.findByUserNameAndPassword(userName, password).get());
			return loginRepository.findByUserNameAndPassword(userName, password).get();
		} else {
			return null;
		}
	}
	
	public Login getToken(){
		return loginRepository.findById(1).get();
	}

	public void logout(String loginToken) {
		loginRepository.findByLoginToken(loginToken).get().setLoginToken(null);
		loginRepository.save(loginRepository.findByLoginToken(loginToken).get());
	}

}
