import React, { useEffect, useState } from 'react';
import Header from '../../componentes/Header/Header';
import Card from '../../componentes/Card/Card';
import styles from './Dados.module.css';

function BeerList() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then((response) => response.json())
      .then((data) => {
        setBeers(data); 
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da Punk API:', error);
      });
  }, []);

  return (
    <div className={styles.body}>
      <Header />
      <ul>
        {beers.map((beer, index) => (
          <Card 
          key = {index}
          name = {beer.name}
          description = {beer.description}
          image =  {beer.image_url}
          tipe = {beer.brewers_tips}
          ibu = {beer.ibu}
          />
        ))}
      </ul>
    </div>
  );
}

export default BeerList;