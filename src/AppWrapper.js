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
import { StyledInput, StyledLabel } from './components/SubjectForm/SubjectFormElements';
import { Button } from './pages/PagesElements';

export default class AppWrapper extends React.Component
 {
  constructor(props){
    super(props);
    this.state={
      repository: new Repository(),
      email: "",
      password: ""
    };

    this.setEmail= this.setEmail.bind(this);
    this.setPassword= this.setPassword.bind(this);
  }
  setEmail(email){
    this.setState({email: email});
  }
  setPassword(psw){
    this.setState({password: psw});
  }
  render(){
  return (
    <RepositoryContext.Provider value= {this.state.repository}>
      <Router id="App">
        <Navbar hist={this.props.hist} showButtons={this.state.repository.getUser()!==null}/>
        {
          this.state.repository.getUser()===null? "":  
          <Switch id="page-wrap">
            <Route path='/Horario' render={()=><Horario/>}/>
            <Route path='/Asignaturas' component={Asignaturas} />
            <Route path='/Aulas' component={Aulas} />
            <Route path='/Profesores' component={Profesores} />
            <Route path='/Usuario' component={Usuario} />
            <Route path='/Titulaciones' component={Titulaciones} />  
          </Switch>
        }
      </Router>

      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <div style={{border: "#2DA283", color: "white", display:"flex", flexDirection: "column", alignItems: "center", justifyContent: 'center', width: "40vw", background: "white", borderRadius: "4px"}}>
        <h2 style={{color: "white", }}>Login now</h2>
        <StyledLabel>Email</StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="email" 
          value={this.state.email} onChange= {event => {this.setEmail(event.target.value)}}
          style={{width: "80%"}}/>
        <StyledLabel>Password</StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  type="password" name="email" 
          value={this.state.password} onChange= {event => {this.setPassword(event.target.value)}}
          style={{width: "80%"}}/>

          <Button background={"#F5AB00"}>
            Login
          </Button>
      </div>
      
    </div>
    </RepositoryContext.Provider>
  );
  }

 }