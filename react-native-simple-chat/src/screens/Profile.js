import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { Button, Image, Input } from '../components';
import { logout, getCurrentUser, updateUserPhoto } from '../utils/firebase';
import { UserContext, ProgressContext } from '../contexts';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = () => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);

  const user = getCurrentUser();
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
    } catch (error) {
      console.log('[Profile] logout: ', error.message);      
    } finally {
      dispatch({})
      spinner.stop();
    }
  }

  const handlePhotoChange = async url => {
    try {
      spinner.start();
      const updatedUser = await updateUserPhoto(url);
      setPhotoUrl(updatedUser.photoUrl);
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <Container>
      <Image
        url={photoUrl}
        onChangeImage={handlePhotoChange}
        showButton
        rounded
      />
      <Input label="Name" value={user.name} disabled />
      <Input label="Email" value={user.email} disabled />
      <Button 
        title="logout"
        onPress={handleLogoutButtonPress}
        containerStyle={{
          marginTop: 30,
          backgroundColor: theme.buttonLogout,
        }}
      />
    </Container>
  );
};

export default Profile;