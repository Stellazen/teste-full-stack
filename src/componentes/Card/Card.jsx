import React from "react";
import styles from "./Card.module.css"
function Card(props){
    return(
    <section key={props.key} className={styles.container}>
        <h1>{props.name}</h1>
        <p>Firts Brewed: {props.data}</p>
        <img className={styles.imagem} src={props.image} alt="foto da cerveja"/>
        <p>{props.tipe}</p>
        <div className={styles.types}>
            <p>IBU: {props.ibu}</p>
            <p>ABV: {props.abv}</p>
        </div>
    </section>
    )
}

export default Card;