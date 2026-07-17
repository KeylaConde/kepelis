import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './HeroCarousel.css'

// Importamos los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';

const SlideConVideo = ({ pelicula}) => {
    const [videoKey, setVideoKey] = useState(null);

useEffect(() => {
    const fetchVideo = async () => {
    const url = `https://api.themoviedb.org/3/movie/${pelicula.id}/videos?api_key=e82daa...`;
    const res = await fetch(url);
    const data = await res.json();
    const trailer = data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
    if (trailer) setVideoKey(trailer.key);
   };
   fetchVideo();
}, [pelicula.id]);

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
            <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${pelicula.backdrop_path})`, width: '100%', height: '100%', backgroundSize: 'cover' }} />
        )}
        <div className="hero-content">
            <h1>{pelicula.title || pelicula.name}</h1>
            <p>{pelicula.overview?.substring(0, 100)}...</p>
        </div>
    </div>
    );  
};

const HeroCarousel = ({ peliculas }) => (
    <Swiper modules={[Autoplay, Navigation]} navigation autoplay={{ delay: 5000 }} loop={true}>
        {peliculas.slice(0, 5).map((pelicula) => (
            <SwiperSlide key={pelicula.id}>
                <SlideConVideo pelicula={pelicula} />
            </SwiperSlide>
        ))}
    </Swiper>
);

export default HeroCarousel;