import React, { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons'

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`
const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 :  0)}px;
`

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imageButtonBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
const ButtonIcon = styled(MaterialIcons).attrs({
  name: 'photo-camera',
  size: 22,
})`
  color: ${({ theme }) => theme.imageButtonIcon};
`;
const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  )
}

const Image = ({ url = undefined, imageStyle, rounded = false, showButton = false, onChangeImage }) => {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS !== 'web') {
          const { 
            status 
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (status !== 'granted') {
            Alert.alert(
              'Photo Permission',
              'Please turn on the camera roll permissions.'
            )
          }
        }
      } catch (error) {
        Alert.alert('Photo Permission Error', error.message)
      }
    })();
  }, []);

  const handleEditButton = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if(!result.cancelled) {
        onChangeImage(result.uri)
      }
    } catch (error) {
      Alert.alert('Photo Error', e.message);
    }
  }

  return (
    <Container>
      <StyledImage source={ typeof url === 'string' ? { uri: url } : url } style={imageStyle} rounded={rounded} />
      {showButton && <PhotoButton onPress={handleEditButton} />}
    </Container>
  );
};

Image.defaultProps = {
  onChangeImage: () => {}
}

Image.propTypes = {
  uri: PropTypes.string,
  imageStyle: PropTypes.object,
}

export default Image;