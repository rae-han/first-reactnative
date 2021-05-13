import React, { useState, useRef, useEffect, useContext } from 'react';
// import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
import { Alert } from 'react-native';
import { Image, Input, Button } from '../components'
import { images } from '../utils/images'
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ProgressContext, UserContext } from '../contexts'

// import { login } from '../api/auth'
import { login } from '../utils/firebase'

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

// # =>
const Login = ({ navigation }) => {
  const { dispatch } = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true)
  const { spinner } = useContext(ProgressContext);

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

  const handleLoginButtonPress = async () => {
    // let user = await login({
    //   username: email,
    //   password: password
    // })

    // if(user.status === 200) {
    //   Alert.alert('Login Success', user.data.username)
    // } else {
    //   Alert.alert('Login Failure', user.response.data)
    // }
    try {
      spinner.start();
      const user = await login({ email, password });
      dispatch(user)
      // Alert.alert('Login Success', user.email);
    } catch (error) {
      Alert.alert('Login Error', error.message)
    } finally {
      spinner.stop();
    }
  };

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
        <Button 
          title="Login" 
          onPress={handleLoginButtonPress} 
          // disabled={disabled}
        />
        <Button 
          title="Signup" 
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        ></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;