import React, { useEffect, useState } from 'react';

function BeerList() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then((response) => response.json())
      .then((data) => {
        
        const beerNames = data.map((beer) => beer.name);
        setBeers(beerNames);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da Punk API:', error);
      });
  }, []); 

  return (
    <div>
      <h1>Lista de Cervejas</h1>
      <ul>
        {beers.map((beerName, index) => (
          <li key={index}>{beerName}</li>
        ))}
      </ul>
    </div>
  );
}

export default BeerList;