import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images'
import { Text } from 'react-native';

import Input from './Input'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({completed}) => completed ? 'line-through' : 'none'};
`

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text)

  const handleUpdateButtonPress = () => {
    setIsEditing(true)
  }

  const onSubmitEditing = () => {
    if(isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask)
    }
  }

  const onBlur = () => {
    if(isEditing) {
      setIsEditing(false);
      setText(item.text)
    }
  }

  return isEditing ? (
    <Input 
      value={text}
      onChangeText={text => setText(text)}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  ) : (
    <Container>
      <IconButton 
        type={item.completed ? images.completed : images.uncompleted} 
        id={item.id}
        onPressOut={toggleTask} 
      />
      <Text>{item.completed}</Text>
      <Contents completed={item.completed}>{item.text}</Contents>
      {item.completed || <IconButton type={images.update} onPressOut={handleUpdateButtonPress} />}
      <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} />
    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
}

export default Task;


