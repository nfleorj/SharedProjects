import React, { Component } from 'react'
import '../css/locadora.css';
import Gol from '../img/vw_gol.png'
import Passat from '../img/vw_passat.png'
import Uno from '../img/fiat_uno.png'
import Doblo from '../img/fiat_doblo.png'

class TabListaVaiculos extends Component {


    componentDidMount(){
    }

    fazerReserva(data){
        this.props.fazerReserva(data.listVeiculos);
    }

    exibeImagem(modelo){
        console.log(modelo)
        if(modelo == 'Gol'){
            return Gol
        }else if(modelo == 'Passat'){
            return Passat
        }else if(modelo == 'Uno'){
            return Uno
        }else{
            return Doblo
        }
    }

    render() {

        return(
            <div className="div_interna">
                <div className="titulo2"><b>{'ESCOLHER O VEICULO'}</b></div>
                {this.props.listVeiculos.map(listVeiculos => 
                    {
                        return(
                            <div className="div">
                                <div>                                
                                    <img src={this.exibeImagem(listVeiculos.modelo)}/><br/>
                                    {/*<img src={`../img/${listVeiculos.imagem}`}/><br/>*/}
                                    Marca: {listVeiculos.marca}<br/>
                                    Modelo: {listVeiculos.modelo}<br/>
                                    Ano: {listVeiculos.ano}<br/>
                                    Cor: {listVeiculos.cor}<br/>
                                    <input type="button" value="Selecionar esse modelo" onClick={() => this.fazerReserva({listVeiculos})}/>
                                </div>
                            </div>
                        )
                    }
                    
                    )}                
                </div>
        )
    }
}
export default TabListaVaiculos;