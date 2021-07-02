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
import Login from './pages/Login/Login';

import Repository from './repository/Repository';
import {RepositoryContext} from './context/RepositoryContext';

import { Redirect } from "react-router-dom";


export default class AppWrapper extends React.Component
 {
  constructor(props){
    super(props);
    this.userIsLogged = this.userIsLogged.bind(this);
    this.setLoading = this.setLoading.bind(this);

    var env =  props.env? props.env: process.env.REACT_APP_ENVIROMENT.trimEnd();

    this.state={
      repository: new Repository(this.setLoading, this.userIsLogged, env),
      email: "",
      password: "",
      loggedUser: false,
      loading: false
    };

    this.logOut = this.logOut.bind(this);
  }
  setLoading(loading){
    this.setState({loading: loading});
  }
  logOut(){
    this.state.repository.logOut(()=>{this.userIsLogged(false)});
  }
  userIsLogged(isLogged){
    this.setState({loggedUser: isLogged});
  }

  render(){
  return (
    <RepositoryContext.Provider value= {this.state.repository}>
      <Router id="App">
        <Navbar hist={this.props.hist} loggedUser={this.state.loggedUser}/>
          <Switch id="page-wrap">
          {
            !this.state.loggedUser? 
            <Route path='/Login' render={()=><Login history={this.props.hist} loggedUser={this.state.loggedUser}/>}></Route>
            :  
            <React.Fragment>
              <Route path='/Horario' render={()=><Horario/>}/>
              <Route path='/Asignaturas' component={Asignaturas} />
              <Route path='/Aulas' component={Aulas} />
              <Route path='/Profesores' component={Profesores} />
              <Route path='/Usuario' render={()=><Usuario loggedUser={this.state.loggedUser} logOut={this.logOut}/>} />
              <Route path='/Titulaciones' component={Titulaciones} />  
            </React.Fragment>
          }
          </Switch>
          {
            this.state.loggedUser? <Redirect to="/Horario"/>:
                                  <Redirect to="/Login" />
          }
      </Router>
    </RepositoryContext.Provider>
  );
  }

 }