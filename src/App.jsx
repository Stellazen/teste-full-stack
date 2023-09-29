import React, { useEffect, useState } from 'react';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Dados from './pages/dados/Dados';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './servicesFirebase/firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Limpeza do listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/dados" element={user ? <Dados /> : <Navigate to="/" />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
