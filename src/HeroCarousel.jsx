import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './HeroCarousel.css'

// Importamos los estilos de Swiper
import 'swiper/css/bundle';

const SlideConVideo = ({ pelicula, tipo }) => {
    const [videoKey, setVideoKey] = useState(null);

useEffect(() => {
    const fetchVideo = async () => {
        try {
            // Usamos `${tipo}` para que funcione tanto para 'movie' como para 'serie'
                const url = `https://api.themoviedb.org/3/${tipo}/${pelicula.id}/videos?api_key=e82daa897c788373ebb584472c93e3dc&language=es-ES`;
                const res = await fetch(url);
                const data = await res.json();

                const trailer = data.results?.find(
                    (vid) => vid.site === "YouTube" && vid.type === "Trailer"
                );

                if (trailer) {
                    setVideoKey(trailer.key);
                } else if (data.results && data.results.length > 0) {
                    setVideoKey(data.results[0].key);
                } else {
                    setVideoKey(null);
                }
            } catch (error) {
                console.error("Error al cargar el video:", error);
            }
        }; 

        if (pelicula?.id) {
            fetchVideo();
        }          
    }, [pelicula.tipo]);

    // Validamos si tiene backdrop_path, si no, usamos el poster_path, y si no hay nada, un color o fondo neutro
    const imagenFondo = pelicula?.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${pelicula.backdrop_path}`
    : pelicula?.poster_path 
    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
    : '';

return (
    <div className="hero-banner">
        {videoKey ? (
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            playing={true}
            muted={true}
            loop={true}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
           />
        ) : (
            <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${pelicula.backdrop_path})`, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center 25%', position: 'absolute', top: 0, left: 0
         }} 
        />
        )}
        <div className="hero-content">
            <h1>{pelicula.title || pelicula.name}</h1>
            <p>{pelicula.overview ? `${pelicula.overview.substring(0, 100)}...` : ''}</p>
        </div>
    </div>
    );  
};

const HeroCarousel = ({ peliculas }) => (
    <Swiper modules={[Autoplay, Navigation ]} navigation autoplay={{ delay: 5000 }}  loop={true}>
        {peliculas.slice(0, 5).map((pelicula) => (
            <SwiperSlide key={pelicula.id}>
                <SlideConVideo pelicula={pelicula} />
            </SwiperSlide>
        ))}
    </Swiper>
);

export default HeroCarousel;