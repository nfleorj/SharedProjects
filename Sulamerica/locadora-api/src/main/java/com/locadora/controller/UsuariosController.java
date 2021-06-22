package com.locadora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.locadora.model.Usuario;
import com.locadora.service.UsuarioService;

@RestController
public class UsuariosController {
	
	@Autowired
	private UsuarioService service;
	
	@RequestMapping(value = "/usuario/autentica", method = RequestMethod.GET)
	public ResponseEntity<Usuario> autenticarUsuario (
			@RequestParam String email,
			@RequestParam String nome) 
					throws Exception {
		
		Usuario usuario = service.autenticarUsuario(nome, email); 
		
		return ResponseEntity.ok(usuario); 
				
	}

}
