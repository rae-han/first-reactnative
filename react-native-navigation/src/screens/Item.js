import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Item = ({ navigation, route }) => {
  const { id, name } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: '#fff',
      headerLeft: ({ onPress, tintColor }) => {
        return (
          <MaterialCommunityIcons 
            name="keyboard-backspace"
            size={30}
            style={{ marginLeft: 11 }}
            onPress={onPress}
          />
        )
      },
      headerRight: ({ tintColor }) => {
        return (
          <MaterialCommunityIcons 
            name="home-variant"
            size={30}
            style={{ marginRight: 11 }}
            color={tintColor}
            onPress={() => navigation.popToTop()}
          />
        )
      }
    })
  })

  return (
    <Container>
      <StyledText>Item</StyledText>
      <StyledText>ID: {id}</StyledText>
      <StyledText>Name: {name}</StyledText>
    </Container>
  );
};

export default Item;