import React, { Component } from 'react'
import Header from './header/Header';
import TabListaVaiculos from './tabs/TabListaVaiculos';
import TabReservaVeiculo from './tabs/TabReservaVeiculo';
import LocadoraApi from './api/LocadoraApi';

const EMPTY_RESERVA = {
    idVeiculo: '',
    idUsuario: '',
    dataInicioReserva: '',
    dataFimReserva: ''
}

const EMPTY_USUARIO = {
    nome: '',
    email: '',
    bloqueio: ''
}
const INITIAL_STATE = {
    reserva: EMPTY_RESERVA,
    mensagem: '',
    showLogin: true,    
    showListaVeiculos: false,
    showEfetuaReserva: false,
    selectedTab: 1,
    listVeiculos: [],
    veiculo: '',
    messages: '',
    usuario: EMPTY_USUARIO,
}

class index extends Component {

    constructor(props) {
	    super(props);
	    this.state = INITIAL_STATE        
	}

    componentDidMount(){
        this.listVeiculos()    
    }

    validaLogin(){
        let nome = document.getElementById('nome').value
        let email = document.getElementById('email').value
        LocadoraApi.validaLogin(email, nome)
            .then((data) => {this.setState({ usuario: data, showListaVeiculos: true, showLogin: false })})
            .catch((error) => this.setState({messages: error.response.data}))
    }

    listVeiculos(){
        LocadoraApi.listVeiculos()
            .then((listVeiculos) => {this.setState({ listVeiculos })})
            .catch((error) => this.setState({messages: error.response.data}))
    }

    fazerReserva(data){
        this.setState({veiculo: data, showListaVeiculos: false, showEfetuaReserva: true})
    }

    listarVeiculos(){
        this.setState({showListaVeiculos: true, showEfetuaReserva: false, mensagem: ''})
    }
    
    limpaMensagens(){
        this.setState({mensagem: ''})
    }

    concluirReserva(dataInicio, dataFim){
        
        let erro = 0
        let bloqueioUsuario = this.state.usuario.bloqueio
        let bloqueioVeiculo = this.state.veiculo.bloqueio

        let inicio = dataInicio.split("/");
        let auxInicio = new Date(inicio[2], inicio[1] - 1, inicio[0]);
    
        let fim = dataFim.split("/");
        let auxFim = new Date(fim[2], fim[1] - 1, fim[0]);
        
        let diasResevados = ((auxFim - auxInicio) / 3600000)/24

        let auxInicioFormatada = ((this.adZero(auxInicio.getDate())+ "/" + this.adZero((auxInicio.getMonth() + 1)) + "/" + auxInicio.getFullYear() )) ;
        let auxFimFormatada = ((this.adZero(auxFim.getDate())+ "/" + this.adZero((auxFim.getMonth() + 1)) + "/" + auxFim.getFullYear() )) ;


        // regra dos 30 dias
        if(diasResevados > 30){
            this.setState({mensagem: 'O prazo máximo de locação é de 30 dias seguidos'})
            erro = 1
        }
        
        // regra das datas inicil e final
        if(auxInicio > auxFim){
            this.setState({mensagem: 'Data final não pode ser anterior à data inicial'})
            erro = 1
        }
        
        // verifica de há bloqueios de usuário
        if(bloqueioUsuario){
            bloqueioVeiculo.map(bloqueio => {

                let inicioBloqueioUsuario = bloqueio.inicio
                let fimBloqueioUsuario = bloqueio.fim
    
                if(auxInicio > inicioBloqueioUsuario && auxInicio < fimBloqueioUsuario){
                    this.setState({mensagem: `Usuário com bloquei para essas datas: ${auxInicioFormatada} e ${auxFimFormatada}`})                
                    erro = 1
                }
    
                if(auxFim < fimBloqueioUsuario && auxFim > inicioBloqueioUsuario){
                    this.setState({mensagem: `Usuário com bloquei para essas datas: ${auxInicioFormatada} e ${auxFimFormatada}`})
                    erro = 1
                }
    
                if(auxInicio < inicioBloqueioUsuario && auxFim > fimBloqueioUsuario){
                    this.setState({mensagem: `Usuário com bloquei para essas datas: ${auxInicioFormatada} e ${auxFimFormatada}`})
                    erro = 1
                }    
            })            
        }

        // verifica de há bloqueios de de veiculo
        if(bloqueioVeiculo){
            bloqueioVeiculo.map(bloqueio => {

                let inicioBloqueioVeiculo = new Date(bloqueio.inicio)
                let fimBloqueioVeiculo = new Date(bloqueio.fim) 
    
                if(auxInicio > inicioBloqueioVeiculo && auxInicio < fimBloqueioVeiculo){
                    this.setState({mensagem: `Veículo bloqueado nessas datas: ${auxInicioFormatada} e ${auxFimFormatada}`})                
                    erro = 1
                }
    
                if(auxFim < fimBloqueioVeiculo && auxFim > inicioBloqueioVeiculo){
                    this.setState({mensagem: `Veículo bloqueado nessas datas: ${auxInicioFormatada} e ${auxFimFormatada}`})
                    erro = 1
                }
    
                if(auxInicio < inicioBloqueioVeiculo && auxFim > fimBloqueioVeiculo){
                    this.setState({mensagem: `Veículo bloqueado nessas datas: ${auxInicioFormatada} e ${auxFimFormatada}`})
                    erro = 1
                }    
            })
        }

        

        if(erro === 0){
            this.state.reserva.idVeiculo = this.state.veiculo.id
            this.state.reserva.idUsuario = this.state.usuario.email
            this.state.reserva.dataInicioReserva = auxInicio
            this.state.reserva.dataFimReserva = auxFim
            this.persistirReserva()
        }
        
    }

    adZero(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    }

    persistirReserva() {
        LocadoraApi.persistirReserva(this.state.reserva)
            .then((data) => {this.setState({ mensagem: 'Reserva feita com sucesso', showListaVeiculos: false, showEfetuaReserva: false,})})
            .catch((error) => this.setState({messages: error.response.data}))
    }

    logout(){            
        // this.setState({INITIAL_STATE})
        this.setState({showLogin: true, showListaVeiculos: false, showEfetuaReserva: false})
    }

    render() {
        return(
            <div>
                {
                    this.state.showLogin ? (
                        <div>
                            <div className="div_login">
                                <div className="titulo1">LOCADORA</div>
                                <div className="titulo2"><b>TELA DE LOGIN</b></div>
                                <div className="elementos_login">
                                    {'Nome: '}
                                    <input type='text' id='nome'/>
                                </div>
                                <div>
                                    {'E-mail: '}
                                    <input type='text' id='email'/>
                                </div>
                                <br/>
                                <div>
                                    <input type='button' className="botoes" value='Login' onClick={this.validaLogin.bind(this)}/>
                                </div>
                            </div>
                        </div>
                    ) : (<div>
                            <Header
                                logout={this.logout.bind(this)}
                                mensagem={this.state.mensagem}
                                usuario={this.state.usuario}/>
                        </div>)
                }

                {
                    this.state.showListaVeiculos ? (
                        <TabListaVaiculos
                        fazerReserva={this.fazerReserva.bind(this)}
                        listVeiculos={this.state.listVeiculos}
                    />
                    ) : (<div></div>)

                }

                {
                    this.state.showEfetuaReserva ? (
                    <TabReservaVeiculo
                        veiculo={this.state.veiculo}
                        concluirReserva={this.concluirReserva.bind(this)}
                        listarVeiculos={this.listarVeiculos.bind(this)}
                        limpaMensagens={this.limpaMensagens.bind(this)}
                        />
                    ) : (<div></div>)
                }            
            </div>
        )
    }
}
export default index;