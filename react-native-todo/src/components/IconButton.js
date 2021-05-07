import React from 'react';
import { Pressable, Text } from 'react-native'
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { images } from '../images'

const Icon = styled.Image`
  tint-color: ${({ theme, completed }) => completed ? theme.done : theme.text };
  width: 30px;
  height: 30px;
  margin: 10px;
`

const IconButton = ({ type, onPressOut, id, completed }) => {
  return (
    <Pressable onPressOut={() => onPressOut(id)} hitSlop={5}>
      <Icon source={type} completed={completed} />
    </Pressable>
  );
};

IconButton.defaultProps = {
  onPressOut: () => {},
};

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
}

export default IconButton;