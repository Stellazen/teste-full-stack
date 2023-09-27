import React from 'react';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Dados from './pages/dados/Dados';

import {
  BrowserRouter as Router, Routes, Route,

} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>

      <Route exact path="/" element={<Login />} />
      <Route path="/dados" element={<Dados />} />
      <Route path='cadastro' element={ <Cadastro/> } />

      </Routes>
    </Router>
  )
}

export default App;
