
import {
  Nav,
  NavMenu,
  NavBtn,
  NavBtnLinkGreen,
  NavBtnLinkYellow,
  SelectRouter
} from './NavBarElements';

import React from 'react';
import { useHistory,useLocation } from "react-router-dom";

import logo from '../../logo.png';
import {spanish} from '../../translations/Spanish'

function handleRouteChange(event, history, location) {
  history.push("/"+event.target.value);
  location= event.target.value;
}

const Navbar = (props) => {
  let history = useHistory();
  let location = useLocation();
  return (
    <>
      <Nav>
        <div style= {{width: "15vw"}}>
        <div style={{  color: "#fff", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", textDecoration: "none",
                      margin: "0 0 0 1vw", height: "100%"}}>
        <img src={logo} alt="logo"   height="100%"/>
        </div>
        </div>
         {
           props.loggedUser?
          <React.Fragment>
            <SelectRouter name="rooms" id="rooms" onChange={event =>{handleRouteChange(event, history, location)}}>
            <option value={"Horario"}>{spanish.schedule}</option>
            <option value={"Asignaturas"}>{spanish.subjects}</option>
            <option value={"Aulas"}>{spanish.classrooms}</option>
            <option value={"Profesore"}>{spanish.teachers}</option>
            <option value={"Titulaciones"}>{spanish.titles}</option>
            </SelectRouter>
    
            <NavMenu>
              <NavBtn>
                <NavBtnLinkYellow to='/Horario'>Horario</NavBtnLinkYellow>
              </NavBtn>
              <NavBtn>
                <NavBtnLinkYellow to='/Asignaturas'>Asignaturas</NavBtnLinkYellow>
              </NavBtn>
              <NavBtn>
                <NavBtnLinkYellow to='/Aulas'>Aulas</NavBtnLinkYellow>
              </NavBtn>
              <NavBtn>
                <NavBtnLinkYellow to='/Profesores'>Profesores</NavBtnLinkYellow>
              </NavBtn>
              <NavBtn>
                <NavBtnLinkYellow to='/Titulaciones'>Titulaciones</NavBtnLinkYellow>
              </NavBtn>
            </NavMenu>
            <NavBtn style={{width: "15vw"}}>
              <NavBtnLinkGreen to='/Usuario' style={{width: "15vw", textAlign: "center"}}>
              {props.loggedUser}

              </NavBtnLinkGreen>
            </NavBtn>
          </React.Fragment>

         :
         <React.Fragment>
            <div style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
              <div style={{background: "#F5AB00", padding: "1rem 2rem", borderRadius: "5px", color: "white"}}>
                Login
              </div>
            </div>
            <NavBtn>
              <div style={{  borderRadius: "4px", background: "#2DA283",padding: "10px 22px", color:"#fff", outline: "none", border: "none", transition: "all 0.2s ease-in-out", textDecoration: "none"}} >Usuario Desconocido</div>
            </NavBtn>
         </React.Fragment>


         }

      </Nav>
    </>
  );
};

export default Navbar;