import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Switch } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native'

import { theme, lightTheme, darkTheme } from './styles/theme'

import CustomButton from './components/CustomButton'
import EventButton from './components/EventButton'
import EventInput from './components/EventInput'

const AppContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const _toggleSwitch = () => setIsDark(!isDark)

  return (
    <ThemeProvider theme={isDark? darkTheme : lightTheme}>
      <AppContainer>
        <View style={styles.container}>
          <Switch value={isDark} onValueChange={_toggleSwitch} />
          <Text style={styles.title}>My First Nativeaaaaaaa</Text>
          <Button title="Button" onPress={() => alert('click !!!')} />
          <CustomButton title="Button" onPress={() => console.log('Press me!')}>children</CustomButton>
          <EventButton />
          <EventInput />
        </View>
      </AppContainer>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  }
})

export default App;