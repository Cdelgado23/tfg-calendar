import styled from 'styled-components';


export const FlexForm= styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-around;

  margin: 0 0.5em 2vh 0.5em;
  `;

export const SessionInput= styled.input`
  width:100%;
  margin-bottom: 0.5em;
`;


export const NotificationsButtonsContainer= styled.div`

  display: flex;
  flex-direction: row;
  margin: 5%;
  justify-content: space-around; 
  align-items: center;

`;

export const FormButton = styled.button`
  border-radius: 4px;
  background: ${props => props.color || "#EFEFEF"};
  padding: 5% 10%;
  color: #FFFF;
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


export const FormSubmit = styled.input`
border-radius: 4px;
background: ${props => props.color || "#EFEFEF"};
padding: 5% 10%;
margin:0;
color: #FFFF;
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