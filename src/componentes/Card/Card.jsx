import React from "react";
import styles from "./Card.module.css"
function Card(props){
    return(
    <section key={props.key} className={styles.container}>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <img className={styles.imagem} src={props.image} alt="foto da cerveja"/>
        <p>{props.tipe}</p>
        <p>IBU :{props.ibu}</p>
    </section>
    )
}

export default Card;