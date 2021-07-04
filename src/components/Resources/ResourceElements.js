import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const ResourceList = styled.div`
display:flex;
flex-direction:column;

align-items: bottom;

flex-wrap: ${props => props.wrap? props.wrap: "nowrap"};

height:${props => props.height? props.height: "auto"};
width:${props => props.width? props.width: "auto"};
max-width: ${props => props.width? props.width: "auto"};
overflow: ${props => props.overflow? props.overflow: "none"};
overflow-x: ${props => props.overflowx? props.overflowx: "hidden"};
overflow-y: ${props => props.overflowy? props.overflowy: "hidden"};

margin: ${props => props.margin? props.margin: "0.5vh 0 1vh 0"};
border: 1px solid #EFEFEF;
border-radius: 0 0 10px 10px;
`;

export const ResourceElement= styled.div`
display: flex;
flexDirection: row;
width: 100%;
justifyContent: space-between;
`;
