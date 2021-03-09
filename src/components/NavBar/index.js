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
        <NavLink to='/'>
          <img src={require('../../images/logo.png')} alt='logo' />
        </NavLink>
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
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLinkGreen to='/Usuario'>Francisco FLores Solano</NavBtnLinkGreen>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;