package com.shidroogim.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.json.JSONObject;

@Entity(name = "logins")
public class Login {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "login_id")
	private int loginId;
	@Column(name = "user_name")
	private String userName;
	@Column(name = "password")
	private String password;
	@Column(name = "login_token")
	private String loginToken;

	public Login() {

	}

	public Login(int loginId, String userName, String password, String loginToken) {
		super();
		this.loginId = loginId;
		this.userName = userName;
		this.password = password;
		this.loginToken = loginToken;
	}

	public int getLoginId() {
		return loginId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLoginToken() {
		return loginToken;
	}

	public void setLoginToken(String loginToken) {
		this.loginToken = loginToken;
	}

	public JSONObject toJSON() {
		JSONObject login = new JSONObject();

		login.put("loginToken", this.loginToken);

		return login;
	}
}
