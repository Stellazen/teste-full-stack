import React from "react";
import Input from "../../componentes/Input/Input";
import Button from "../../componentes/Input/Button/Button";
import styles from "./Login.module.css"

function Login(){
    return(
        <section className={styles.body}>
            <section className={styles.form}>
            <Input
            type= "text"
            def = "Digite seu email"
            />
            <Input
            type= "password"
            def = "Digite sua senha"
            />
            <Button>Enviar</Button>
            </section>
        </section>
    )
}

export default Login