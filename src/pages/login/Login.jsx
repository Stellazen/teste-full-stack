import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../componentes/Input/Input";
import Button from "../../componentes/Button/Button";
import Header from "../../componentes/Header/Header";
import styles from "./Login.module.css"
import { googleLogin, valuesLogin } from "../../servicesFirebase/firebaseAuth";
import errorMessage from "../ErrorMessages/ErrorMessages";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    valuesLogin(email, password)
    .then(()=> {
      navigate('/dados');
    })
    .catch((error) => {
      setError("Erro: " + errorMessage(error))
    })
  };

   const handleLoginGoogle = () => {
    googleLogin()
    .then(() => {
      navigate('/dados');
    })
    .catch((error) => {
      setError("Erro: " + errorMessage(error));
    });
   }

  const handleCadastro = () => {
    navigate('/Cadastro');

  };
  

  return (
    <>
        <Header />
        <section className={styles.body}>
            <section className={styles.form}>
            <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange} 
                />
                <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange} 
                />
                <div className={styles.msgErro}>
                  {error && <p className={styles.pError}>{error}</p>}
                </div>
                <div className={styles.login}>
                  <Button onClick={handleLogin}>Login</Button>
                  <button onClick={handleLoginGoogle} className={styles.google}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
                  </button>
                </div>
                <Button onClick={handleCadastro}>Register</Button> 
            </section>
        </section>
    </>
  );
}

export default Login;