import React from 'react';
import { Pressable, Text } from 'react-native'
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { images } from '../images'

const Icon = styled.Image`
  tint-color: ${({ theme }) => theme.text};
  width: 30px;
  height: 30px;
  margin: 10px;
`

const IconButton = ({ type, onPressOut, id }) => {
  const _onPressOut = () => {
    console.log(111, id)
    console.log(typeof id)
    onPressOut(id);
  }

  return (
    <Pressable onPressOut={_onPressOut} hitSlop={50}>
      <Icon source={type} />
      {/* 이부분 밑에 텍스트 엘리먼트가 있으면 정상 작동 하는데 없으면 제대로 작동하지 않습니다. */}
      <Text></Text> 
    </Pressable>
  );
};

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string
}

export default IconButton;