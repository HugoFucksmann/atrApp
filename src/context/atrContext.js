import React, { createContext, Component } from 'react';
import Swal from 'sweetalert2';

export const AtrContext = createContext();

class AtrProvider extends Component {
	state = {
		Auth: false,
		usuario: {},
		personas: [],
		toogle: false,
	};

	setToogle = () => {
		this.setState({ toogle: !this.state.toogle });
	};

	handlerAtr = (action, persona) => {
		switch (action) {
			case 'crear':
				let newUserAtr = this.state.personas;
				newUserAtr.push(persona);
				this.setState({ personas: newUserAtr });
				return Swal.fire('Persona cargada con exito!', '', 'success');
				break;
			case 'editar':
				let updatepersonas = this.state.personas;
				updatepersonas = updatepersonas.map((person, index) => {
					if (person._id === persona._id)
						return (updatepersonas[index] = persona);
				});
				this.setState({ personas: updatepersonas });
				return Swal.fire('Persona editada con exito!', '', 'success');
				break;
			case 'eliminar':
				let personaEliminada = this.state.personas;
				personaEliminada = personaEliminada.map((person, index) => {
					if (person._id === persona._id)
						return personaEliminada.splice(index, 1);
				});
				this.setState({ personas: personaEliminada });
				return Swal.fire('Persona eliminada con exito!', '', 'success');
				break;
			default:
				break;
		}
	};

	setUsuario = (usuario) => this.setState({ usuario: usuario });
	setPersona = (persona) => this.setState({ persona: persona });

	render() {
		this.state.personas = this.props.personas;
		return (
			<AtrContext.Provider
				value={{
					...this.state,
					setToogle: this.setToogle,
					setUsuario: this.setUsuario,
					setPersona: this.setPersona,
					handlerAtr: this.handlerAtr,
				}}
			>
				{this.props.children}
			</AtrContext.Provider>
		);
	}
}

export default AtrProvider;
