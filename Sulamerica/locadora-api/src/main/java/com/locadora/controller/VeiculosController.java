package com.locadora.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.locadora.model.Veiculo;
import com.locadora.service.VeiculoService;

@RestController
public class VeiculosController {
	
	@Autowired
	private VeiculoService service;
	
	@RequestMapping(value = "/veiculos/todos", method = RequestMethod.GET)
	public List<Veiculo> recuperarVeiculos() throws Exception {
		return service.recuperarVeiculos();
	}

}
