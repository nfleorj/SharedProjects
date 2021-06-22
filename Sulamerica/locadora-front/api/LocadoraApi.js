import axios from 'axios';

const LocadoraApi = {


    validaLogin: async (email, nome) => {
        const response = await axios.get('http://localhost:8081/usuario/autentica', { params: {email, nome}});
        const usuario = await response.data;
        return usuario;
    },

    listVeiculos: async () => {        
        const response = await axios.get('http://localhost:8081/veiculos/todos');
        const listVeiculos = await response.data;
        return listVeiculos;
    },

    persistirReserva: async (reserva) => {
        axios.post('http://localhost:8081/veiculos/reserva', reserva)
        .then(response => this.setState({ usuario: response.data }))
        .catch(() => {console.log('Error retrieving data')
        })
    },
}


export default LocadoraApi;