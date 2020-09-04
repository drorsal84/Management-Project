package com.shidroogim.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shidroogim.entities.Login;
import com.shidroogim.userLogin.UserLogin;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class LoginController {
	
	private final UserLogin ul;

	private LoginController(@Autowired ApplicationContext context) {
		ul = context.getBean(UserLogin.class);
	}

	public Login exception() {
		return null;
	}

	@RequestMapping("Shidroogim/loginCheck")
	@ResponseBody
	public String loginCheck(@RequestParam String userName, @RequestParam String password) {
		if (userName.equalsIgnoreCase("") || password.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return ul.loginVerification(userName, password).toJSON().toString();
		}
	}
	
	@RequestMapping("Shidroogim/getToken")
	@ResponseBody
	public String getToken() {
		return ul.getToken().toJSON().toString();
	}

	@RequestMapping("Shidroogim/userLogout")
	@ResponseBody
	public void userLogout(@RequestParam String loginToken) {
		ul.logout(loginToken);
	}

}
