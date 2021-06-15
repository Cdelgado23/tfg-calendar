import styled from 'styled-components';

export const FullBody = styled.div`

    display: flex;
    flex-direction: row;
    align-items: bottom; 
    

    white-space: nowrap;
    justify-content: stretch; 

`;

export const FormGroup = styled.div`

    width:${props => props.width};
    margin: ${props => props.margin? props.margin: "0"};

    @media screen and (max-width: 1024px) {
        height: 100%;
        width:100%;
        margin: 1%;
    }
`;


export const FormBody = styled.form`

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
    border: ${props => props.border? props.border: ""};
    border-radius: 0 0 10px 10px;


`;

export const EmptySpace=styled.div`
    height: 6.5vh;
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

export const FormElementGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${props => props.margin? props.margin: "0.5vh"};
`;

export const StyledInput= styled.input`
  border-radius: "4px";
  margin: ${props => props.margin? props.margin: "0.5vh"};
  margin-bottom: 0.5em;
`;

export const StyledLabel= styled.label`
  margin: ${props => props.margin? props.margin: "0.5vh"};
`;

export const RowBody=styled.div`
    display:flex;
    flex-direction:row;
    margin: 0.5vh 0 1vh 0;

    border: 1px solid #EFEFEF;

    border-radius: 0 0 10px 10px;
    height:${props => props.height? props.height: "auto"};
    width:${props => props.width? props.width: "auto"};
`;

export const ColorButton= styled.button`
    display:block;
    text-align:center;
    height:${props => props.height? props.height: "auto"};
    width:${props => props.width? props.width: "auto"};
    border-radius: 4px;
    background: ${props => props.color || "#EFEFEF"};
    padding: ${props => props.padding || "0"};
    margin: ${props => props.margin || "0"};


    color: #FFFF;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
    transition: all 0.2s ease-in-out;
    filter: brightness(125%);
    }
`;


export const StyledInputButton= styled.input`
    display:block;
    text-align:center;
    height:${props => props.height? props.height: "auto"};
    width:${props => props.width? props.width: "auto"};
    border-radius: 4px;
    background: ${props => props.color || "#EFEFEF"};
    margin: 5%;
    color: #FFFF;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
    transition: all 0.2s ease-in-out;
    filter: brightness(125%);
    }
`;