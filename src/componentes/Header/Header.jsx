import React from "react";
import styles from "./Header.module.css";

function Header(){
    return(
        <>
        <section className={styles.background}>
            <h1 className={styles.title}>&lt;Code Beer /&gt;</h1>
        </section>
        </>
    )
}

export default Header;