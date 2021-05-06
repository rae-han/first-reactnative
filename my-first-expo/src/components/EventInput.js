import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native'

const EventInput = () => {
  const [text, setText] = useState('b');
  const _onChange = event => {
    setText(event.nativeEvent.text);
  }

  return (
    <View>
      <Text>text: {text}</Text>
      <TextInput
        placeholder="Enter a text..."
        onChange={_onChange}
      />
    </View>
  );  
};

export default EventInput;