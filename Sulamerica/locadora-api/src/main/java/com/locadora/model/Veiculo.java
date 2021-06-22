package com.locadora.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class Veiculo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private Long ano;
	private String cor;
	private String imagem;
	private Long km;
	private String marca;
	private String modelo;
	private List<Map<String, Date>> bloqueio;

}
