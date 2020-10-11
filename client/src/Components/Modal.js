
import styled from 'styled-components';

const Modal = styled.div(({show}) => `
  display: ${show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`);

export default Modal;