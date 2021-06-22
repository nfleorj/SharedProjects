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
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.locadora.model.Reserva;
import com.locadora.model.Usuario;

@Repository
public class UsuarioRepository {
	
	@Autowired
	private Firestore firestore;
	
	private final String NOME_COLECAO = "usuarios";
	
	/**
	 * Consulta de usuário por e-mail
	 * @param email
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public Usuario consultarUsuarioPorEmail(String email) throws InterruptedException, ExecutionException {
		
		Usuario usuario = new Usuario();
		
		DocumentReference docRef = firestore.collection(NOME_COLECAO).document(email);
		ApiFuture<DocumentSnapshot> future = docRef.get();
		DocumentSnapshot ds = future.get();
		
		if (ds.exists()) {
			usuario = ds.toObject(Usuario.class);
			usuario.setEmail(ds.getId());
		}		
		
		return usuario;
	}

	
	/**
	 * Cria ou altera usuário
	 * @param email
	 * @param nome
	 * @param novoUsuario
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public Usuario persistirUsuario(String email, String nome, Boolean novoUsuario) throws InterruptedException, ExecutionException {
		
		CollectionReference usuarios = firestore.collection(NOME_COLECAO);
		List<ApiFuture<WriteResult>> futures = new ArrayList<>();
		
		Map<String, String> map = new HashMap<>();
		map.put("nome", nome);
		
		if(novoUsuario) {
			futures.add(usuarios.document(email).set(map));
		}else {
			futures.add(usuarios.document(email).set(map, SetOptions.merge()));
		}

		return consultarUsuarioPorEmail(email);
	}
	

	
	/**
	 * Insere bloqueios de usuário
	 * @param reserva
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public void persistirUsuario(Reserva reserva) throws InterruptedException, ExecutionException {
		
		CollectionReference usuarios = firestore.collection(NOME_COLECAO);
		List<ApiFuture<WriteResult>> futures = new ArrayList<>();
		
		Map<String, Date> bloqueio = new HashMap<>();
		bloqueio.put("inicio", reserva.getDataInicioReserva());
		bloqueio.put("fim", reserva.getDataInicioReserva());
		
		Map<String, Map<String, Date>> map = new HashMap<>();
		map.put("bloqueio", bloqueio);
		
		futures.add(usuarios.document(reserva.getIdUsuario()).set(map, SetOptions.merge()));
	}
}
