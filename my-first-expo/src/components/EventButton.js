import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native'

const EventButton = () => {
  const _onPressIn = () => console.log('Press In !!! \n');
  const _onPressOut = () => console.log('Press Out !!! \n');
  const _onPress = () => console.log('Press !!! \n');
  const _onLongPress = () => console.log('Long Press !!! \n');

  return (
    <Pressable
      style={styles.button}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      onPress={_onPress}
      onLongPress={_onLongPress}
    >
      <Text style={styles.text}>Press</Text>  
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f1c40f',
    padding: 16,
    margin: 10,
    borderRadius: 8
  },
  text: {
    color: 'white',
    fontSize: 24
  }
})

export default EventButton;