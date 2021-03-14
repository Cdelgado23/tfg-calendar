import styled from 'styled-components';



export const SubjectMain= styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;

  margin: 0.5rem 0 0 0;
`;

export const SubjectTitle = styled.button`

    background: ${props => props.color || "#FEFEFE"};
    justify-content: center;
    
    border-radius: ${props => props.ButtonCornersRadius? "4px 4px 4px 4px":"4px 4px 0 0"}; 
    padding: 0.5rem;
    outline: none;
    border: none;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #6cd1b6;
        color: #010606;
    }
`;


export const SubjectGroupsList= styled.div`
    display: ${props => props.show? "flex":"none"};
    flex-direction: column; 
    width: 100%;
    background: #EFEFEF;
    border-radius: 0 0 4px 4px;
`;

export const GroupElement = styled.button`

    background: ${props => props.group.color || "#FEFEFE"};
    justify-content: center;
    padding: 0.4rem;
    outline: none;
    border: none;
    margin: 0.5vh;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #6cd1b6;
        color: #010606;
    }
`;

export const AddGroupButton = styled.button`

    background: #FFFFFF;
    justify-content: flex-end;
    padding: 0.4rem;
    outline: none;
    border: none;
    margin: 2%;
    border-radius: 0 0 4px 4px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #6cd1b6;
        color: #010606;
    }
`;