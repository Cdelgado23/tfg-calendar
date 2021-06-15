import styled from 'styled-components';
import LoadingOverlay from 'react-loading-overlay';

export const SpaceBetweenMenu= styled.div`
display: flex;
align-items: flex-end;
justify-content: space-around;

@media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CentralMenu = styled.div`
  width: 70vw;
  white-space: nowrap;
  background:  #FFFFFF;

  @media screen and (max-width: 1024px) {
    width:100%;
 //   order: -9999;
  }
`;

export const LateralMenu = styled.div`
  display: flex;
  flex-direction: column; 
  width: 15vw;
  margin: 0 1vw;
  white-space: nowrap;
  align-items: strech;
  justify-content: stretch; 

  @media screen and (max-width: 1024px) {
    width:100%;
    height:100%;
    margin: 1vh 1%;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: #EFEFEF;
  color: #00000;

  margin: 0 0 0.5vh 0;
  border-radius: 10px 10px 0 0;
  justify-content: center;
  padding: 5px 11px;
`;

export const MenuBody = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: stretch;
  white-space: nowrap;
  padding: 2% 1%;
  height:70vh;
  justify-content: flex-start;
  background: #FFFFFF;
  border-radius: 0 0 10px 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  width:100%;
  border: 1px solid #EFEFEF;

  @media screen and (max-width: 1024px) {
    height:100%;
  }
`;

export const FullWidthMenu = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 10px 22px;
  width: 100vw;
  justify-content: center;
  background: #EFEFEF;
  margin: 2px;
  @media screen and (max-width: 1024px) {
    background: #FEFEFE;
  }
`;

export const Button = styled.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 0.5em;
  border-radius: 3px;
  outline: none;
  border: none;
  background: ${props=> props.background? props.background: "#2DA283"};
  color: white;
  &:hover {
    transition: all 0.2s ease-in-out;
    filter: brightness(125%);
    color: #010606;
  }
`;

export const Footer = styled.div`
  margin-top: 0.5vh;
  min-height: 7vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1024px) {
    display: none
  }
`;

const StyledLoader = styled(LoadingOverlay)`
  height: 200%;

`
 
export function MyLoader({ active, children }) {
  return (
    <StyledLoader
      active={active}
      classNamePrefix='MyLoader_'
      spinner
      text='Loading your content...'
    >
      {children}
    </StyledLoader>
  )
}

export const StyledHeader = styled.div`
  height: 5.6vh;
  margin: 1vh 0 0 0;
  display: flex;
  justify-content: center; 
  @media screen and (max-width: 1024px) {
      
    }
`;
export function PageHeader({children }) {
  return (
    <StyledHeader>
      {children}
    </StyledHeader>
  )
}