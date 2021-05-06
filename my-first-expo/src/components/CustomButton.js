import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native'

const CustomButton = ({ title, children, onPress }) => {

  return (
    <Pressable
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}/{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 24
  }
})

export default CustomButton;