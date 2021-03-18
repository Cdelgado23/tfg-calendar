
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

          <SelectRouter name="rooms" id="rooms" onChange={event =>{handleRouteChange(event, history, location)}}>
          <option value={"Horario"}>Horario</option>
          <option value={"Asignaturas"}>Asignaturas</option>
          <option value={"Aulas"}>Aulas</option>

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
        </NavMenu>
        <NavBtn>
          <NavBtnLinkGreen to='/Usuario'>Profesor Apellido1 Apellido2</NavBtnLinkGreen>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;