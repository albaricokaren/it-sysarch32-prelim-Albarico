import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`);
        const data = await response.json();
        setPokemonList(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
        setLoading(false);
      }
    }

    fetchPokemonList();
  }, [currentPage]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className='lang'>
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div className='lang'>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Back</button>
            {[...Array(totalPages).keys()].map((page) => (
              <button key={page + 1} onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>

          <div className='lang'>Current Page: {currentPage}</div>
          <div className='lang'>Total Pages: {totalPages}</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        
        <div className='grid'> 
          {pokemonList.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
          ))}
         
        </div>
      )}
    </div>
  );
}

export default Pokedex;