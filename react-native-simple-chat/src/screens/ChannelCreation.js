import React from 'react';
import { Text, Button } from 'react-native'
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const ChannelCreation = ({ navigation }) => {
  return (
    <Container>
      <Text styled={{ fontSize: 24 }}>Channel Creation</Text>
      <Button title="Channel" onPress={() => navigation.navigate('Channel')}></Button>
    </Container>
  );
};

export default ChannelCreation;