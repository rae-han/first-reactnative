import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native'

const StyeldTextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false
})`
  border: 1px solid #757575;
  padding: 10px;
  margin: 10px 0;
  width: 200px;
  font-size: 20px;
`

const StyledText = styled.Text`
  font-size: 24px;
  margin: 10px;
`

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const refName = useRef(null);
  const refEmail = useRef(null);

  useEffect(() => {
    console.log('Form Component Mount')
    refName.current.focus();

    return () => {
      console.log('Form Component Unmount')
    }
  }, [])

  useEffect(() => {
    console.log(`name: ${name}, email: ${email}\n`)
  }, [name, email])

  return (
    <>
      <StyledText>Name: {name}</StyledText>
      <StyledText>Email: {email}</StyledText>
      <StyeldTextInput 
        value={name}
        onChangeText={text => setName(text)}
        onSubmitEditing={() => refEmail.current.focus()}
        ref={refName}
        returnKeyType="next"
        placeholder="name"
      />
      <StyeldTextInput 
        value={email}
        onChangeText={text => setEmail(text)}
        ref={refEmail}
        placeholder="email"
      />
    </>
  );
};

export default Form;