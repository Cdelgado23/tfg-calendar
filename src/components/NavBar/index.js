
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLinkGreen,
  NavBtnLinkYellow,
  SelectRouter
} from './NavBarElements';

import React from 'react';
import { useHistory,useLocation } from "react-router-dom";
import { Button } from '../../pages/PagesElements';


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
        <div style= {{"justify-self": "flex-start"}}>
        <NavLink to='/'>
          Universidad de Extremadura
        </NavLink>
        </div>
         {
           props.showButtons?
          <React.Fragment>
            <SelectRouter name="rooms" id="rooms" onChange={event =>{handleRouteChange(event, history, location)}}>
            <option value={"Horario"}>Horario</option>
            <option value={"Asignaturas"}>Asignaturas</option>
            <option value={"Aulas"}>Aulas</option>
            <option value={"Profesore"}>Profesores</option>
            <option value={"Titulaciones"}>Titulaciones</option>
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
            <NavBtn>
              <NavBtnLinkGreen to='/Usuario'>Profesor Apellido1 Apellido2</NavBtnLinkGreen>
            </NavBtn>
          </React.Fragment>

         :
         <React.Fragment>
            <div style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
              <div style={{background: "#F5AB00", padding: "1rem", borderRadius: "5px", color: "white"}}>
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