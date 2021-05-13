import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components'
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from '../utils/images'
import { ProgressContext } from '../contexts'


// import { signup } from '../api/auth';
import { signup } from '../utils/firebase'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  /* padding: 0 20px; */
  padding: 40px 20px;
`
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`

const Signup = () => {
  const { dispatch } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(images.photo)

  const { spinner } = useContext(ProgressContext)

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if(didMountRef.current) {
      let tempErrorMessage = '';
      if(!name) {
        tempErrorMessage = 'Please enter your name.';
      } else if(!validateEmail(email)) {
        tempErrorMessage = 'Please verify your email.';
      } else if(password.length < 6) {
        tempErrorMessage = 'The password must contain 6 characters at least.';
      } else if(password !== passwordConfirm) {
        tempErrorMessage = 'Passwords need to match.';
      } else {
        tempErrorMessage = ''
      }
  
      setErrorMessage(tempErrorMessage)
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm])

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage])

  const handleSignupButtonPress = async () => {
    // let user = await signup({
    //   username: name,
    //   password
    // });

    // if(user?.status === 200) {
    //   Alert.alert('Join Success', user.data.username)
    // } else {
    //   Alert.alert('Join Failure', user?.response.data)
    // }
    try {
      spinner.start();
      const user = await signup({ email, password, name, photoUrl })
      dispatch(user);
      // console.log(user);
      // Alert.alert('Signup Success', user.email);
    } catch (error) {
      Alert.alert('Signup Error', error.message)
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
    >
      <Container>
        <Image 
          rounded 
          url={photoUrl} 
          showButton
          onChangeImage={url => setPhotoUrl(url)}
        />
        <Input
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />
        <Input
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={text => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={handleSignupButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Signup"
          onPress={handleSignupButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  )
}

export default Signup;