package com.locadora.service;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.locadora.model.Reserva;
import com.locadora.model.Usuario;
import com.locadora.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repository;
	
	
	/**
	 * Faz as devidas validações de usuário de acordo com as regras definidas
	 * @param nome
	 * @param email
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public Usuario autenticarUsuario(String nome, String email) throws InterruptedException, ExecutionException {
		String msgErro = validaCampos(nome, email);
		if(msgErro.isEmpty()) {
			Usuario usuarioCadastrado = repository.consultarUsuarioPorEmail(email);
			if(email.equals(usuarioCadastrado.getEmail())) {
				if(!nome.equals(usuarioCadastrado.getNome())) {
					repository.persistirUsuario(email, nome, false);
					// "Nome alterado com sucesso. ";
				}
			}else {
				repository.persistirUsuario(email, nome, true);
				// "Novo usuário criado com sucesso. ";
			}			
		}	
		return repository.consultarUsuarioPorEmail(email);
	}
	

	public void criarBloqueio(Reserva reserva) throws InterruptedException, ExecutionException {
		repository.persistirUsuario(reserva);
	}
	
	
	
	/**
	 * Valida login
	 * @param nome
	 * @param email
	 * @return
	 */
	private String validaCampos(String nome, String email) {
		
		String msgErro = "";
		
		// os dois campos não podem ser vazios
		if((null == nome && "".equals(nome)) ||  (null == email && "".equals(email))){
			msgErro = "Os campos Nome e E-mail devem ser preenchidos. \n ";
		}
		// os dois campos devem ter ao menos 3 caracteres
		if((nome.trim().length() < 3 && email.trim().length() < 3)){
			msgErro += "Os campos Nome e E-mail devem ter ao menos 3 caracteres. \n";
		}
		// validação de formato de email
		if(!email.contains("@") && !email.contains(".")) {
			msgErro += "O endereço de e-mail é inválido. \n";
		}		
		return msgErro;
	}
}
