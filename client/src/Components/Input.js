
import styled from 'styled-components';
import Dropdown from '../images/dropdown.svg'
const Input = styled.input`
  background: #FFFFFF;
  border: 1px solid #D1D1D1;
  box-sizing: border-box;
  border-radius: 5px;
  min-height: 40px;
  width: 100%;
  padding: 16px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
  color: #011F3B;
  &.selector {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; 
    background-image: url(${Dropdown});
    background-position: center right;
    background-repeat: no-repeat;
  }
`;

export default Input;