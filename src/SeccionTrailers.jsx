import React, {useState, useEffect } from 'react';
import './SeccionTrailers.css';

const SeccionTrailers = ({ peliculas, tipo }) => {
    const [videoKey, setVideoKey] = useState(null);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

    // Selecionamos la primera película por defecto cuando cambian los datos
    useEffect(() => {
        if (peliculas && peliculas.length > 0) {
            setPeliculaSeleccionada(peliculas[0]);
        }
    }, [peliculas]);

    //Buscamos el trailer de la pelicula seleccionada en la API de TMDB
    useEffect(() => {
        const obtenerTrailer = async () => {
            if (!peliculaSeleccionada || !tipo) return;

            try {
                const apiKey = 'e82daa897c788373ebb584472c93e3dc';
                const url = `https://api.themoviedb.org/3/${tipo}/${peliculaSeleccionada.id}/videos?api_key=${apiKey}&language=es-ES`;

                const res = await fetch(url);
                const data = await res.json();

                if (data.results && data.results.length > 0) {
                    // 1. Intentamos buscar un "Trailer" oficial en YouTube
                    let videoEncontrado = data.results.find(
                        (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
                    );

                    // 2. Si no hay "Trailer", buscamos un "Teaser"
                    if (!videoEncontrado) {
                        videoEncontrado = data.results.find(
                        (vid) => vid.site === 'YouTube' && vid.type === 'Teaser'
                        );
                    }

                    // 3. Si a'un no hay, agarramos el primer video disponible de YouTube que haya
                    if (!videoEncontrado) {
                        videoEncontrado = data.results.find(
                            (vid) => vid.site === 'YouTube'
                        );
                    }
                
                    if (videoEncontrado) {
                    setVideoKey(videoEncontrado.key);
                    } else {
                        setVideoKey(null);
                    }
                } else {
                    setVideoKey(null);
                }
            } catch (error) {
                console.error('Error cargando el tráiler:', error);
                setVideoKey(null);
            }
        };

        obtenerTrailer();
    }, [peliculaSeleccionada, tipo]);

    if (!peliculaSeleccionada) return null;

    return (
        <div className='seccion-trailers'>
            <h2>Tráilers Oficiales y Avances</h2>

            {/* Reproductor Principal */}
            <div className='trailer-player-container'>
                {videoKey ? (
                    <iframe
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&controls=1&modestbranding=1&rel=0`}
                    title='Trailer de la película'
                    frameBorder="0"
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '12px'
                    }}
                    />
                ) : (
                    <div className='trailer-no-disponible'>
                        <p>Tráiler no disponible para este título</p>
                    </div>
                )}           
            </div>

            {/* Lista de miniaturas */}
            <div className='trailers-thumbs-container'>
                {peliculas.slice(0, 100).map((peli) => (
                    <div
                    key={peli.id}
                    onClick={() => setPeliculaSeleccionada(peli)}
                    className={`trailer-thumb-card ${
                        peliculaSeleccionada.id === peli.id ? 'active' : ''
                    }`}
                    >
                        <img 
                        src={
                            peli.backdrop_path || peli.poster_path
                            ? `https://image.tmdb.org/t/p/w300${peli.backdrop_path || peli.poster_path}`
                            : ''
                        } 
                        alt={peli.title || peli.name}
                    />
                    <p>{peli.title || peli.name}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default SeccionTrailers;