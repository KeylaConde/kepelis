import React from 'react';
import logoKepelis from './assets/logo/Kepelis1sinFondo.png';
import './Navbar.css';

const Navbar = ({ onNavegar, seccionActual, onBuscar, busqueda, setBusqueda }) => {
    return (
        <nav className='navbar'>
            {/* Al hacer click en el logo, volvemos al inicio */}
            <div className='navbar-logo' onClick={() => onNavegar('home')}>
                <img src={logoKepelis} alt="Kepelis Logo" />
            </div>

            <div className='navbar-links'>
                <button
                    className={`nav-btn ${seccionActual === 'home' ? 'active' : ''}`}
                    onClick={() => onNavegar('home')}
                >
                   🎬 Películas 
                </button>

                {/* El botón de Trailers */}
                <button
                    className={`nav-btn ${seccionActual === 'trailers' ? 'active' : ''}`}
                    onClick={() => onNavegar('trailers')}
                    >
                       🍿 Trailers 
                </button>
            </div>

            <form onSubmit={onBuscar} className='search-form'>
                <input
                type='text'
                placeholder='Buscar película o serie...'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                />
                <button type='submit'>🔍</button>
            </form>
        </nav>
    );
};

export default Navbar;