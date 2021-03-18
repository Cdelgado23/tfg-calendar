import styled from 'styled-components';


export const FlexForm= styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
  justify-content: space-around;
  margin-bottom: 5vh;
`;

export const sessionInput= styled.input`

  background: #EFEFEF;

`;


export const NotificationsButtonsContainer= styled.div`

  display: flex;
  flex-direction: row;
  margin: 5%;
  justify-content: space-around; 
  align-items: center;

`;

export const NotificationButton = styled.button`
  border-radius: 4px;
  background: #2DA283;
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