package com.locadora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.locadora.model.Reserva;
import com.locadora.service.UsuarioService;
import com.locadora.service.VeiculoService;

@RestController
public class ReservaController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private VeiculoService veiculoService;
	

	@RequestMapping(value = "/reserva/reserva", method = RequestMethod.PUT)
	public void persisteReserva (Reserva reserva) 
					throws Exception {
		usuarioService.criarBloqueio(reserva);
		veiculoService.criarBloqueio(reserva);				
	}

}
