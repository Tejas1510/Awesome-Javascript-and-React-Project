import React, { Component } from 'react';

class Navegacion extends Component {

    mostrarAnterior = () => {
        const {pagina} = this.props;

        if(pagina === 1 ) return null;

        return (
            <button onClick={this.props.paginaAnterior} className="btn btn-info mr-1">&larr; Anterior </button>
        )
    }

    mostrarSiguiente = () => {
        const {pagina, totalPaginas} = this.props;

        if(pagina === totalPaginas ) return null;

        return (
            <button onClick={this.props.paginaSiguiente} className="btn btn-info ">Siguiente &rarr;</button>
        )
    }

    render() {
        return (
            <div className="py-5">
                { this.mostrarAnterior() }
                { this.mostrarSiguiente() }
            </div>
        );
    }
}

export default Navegacion;