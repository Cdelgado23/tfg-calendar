import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #EFEFEF;
  height: 80px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
  color: #fff;
  background: #F5AB00;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  margin:0 1vw 1vw 0;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #FFFFFF;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 1024px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin: 0 1vw;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const NavBtnLinkGreen = styled(Link)`
  justify-self: flex-end;
  border-radius: 4px;
  background: #2DA283;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #6cd1b6;
    color: #010606;
  }
`;

export const NavBtnLinkYellow = styled(Link)`
  border-radius: 4px;
  background: #F5AB00;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #d69b1b;
    color: #010606;
  }
`;