import './App.css';
import './HeroCarousel.css';
import './SeccionTrailers.css';
import Navbar from './Navbar';
import HeroCarousel from './HeroCarousel';
import SeccionTrailers from './SeccionTrailers';
import Detalle from './Detalle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import './index.css';
import 'swiper/css';
import 'swiper/css/navigation';

const genresMap = {
  28: 'Acción',
  12: 'Aventura',
  16: 'Animación',
  35: 'Comedia',
  80: 'Crimen',
  99: 'Documental',
  18: 'Drama',
  10751: 'Familiar',
  14: 'Fantasía',
  36: 'Historia',
  27: 'Terror',
  10749: 'Romance',
  878: 'Ciencia Ficción',
  53: 'Suspenso'
};

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [seccion, setSeccion] = useState('home');
  const [peliculas, setPeliculas] = useState([]);
  const [providerId, setProviderId] = useState(8); // 8 es Netflix por defecto
  const [tipo, setTipo] = useState('movie'); // 'movie' para peliculas, 'tv' para series
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const BASE_IMG = "https://image.tmdb.org/t/p/w500"; // Esta es la base oficial de TMDB

  const buscarPeliculas = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    if (!busqueda.trim()) return;

    const url = `https://api.themoviedb.org/3/search/multi?api_key=e82daa897c788373ebb584472c93e3dc&language=es-ES&query=${encodeURIComponent(busqueda)}`;

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      const resultadosValidos = (datos.results || []).filter(item => item.media_type === 'movie' || item.media_type === 'tv');

      setResultadosBusqueda(resultadosValidos);
      setSeccion('busqueda'); // Cambiamos a una sección de búsqueda para mostrar los resultados
      setPeliculaSeleccionada(null); //Limpiamos detalles si había alguno
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  // Función para manejar la navegación desde la Navbar
  const handleNavegar = (nuevaSeccion) => {
    setSeccion(nuevaSeccion);
    setPeliculaSeleccionada(null); // Limpiamos detalle si navegan
  }

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
      {/* Agregamos la barra de navegación aquí */}
      <Navbar onNavegar={handleNavegar} seccionActual={seccion} onBuscar={buscarPeliculas} busqueda={busqueda} setBusqueda={setBusqueda}/>
    {peliculaSeleccionada ? (
      <Detalle
      id={peliculaSeleccionada.id}
      tipo={peliculaSeleccionada.tipo}
      onVolver={() => setPeliculaSeleccionada(null)}
      />
    ) : (
     <>

     {/* Sección de Búsqueda */}
     {seccion === 'busqueda' && (
      <div className='resultados-container'>
        <h2>Resultados para: "{busqueda}"</h2>
        <div className='resultados-grid'>
        {resultadosBusqueda.length > 0 ? (
          resultadosBusqueda.map((pelicula) => (
            pelicula.poster_path && (
              <div
                key={pelicula.id}
                className='pelicula-card'
                onClick={() => setPeliculaSeleccionada({ id: pelicula.id, tipo: pelicula.media_type })}
                style={{ cursor: 'pointer' }}
                >
                  <img
                  src={`${BASE_IMG}${pelicula.poster_path}`}
                  alt={pelicula.title || pelicula.name}
                  style={{ width: '100%', borderRadius: '10px' }}
                />
                <h3>{pelicula.title || pelicula.name}</h3>
              </div>
            )
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
        </div>
      </div>
     )}

       {seccion === 'home' && (
        <>       
      <h1>Tendencias</h1>
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
          <div className="pelicula-card" onClick={() => setPeliculaSeleccionada({ id: pelicula.id, tipo: tipo })}
            >
            <img 
            src={`${BASE_IMG}${pelicula.poster_path}`} 
            alt={pelicula.title || pelicula.name}
            style={{ width: '100%', borderRadius: '10px' }}
             />

             {/* Insignia de calificación */}
             <div className='pelicula-rating-badge'>
              ⭐ {pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A'}
             </div>

             <div className='pelicula-categoria-badge'>
              {
                pelicula.genre_ids && pelicula.genre_ids.length > 0
                ? genresMap[pelicula.genre_ids[0]]
                : 'General'}
             </div>

             <h3>{pelicula.title || pelicula.name}</h3>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>

      {/* SECCIÓN DE TRÁILERS DEBAJO DEL CARRUSEL */}
      {peliculas.length > 0 && seccion === 'home' && (
        <SeccionTrailers peliculas={peliculas} tipo={tipo} />
      )}

              </>
)}

      {/* Vista cuando el usuario hace clic en Trailers en la Navbar */}
      {seccion === 'trailers' && (
         <div style={{ padding: '30px' }}>
         {peliculas.length > 0 && (
          <SeccionTrailers peliculas={peliculas} tipo={tipo} />
      )}

      </div>
    )}  
    </>
    )}
   </div>
  );
  }

export default App;
  