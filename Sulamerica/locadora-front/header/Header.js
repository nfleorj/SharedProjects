import React, { Component } from 'react'

class Header extends Component {

    logout(){
        this.props.logout()
    }

    render() {
        return(
            <div>
                <div className="div_interna">
                {
                    this.props.usuario.nome ? (
                        <div>
                            <div className="div2">{this.props.usuario.nome}</div>
                            <div className="div2">
                                <input type='button' className="botoes" value='Logout' onClick={this.logout.bind(this)}/>                                
                            </div>
                            <div className="mensagem">{this.props.mensagem}</div>
                        </div>
                    ) : (
                        <div></div>
                    )
                }
                </div>
            </div>
        )
    }
}
export default Header;