import React from 'react';
import styled from 'styled-components/native';

import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './navigations/Stack';
import TabNavigation from './navigations/Tab';

const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;