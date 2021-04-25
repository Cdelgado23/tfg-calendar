import styled from 'styled-components';

export const FullBody = styled.div`

    display: flex;
    flex-direction: row;
    align-items: bottom; 
    
    width: 100%;
    height:75vh;
    margin: 0.5vh 0;

    white-space: nowrap;
    justify-content: stretch; 

`;

export const FormGroup = styled.div`

    width:${props => props.width};
    margin: ${props => props.margin? props.margin: 0};

`;


export const FormBody = styled.form`
    margin: 0.5vh 0 1vh 0;

    display:flex;
    flex-direction:column;
    align-items: bottom;
    border: 1px solid #EFEFEF;

    border-radius: 0 0 10px 10px;

    height:${props => props.height};
`;

export const EmptySpace=styled.div`
    height: 4vh;
`;

export const Header= styled.div`
    display: flex;
    align-items: center;
    white-space: nowrap;
    background: #EFEFEF;
    color: #00000;

    border-radius: 10px 10px 0 0;
    justify-content: center;
    padding: 5px 11px;
`;
