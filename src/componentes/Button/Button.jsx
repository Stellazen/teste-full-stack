import React from "react";
import styles from "./Button.module.css"

function Button(props){
    return(
        <>
        <button className={styles.button} 
        type="submit"
        onClick={props.onClick}>
            {props.children} 
        </button>
        </>
    )
}

export default Button