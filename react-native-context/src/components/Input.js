import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import UserContext, { UserConsumer } from '../contexts/User'

const StyeldInput = styled.TextInput`
  border: 1px solid #606060;
  width: 250px;
  padding: 10px 15px;
  margin: 10px;
  font-size: 24px;
`

const Input = () => {
  const [name, setName] = useState('');
  const { dispatch } = useContext(UserContext) 


  return (
    <StyeldInput 
      value={name}
      onChangeText={text => setName(text)}
      onSubmitEditing={() => {
        dispatch(name);
        setName('');
      }}
      placeholder="Enter a name..."
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
    />
    // <UserConsumer>
    //   {({ dispatch  }) => {
    //     return (
    //       <StyeldInput
    //         value={name}
    //         onChangeText={text => setName(text)}
    //         onSubmitEditing={() => {
    //           dispatch(name);
    //           setName('');
    //         }}
    //         placeholder="Enter a name..."
    //         autoCapitalize="none"
    //         autoCorrect={false}
    //         returnKeyType="done"
    //       />
    //     )
    //   }}
    // </UserConsumer>
  );
};

export default Input;