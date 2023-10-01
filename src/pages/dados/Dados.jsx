import React, { useEffect, useState } from 'react';
import Header from '../../componentes/Header/Header';
import Card from '../../componentes/Card/Card';
import styles from './Dados.module.css';
import Button from '../../componentes/Button/Button';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/')

  }

  return (
    <>
    <Header />
    <div className={styles.btnLogout}>
        <Button onClick={handleLogout}>Logout</Button>
        <p className={styles.catalog}>Catalog:</p>
      </div>
    <div className={styles.body}>
        {beers.map((beer, index) => (
          <Card 
          key = {index}
          name = {beer.name}
          data = {beer.first_brewed}
          image =  {beer.image_url}
          tipe = {beer.brewers_tips}
          ibu = {beer.ibu}
          abv = {beer.abv}
          />
        ))}
    </div>
    </>
  );
}

export default BeerList;