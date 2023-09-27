import React, { useState } from "react";
import Input from "../../componentes/Input/Input";
import Button from "../../componentes/Button/Button";
import Header from "../../componentes/Header/Header";
import styles from "./Login.module.css"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {


    // Aqui você pode adicionar a lógica para realizar o login com email e senha
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  const handleCadastro = () => {
    // Aqui você pode adicionar a lógica para realizar o cadastro do usuário
    console.log("Cadastrar usuário");
  };

  return (
    <section className={styles.body}>
        <Header />
      <section className={styles.form}>
      <Input
        type="text"
        placeholder="Digite seu email"
        value={email}
        onChange={handleEmailChange} // Adicione o evento onChange
        />
        <Input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={handlePasswordChange} // Adicione o evento onChange
        />
        <Button onClick={handleLogin}>Entrar</Button> 
        <Button>Entrar com o Google</Button>
        <Button onClick={handleCadastro}>Fazer Cadastro</Button> 
      </section>
    </section>
  );
}

export default Login;