import React, { useState } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import { images } from './images';

import Input from './components/Input'
import IconButton from './components/IconButton'
import Task from './components/Task'

const createBulkTask = () => {
  let obj = {};
  for(let i=0; i<3; i++) {
    obj = {
      ...obj,
      [`${i}`]: {
        id: `${i}`,
        text: `text${i}`,
        complete: i%2 === 0 ? true : false
      }
    }
  }

  return obj;
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`

const App = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState(createBulkTask);
  console.log(Object.values(tasks))

  const width = useWindowDimensions().width;

  const addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: {
        id: ID,
        text: newTask,
        completed: false
      },
    }
    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
  }

  const deleteTask = id => {
    console.log(id)
    const currentTasks = Object.assign({}, tasks);
    // delete currentTasks[id];
    setTasks(currentTasks);
  }

  const _handleTextChange = text => {
    setNewTask(text)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar 
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>Han's TODO List</Title>
        <Input 
          placeholder="+ Add a Task" 
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={addTask}
          deleteTask={deleteTask}
        />
        <List width={width}>
          {Object.values(tasks).reverse().map(item => <Task key={item.id} item={item} deleteTask={deleteTask} />)}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default App;