function errorMessage(error) {
    if (error.code === 'auth/email-already-exists') {
      return 'Email já cadastrado.';
    } if (error.code === 'auth/invalid-password') {
      return 'Senha inválida.';
    } if (error.code === 'auth/invalid-email') {
      return 'Email inválido.';
    } if (error.code === 'auth/invalid-login-credentials'){
        return 'Email ou senha inválidos.'
    }
    return 'Preencha todos os campos corretamente';
  }

  export default errorMessage;