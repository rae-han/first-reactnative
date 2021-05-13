import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const Channel = () => {
  return (
    <Container>
      <Text>channel</Text>
    </Container>
  );
};

export default Channel;