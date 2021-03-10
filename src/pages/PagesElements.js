import styled from 'styled-components';

export const SpaceBetweenMenu= styled.div`
display: flex;
align-items: flex-end;
justify-content: space-around;

@media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Timetable = styled.div`
  display: flex;
  align-items: center;
  width: 60vw;
  height:70vh;
  white-space: nowrap;
  background: #EFEFEF;
  @media screen and (max-width: 768px) {
    width:100%;
    height: 100%;
  }
`;

export const LateralMenu = styled.div`
  display: flex;
  flex-direction: column; 
  width: 20vw;
  margin: 0 1vw;
  align-items: strech;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    width:100%;
    height:100%;
    margin: 0 1%;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: #F5AB00;
  margin: 0.5vh 0;
  border-radius: 10px 10px 0 0;
  justify-content: center;
  padding: 5px 11px;
`;

export const MenuBody = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 10px 22px;
  height:70vh;
  justify-content: center;
  background: #EFEFEF;
  border-radius: 0 0 10px 10px;

  @media screen and (max-width: 768px) {
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
  background: #a7e293;
`;

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  outline: none;
  border: none;
  /* Color the border and text with theme.main */
  background: #2DA283;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #6cd1b6;
    color: #010606;
  }
`;