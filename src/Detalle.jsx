import { useEffect, useState } from 'react';
import './Detalle.css';

function DetallePelicula({ id, tipo, onVolver }) {
    const [detalles, setDetalles] = useState(null);
    const [actores, setActores] = useState([]);
    const API_KEY = "e82daa897c788373ebb584472c93e3dc";

    useEffect(() => {
        // 1. Obtener detalles completos
        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${API_KEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => setDetalles(data));

        // 2. Obtener actores (credits)
        fetch(`https://api.themoviedb.org/3/${tipo}/${id}/credits?api_key=${API_KEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => {
            if (data && data.cast) {
                setActores(data.cast.slice(0, 10)); // Tomamos los primeros 10 actores principales
            }
        });
    },[id, tipo]);

    if (!detalles) return <div className='loading'>Cargando información...</div>;

    return (
        <div className='detalle-container'>
            <button onClick={onVolver} className='btn-volver'>← Volver</button>

            <div className='detalle-header'>
                <img src={`https://image.tmdb.org/t/p/w500${detalles.poster_path}`} alt={detalles.title || detalles.name} />
                <div className='detalle-info'>
                    <h1>{detalles.title || detalles.name}</h1>
                    <p className='tagline'>{detalles.tagline}</p>
                    <p className='descripcion'>{detalles.overview}</p>

                    <div className='datos-extra'>
                        {tipo === 'movie' ? (
                            <>
                            {detalles.runtime && <span>⏱️ Duración: {detalles.runtime} minutos</span>}
                            {detalles.release_date && <span>📅 Año: {detalles.release_date?.split('-')[0]}</span>}
                            </>
                        ) : (
                          <>
                        
                        <span>📺 Temporadas: {detalles.number_of_seasons}</span>
                        <span>🎬 Episodios totales: {detalles.number_of_episodes}</span>
                    </>
                    )}
                    {detalles.vote_average && <span>⭐ Calificación: {detalles.vote_average?.toFixed(1)} / 10</span>}
                    </div>

                    <div className='actores-seccion'>
                        <h3>Reporte principal:</h3>
                        <div className='actores-grid'>
                            {actores.map(actor => (
                                <div key={actor.id} className='actor-card'>
                                    {actor.profile_path ? (
                                        <img
                                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                        alt={actor.name}
                                        className='actor-foto'
                                        />
                                    ) : (
                                        // Imagen por defecto si el actor no tiene foto en TMDB
                                        <div className='actor-foto-placeholder'>👤</div>
                                    )}
                                    <span className='actor-nombre'>{actor.name}</span>
                                  </div>  
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetallePelicula;