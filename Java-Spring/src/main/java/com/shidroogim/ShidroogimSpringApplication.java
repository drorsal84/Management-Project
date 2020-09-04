package com.shidroogim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class ShidroogimSpringApplication {
	

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(ShidroogimSpringApplication.class, args);
	
		System.out.println("\n");
		System.out.println("***Server connected***");	
	}
	
	
	
		

}
