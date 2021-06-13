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
  grid-row-end: ${props => props.row + props.size};
  justify-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFF;

  min-height: 3rem;

  border-top: 1px solid #EFEFEF;


`;

export const GridContainer = styled.div`
  grid-column-start: ${props => props.column};
  grid-row-start: ${props => props.row};

  grid-column-end: ${props => props.column +1};
  grid-row-end: ${props => props.row + (props.size || 1)};
  background-color: ${props => props.color || "#FFFFFF"};
  justify-self: stretch;
  height: auto;
  width: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  
  overflow: hidden;
  text-overflow: ellipsis;

  color: white; 
`;

export const GridContainerElement = styled.button`
background-color: ${props => props.color || "#FFFFFF"};
justify-self: stretch;
height: auto;
width: auto;

display: flex;
justify-content: center;
align-items: center;

outline: none;
border: none;

overflow: hidden;
text-overflow: ellipsis;

color: white; 
&:hover {
  transition: all 0.2s ease-in-out;
  filter: brightness(85%);
  color: #010606;
}
&:active {
  background: #FFFFFF;
}
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
  
  overflow: hidden;
  text-overflow: ellipsis;

  color: white; 
  &:hover {
    transition: all 0.2s ease-in-out;
    filter: brightness(85%);
    color: #010606;
  }
  &:active {
    background: #FFFFFF;
  }

`;

export const GridLinesComponent = styled.div.attrs(props => ({
  style: {
    background: props.background,
    gridColumnStart: props.column,
    gridRowStart: props.row,
    gridColumnEnd: props.column +1,
    gridRowEnd: props.row +1,
    borderTop: props.row>1 && props.column>0 ? "1px solid #EFEFEF": ""
  },
}))
`justify-self: stretch;
min-height: 1rem;
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
  text-align: center; 

  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  border-bottom: 1px solid #EFEFEF;


  
  margin-top:${props => props.marginTop}%;
  margin-bottom:${props => props.marginBot}%;
`;


export const WeekDataBlock= styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 5vh;
`;

export const WeekPicker = styled.div`
  margin-right: 5vw;
  margin-left: auto;
`;
export const SelectedWeek= styled.div`
    
  display: flex;
  flex-direction: row; 
  justify-content: center;
  align-items: center;
  justify-self: center;
  margin-right: 3%;
`;