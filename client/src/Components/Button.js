import styled from 'styled-components';

const Button = styled.button`
  ${({margin}) => margin && `margin: ${margin};`}
  color: white;
  background: #0085ff;
  border-radius: 10px;
  width: 150px;
  height: 35px;
  border: 0;
  font-size: 14px;
  &:hover {
    background: #0085ffe0;
  }
  &:hover {
    border: none;
    cursor: pointer;
  }
  &:disabled {
    background: #012e3b4a;
  }
`;

export default Button;