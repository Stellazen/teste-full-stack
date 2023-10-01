import React, { useEffect, useState } from 'react';
import Header from '../../componentes/Header/Header';
import Card from '../../componentes/Card/Card';
import styles from './Dados.module.css';
import Button from '../../componentes/Button/Button';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../servicesFirebase/firebaseAuth';

function BeerList() {
  const [beers, setBeers] = useState([]);
  const [sortedBeers, setSortedBeers] = useState([]);
  const [sortBy, setSortBy] = useState('ibu');

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then((response) => response.json())
      .then((data) => {
        setBeers(data);
        setSortedBeers(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da Punk API:', error);
      });
  }, []);

  useEffect(() => {
    // Função para ordenar cervejas com base no critério selecionado
    const sortBeers = () => {
      let sorted = [...beers];

      if (sortBy === 'ibu') {
        sorted = sorted.sort((a, b) => b.ibu - a.ibu);
      } else if (sortBy === 'abv') {
        sorted = sorted.sort((a, b) => b.abv - a.abv);
      }

      setSortedBeers(sorted);
    };

    sortBeers();
  }, [sortBy, beers]);

  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className={styles.btnLogout}>
        <Button onClick={handleLogout}>Logout</Button>
        <p className={styles.catalog}>Catalog:</p>
      </div>

      <div className={styles.sort}>
        <label className={styles.label}>
          Order by:
          <select className={styles.options} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="ibu">Highest IBU</option>
            <option value="abv">Highest ABV</option>
          </select>
        </label>
      </div>

      <div className={styles.body}>
        {sortedBeers.map((beer, index) => (
          <Card
            key={index}
            name={beer.name}
            data={beer.first_brewed}
            image={beer.image_url}
            tipe={beer.brewers_tips}
            ibu={beer.ibu}
            abv={beer.abv}
          />
        ))}
      </div>
    </>
  );
}

export default BeerList;