import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../componentes/Header/Header";
import Input from "../../componentes/Input/Input";
import Button from "../../componentes/Button/Button";
import styles from "./Cadastro.module.css";
import { createUser } from "../../servicesFirebase/firebaseAuth";

function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCadastro = () => {
    createUser(email, password, displayName)
      .then(() => {
        setIsSuccess(true);
        setError('');
      })
      .catch((error) => {
        setError('Erro ao criar usuário: ' + error.message);
        setIsSuccess(false);
      });
  };

  const handleBack = () =>{
    navigate('/');
  }

  return (
    <>
      <Header />
      <section className={styles.body}>
        <section className={styles.form}>
          <Input
            type="text"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange} 
          />
          <Input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={handlePasswordChange} 
          />
          <div className={styles.msgErro}>
          {error && <p className={styles.pError}>{error}</p>}
          </div>
          <Button onClick={handleCadastro}>Register</Button> 
          <Button onClick={handleBack}>Back</Button>
          <div className={styles.sucess}>
          {isSuccess && <p className={styles.pSucess}>Cadastrado com sucesso!</p>}
          </div>
        </section>
      </section>
    </>
  );
}

export default Cadastro;