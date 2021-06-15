import styled from 'styled-components';


export const ModalBase= styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: block;
`;
export const ModalContent= styled.div`
  position:fixed;
  background: white;
  width: ${props => props.width? props.width: "40%"};
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 0 1%;
`;
