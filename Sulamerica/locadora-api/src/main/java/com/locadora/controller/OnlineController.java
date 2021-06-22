package com.locadora.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OnlineController {
	
	@RequestMapping(value = "/teste", method = RequestMethod.GET)
	public String teste() throws Exception {
		return "Olá, estou online";
	}
}
