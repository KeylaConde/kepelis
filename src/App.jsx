import './App.css';
import './HeroCarousel.css';
import HeroCarousel from './HeroCarousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import './index.css';
import 'swiper/css';
import 'swiper/css/navigation';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [providerId, setProviderId] = useState(8); // 8 es Netflix por defecto
  const [tipo, setTipo] = useState('movie'); // 'movie' para peliculas, 'tv' para series
  const BASE_IMG = "https://image.tmdb.org/t/p/w500"; // Esta es la base oficial de TMDB

  useEffect(() => {
    const obtenerPeliculas = async () => {
      // Usamos la API Key aquí
      const url = `https://api.themoviedb.org/3/discover/${tipo}?api_key=e82daa897c788373ebb584472c93e3dc&language=es-ES&watch_region=CO&with_watch_providers=${providerId}&sort_by+popularity.desc`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        setPeliculas(datos.results);
    };
    obtenerPeliculas();
  }, [providerId, tipo]); // <--- Importante! Esto hace que se recargue si cambia de plataforma

  return (
    <div className="App">

      <h1>Tendencias en Kepelis</h1>
      <div className="hero-carousel-container">
        {peliculas.length > 0 && <HeroCarousel peliculas={peliculas} tipo={tipo} />}
      </div>
      <div className="filtros-movie-tv" style={{ marginBottom: '20px', display: 'flex', gap: '10px'}}>
        <button className={tipo === 'movie' ? 'btn-activo' : ''} onClick={() => setTipo('movie')}>🎬 Ver Películas</button>
        <button className={tipo === 'tv' ? 'btn-activo' : ''} onClick={() => setTipo('tv')}>📺 Ver Series/Novelas</button>
      </div>

      <div className="filtros" style={{ marginBottom: '20px', display: 'flex', gap: '10px'}}>
        <button className={providerId === 8 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(8)}>Netflix</button>
        <button className={providerId === 337 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(337)}>Disney</button>
        <button className={providerId === 119 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(119)}>Prime Video</button>
        <button className={providerId === 1899 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(1899)}>Hbo Max</button>
        <button className={providerId === 531 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(531)}>Paramount</button>
        <button className={providerId === 457 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(457)}>Vix</button>
        <button className={providerId === 538 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(538)}>Plex</button>
        <button className={providerId === 350 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(350)}>Apple TV</button>
        <button className={providerId === 283 ? 'btn-activo' : ''} 
        onClick={() => setProviderId(283)}>Crunchyroll</button>
      </div>

    <Swiper
    modules={[Navigation]}
    navigation
    spaceBetween={20}
    slidesPerView={8}
    breakpoints={{
      // En pantallas muy pequeñas (celulares en vertical)
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      // En tablets
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      // En computadoras / pantallas grandes
      1024: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      // En pantallas xl
      1600: {
        slidesPerView: 8,
        spaceBetween: 25,
      }
    }}
  className="peliculas-swiper"
    >
      {peliculas.map((pelicula) => (
        <SwiperSlide key={pelicula.id}>
          <div className="pelicula-card">
            <img 
            src={`${BASE_IMG}${pelicula.poster_path}`} 
            alt={pelicula.title}
            style={{ width: '100%', borderRadius: '10px' }}
             />
             <h3>{pelicula.title || pelicula.name}</h3>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>   
  );
}

export default App
  