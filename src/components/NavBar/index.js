import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLinkGreen,
  NavBtnLinkYellow
} from './NavBarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <div style= {{"justify-self": "flex-start"}}>
        <NavLink to='/'>
          Universidad de Extremadura
        </NavLink>
        </div>

        <Bars />
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