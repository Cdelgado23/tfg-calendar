import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Horario from './pages/Horario/Horario';
import Asignaturas from './pages/Asignaturas';
import Aulas from './pages/Aulas';
import Usuario from './pages/Usuario';

import { useHistory } from "react-router-dom";

import Repository from './repository/Repository';
import {RepositoryContext} from './context/RepositoryContext';


function App() {
  let history = useHistory();
  console.log("app");
  console.log(RepositoryContext);
  return (
    <RepositoryContext.Provider value= {new Repository()}>
      <Router id="App">
        <Navbar hist={history}/>
        <Switch id="page-wrap">
          <Route path='/Horario' exact component={Horario} />
          <Route path='/Asignaturas' component={Asignaturas} />
          <Route path='/Aulas' component={Aulas} />
          <Route path='/Usuario' component={Usuario} />
        </Switch>
      </Router>
    </RepositoryContext.Provider>
  );
}

export default App;