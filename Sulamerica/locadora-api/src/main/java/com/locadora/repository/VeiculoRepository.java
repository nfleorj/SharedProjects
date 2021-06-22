package com.locadora.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.locadora.model.Reserva;
import com.locadora.model.Veiculo;

@Repository
public class VeiculoRepository {
	
	@Autowired
	private Firestore firestore;
	
	private final String NOME_COLECAO = "veiculos";
	
	/**
	 * Recupera todos os veículos da lista
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public List<Veiculo> recuperarVeiculos() throws InterruptedException, ExecutionException {
		
		List<Veiculo> listVeiculos = new ArrayList<>();
		
		ApiFuture<QuerySnapshot> all = firestore.collection(NOME_COLECAO).get();
		List<QueryDocumentSnapshot> documents = all.get().getDocuments();
		
		for (QueryDocumentSnapshot allDocument : documents) {
			Veiculo veiculo = allDocument.toObject(Veiculo.class);
			veiculo.setId(allDocument.getId());
			listVeiculos.add(veiculo);
		}
		
		return listVeiculos;		
	}
	
	
	/**
	 * Insere bloqueios de usuário
	 * @param reserva
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public void persistirVeiculo(Reserva reserva) throws InterruptedException, ExecutionException {
		
		CollectionReference usuarios = firestore.collection(NOME_COLECAO);
		List<ApiFuture<WriteResult>> futures = new ArrayList<>();
		
		Map<String, Date> bloqueio = new HashMap<>();
		bloqueio.put("inicio", reserva.getDataInicioReserva());
		bloqueio.put("fim", reserva.getDataInicioReserva());
		
		Map<String, Map<String, Date>> map = new HashMap<>();
		map.put("bloqueio", bloqueio);
		
		futures.add(usuarios.document(reserva.getIdVeiculo()).set(map, SetOptions.merge()));
	}


}
