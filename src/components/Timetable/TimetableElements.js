import styled from 'styled-components';


export const TimetableGrid= styled.div`
  display: grid;
  grid-template-columns: 9% 13% 13% 13% 13% 13% 13% 13%;
  
  grid-template-rows: repeat(${props => props.divisions}, 1fr);
  justify-items: center;

  width: 100%;
  height:70vh;
  border: 1px solid #ccc;

  white-space: nowrap;
  justify-content: stretch; 
  overflow-y: scroll;
  overflow-x: hidden;

`;



export const GridTimeElement = styled.div`
  grid-column-start: ${props => props.column};
  grid-row-start: ${props => props.row};

  grid-column-end: ${props => props.column +1};
  grid-row-end: ${props => props.row +1};
  justify-self: stretch;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

`;


export const GridElement = styled.button`
  grid-column-start: ${props => props.column};
  grid-row-start: ${props => props.row};

  grid-column-end: ${props => props.column +1};
  grid-row-end: ${props => props.row + (props.size || 1)};
  background-color: ${props => props.color || "#FFFFFF"};
  justify-self: stretch;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;

  margin-top:${props => props.marginTop}%;
  margin-bottom:${props => props.marginBot}%;

  &:hover {
    transition: all 0.2s ease-in-out;
    filter: brightness(85%);
    color: #010606;
  }
  &:active {
    background: #FFFFFF;
  }

`;

export const GridLines= styled.div`

grid-column-start: ${props => props.column};
grid-row-start: ${props => props.row};

grid-column-end: ${props => props.column +1};
grid-row-end: ${props => props.row +1};
border-top: ${props => props.row>1 && props.column>0 ? "1px solid #EFEFEF": ""} ;
justify-self: stretch;

${props => props.column>1 ? "&:hover {transition: all 0.2s ease-in-out;background: #EFEFEF;color: #010606;}":""};
`;

export const GridDayElement = styled.div`
  grid-column-start: ${props => props.column};
  grid-row-start: ${props => props.row};

  grid-column-end: ${props => props.column +1};
  grid-row-end: ${props => props.row + (props.size || 1)};
  background-color: ${props => props.color || "#FFFFFF"};
  justify-self: stretch;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  border-bottom: 1px solid #EFEFEF;


  
  margin-top:${props => props.marginTop}%;
  margin-bottom:${props => props.marginBot}%;
`;


export const WeekDataBlock= styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
`;

export const WeekPicker = styled.div`
  align-self: flex-end;
  margin-right: 5vw;

`;
export const SelectedWeek= styled.div`
  

`;