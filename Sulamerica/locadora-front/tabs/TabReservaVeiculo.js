import React, { Component } from 'react'
import gol from '../img/vw_gol.png'

class TabReservaVeiculo extends Component {

    concluirReserva(){
        let dataInicio = document.getElementById('dataInicio').value
        let dataFim = document.getElementById('dataFim').value
        this.props.concluirReserva(dataInicio, dataFim)
    }

    escolherVeiculo(){
        this.props.escolherVeiculo()
    }

    listarVeiculos(){
        this.props.listarVeiculos()
    }

    limpaMensagens(){
        this.props.limpaMensagens()
    }

    render() {
        return(
            <div className="div_interna">
                <div className="titulo2"><b>{'RESERVAR VEICULO'}</b></div>
                <div><img src={gol}/></div>
                <div>{'Marca:'} {this.props.veiculo.marca}<br/></div>
                <div>{'Modelo:'} {this.props.veiculo.modelo}<br/></div>
                <div>{'Ano:'} {this.props.veiculo.ano}<br/></div>
                <div>{'Cor:'} {this.props.veiculo.cor}<br/></div>
                <div>{'Km:'} {this.props.veiculo.km}<br/></div>
                <div className="div3">
                    {'Inicio:'} <input type="text" id="dataInicio" onClick={() => this.limpaMensagens()}/>
                    {'Fim:'} <input type="text" id="dataFim" onClick={() => this.limpaMensagens()}/>
                </div>                
                <div className="div3">
                    <input type="button" className="botoes" value="Concluir Reserva"  onClick={() => this.concluirReserva()}/>
                    <input type="button" className="botoes" value="Voltar"  onClick={() => this.listarVeiculos()}/>
                </div>
            </div>
        )
    }
}
export default TabReservaVeiculo;