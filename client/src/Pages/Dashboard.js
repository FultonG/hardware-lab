import React, { useEffect, useState } from 'react';
import Container from '../Components/Container';
import { Title, Text } from '../Components/Text';
import Card from '../Components/Card';
import API from '../API';
import Loading from '../icons/loading.svg'
import styled from 'styled-components';

const Code = styled.code`
  background: #cfcfcf;
`;

const Dashboard = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    fetchBoardData()
  }, []);

  const fetchBoardData = async () => {
    try {
      let res = await API.getBoardData();
      setBoard(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <Container direction="column" padding="30px">
      <Title>Hardware Lab</Title>
      <Container>
        <Card padding="20px" width="30%" height="30%">
          {board ? (
            <Container justify="flex-start" align="unset" direction="column" >
              <Text>Board Type <Code>{board.type}</Code></Text>
              <Text>Port <Code>{board.port}</Code></Text>
            </Container>
          ) : <img src={Loading} />}
        </Card>
      </Container>
    </Container>

  )
}

export default Dashboard;