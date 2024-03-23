import React from 'react';

function Pokemon({ pokemon, language }) {
  const { id, name, image } = pokemon;

  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <img src={image} alt={name[language]} />
      <div>ID: {id}</div>
      <div>Name: {name[language]}</div>
    </div>
  );
}

export default Pokemon;