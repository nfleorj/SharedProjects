package com.locadora.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.locadora.model.Reserva;
import com.locadora.model.Veiculo;
import com.locadora.repository.VeiculoRepository;

@Service
public class VeiculoService {
	
	@Autowired
	private VeiculoRepository repository;
	
	
	/**
	 * Delega ao repository a recupração de veiculos da lista 
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public List<Veiculo> recuperarVeiculos() throws InterruptedException, ExecutionException {
		//TODO CONVERTER TIMESTAMP DO BANCO PARA DATEFORMAT
		return repository.recuperarVeiculos();
	}
	
	
	public void criarBloqueio(Reserva reserva) throws InterruptedException, ExecutionException {
		repository.persistirVeiculo(reserva);
	}
}
