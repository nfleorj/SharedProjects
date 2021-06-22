package com.locadora.model;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public class Reserva implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String idVeiculo;
	private String idUsuario;
	private Date dataInicioReserva;
	private Date dataFimReserva;	

}
