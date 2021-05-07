import React from 'react';
import { TextPropTypes, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

// const StyledInput = styled.TextInput`
const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  /* width: 100%; */
  width: ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 25px;
  color: ${({ theme }) => theme.text};
`

const Input = ({ placeholder, value, onChangeText, onSubmitEditing, onBlur }) => {
  const width = useWindowDimensions().width

  return (
    <StyledInput 
      width={width} placeholder={placeholder} maxLength={50} 
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance="dark"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    ></StyledInput>
  );
};

Input.prototype = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}

export default Input;