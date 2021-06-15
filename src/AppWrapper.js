import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Horario from './pages/Horario/Horario';
import Asignaturas from './pages/Asignaturas/Asignaturas';
import Aulas from './pages/Aulas/Aulas';
import Usuario from './pages/Usuario';
import Profesores from './pages/Profesores/Profesores';
import Titulaciones from './pages/Titulaciones/Titulaciones';

import Repository from './repository/Repository';
import {RepositoryContext} from './context/RepositoryContext';

export default class AppWrapper extends React.Component
 {
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
  return (
    <RepositoryContext.Provider value= {new Repository()}>
      <Router id="App">
        <Navbar hist={this.props.hist}/>
        <Switch id="page-wrap">
          <Route path='/Horario' render={()=><Horario/>}/>
          <Route path='/Asignaturas' component={Asignaturas} />
          <Route path='/Aulas' component={Aulas} />
          <Route path='/Profesores' component={Profesores} />
          <Route path='/Usuario' component={Usuario} />
          <Route path='/Titulaciones' component={Titulaciones} />
    
        </Switch>
      </Router>
    </RepositoryContext.Provider>
  );
  }

 }