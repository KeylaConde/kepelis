import React, { useState } from 'react';

function MovieCard({ titulo, imagen}) {
    // Aquí usamos 'useState' para recordar si la película es favorita
    const [esFavorita, setEsFavorita] = useState(false);

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{titulo}</h3>
            <img src={imagen} alt={titulo} width="150" />
            <button onClick={() => setEsFavorita(!esFavorita)}>
                {esFavorita ? '❤️ Ya es favorita' : '🤍 Añadir a favoritos'}    
            </button>
        </div>
    );
}

export default MovieCard;