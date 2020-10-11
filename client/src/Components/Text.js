import styled from 'styled-components';

export const Bold = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 20px;
`;

export const Text = styled.p`
font-weight: 500;
font-size: 18px;
line-height: 22px;
color: #011F3B;
margin: 0;
`;

export const Title = styled.p`
font-weight: 600;
font-size: 28px;
color: #011F3B;
`;

export const Description = styled(Text)`
  font-size: 16px;
  font-weight: 200;
  text-align: left;
  width: 80%;
`;