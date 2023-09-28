import React from "react";
import styles from "./Input.module.css"

function Input(props){
    return(
        <>
        <input className={styles.input}
        type={props.type}  
        placeholder={props.placeholder} 
        value={props.value}
        onChange={props.onChange}/>
        </>
    )
}

export default Input