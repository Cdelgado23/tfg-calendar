import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Horario from './pages/Horario';
import Asignaturas from './pages/Asignaturas';
import Aulas from './pages/Aulas';
import Usuario from './pages/Usuario';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/Horario' exact component={Horario} />
        <Route path='/Asignaturas' component={Asignaturas} />
        <Route path='/Aulas' component={Aulas} />
        <Route path='/Usuario' component={Usuario} />
      </Switch>
    </Router>
  );
}


export default App;