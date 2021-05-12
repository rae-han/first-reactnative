import React, { useState, useRef, useEffect } from 'react';
// import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
// import { Text, Button } from 'react-native';
import { Image, Input, Button } from '../components'
import { images } from '../utils/images'
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top }}) => top}px;
  padding-bottom: ${({ insets: { bottom }}) => bottom}px;
`
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true)

  const passwordRef = useRef();
  const insets = useSafeAreaInsets();

  const handleEmailChage = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);

    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    )
  };
  const handlePasswordChange = password => {
    setPassword(removeWhitespace(password))
  }

  const handleLoginButtonPress = () => {};

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets={insets}>
        <Image url={images.logo} imageStyle={{ borderRadius: 8 }}/>
        <Input 
          label="Email"
          value={email}
          onChangeText={handleEmailChage}
          // onChangeText={text => setEmail(text)}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input 
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={handlePasswordChange}
          // onChangeText={text => setPassword(text)}
          onSubmitEditing={handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button title="Login" onPress={handleLoginButtonPress} />
        <Button 
          title="Signup" 
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
          disalbed={disabled}
        ></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;