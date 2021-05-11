import React from 'react';
import styled from 'styled-components/native'

const Contaienr = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #54b7f9;
`
const StyledText = styled.Text`
  font-size: 30px;
  color: white;
`

export const Mail = () => {
  return (
    <Contaienr>
      <StyledText>Mail</StyledText>
    </Contaienr>
  )
}
export const Meet = () => {
  return (
    <Contaienr>
      <StyledText>Meet</StyledText>
    </Contaienr>
  )
}
export const Settings = () => {
  return (
    <Contaienr>
      <StyledText>Settings</StyledText>
    </Contaienr>
  )
}

const TabScreens = () => {
  return <Contaienr>
    <StyledText>TabScreens</StyledText>
  </Contaienr>;
};

export default TabScreens;