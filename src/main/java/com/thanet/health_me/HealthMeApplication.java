package com.thanet.health_me;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;



@SpringBootApplication
public class HealthMeApplication {

	@Value("${jwt.secret}")
    private String secret;

    @PostConstruct
    public void printSecret() {
        System.out.println("JWT SECRET = " + secret);
    }

	public static void main(String[] args) {
		SpringApplication.run(HealthMeApplication.class, args);
	}

}
