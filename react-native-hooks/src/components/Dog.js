import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { useFetch } from '../hooks/useFetch'
import Button from './Button';

const StyledImage = styled.Image`
  background-color: #7f8c8d;
  width: 300px;
  height: 300px;
`

const ErrorMessage = styled.Text`
  font-size: 18px;
  color: #e74c3c;
`

const LoadingMessage = styled.Text`
  font-size: 18px;
  color: #2ecc71;
`

const URL = 'https://dog.ceo/api/breeds/image/random'

const Dog = () => {
  const { data, error, inProgress } = useFetch(URL);

  // const onPress = useCallback(() => {
  //   ({data, error, inProgress}) = useFetch(URL)
  // })

  return (
    <>
      <Button title="refresh" onPress />
      {inProgress && (<LoadingMessage>The API request is in progress.</LoadingMessage>)}
      <StyledImage source={data?.message ? { uri: data.message } : null } /> 
      <ErrorMessage>{error?.message}</ErrorMessage>
    </>
  );
};

export default Dog;