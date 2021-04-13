import React, { createContext, Component } from 'react'

export const AtrContext = createContext();

class AtrProvider extends Component {

    state = {
       Auth: false,
       usuario: {},
       persona: [],
       toogle: false
    }

    setToogle = () => {
        this.setState({toogle: !this.state.toogle});
    }

    setUsuario = (usuario) => this.setState({usuario: usuario})
    setPersona = (persona) => this.setState({persona: persona})
    
    

    render(){
       
        return (
            <AtrContext.Provider value={{...this.state, setToogle: this.setToogle, setUsuario: this.setUsuario, setPersona: this.setPersona }} >
                { this.props.children }
            </AtrContext.Provider>
        )
    }
}

export default AtrProvider;