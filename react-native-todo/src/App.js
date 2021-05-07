import React, { useState } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppLoading } from 'expo'
import { theme } from './theme'

import Input from './components/Input'
import IconButton from './components/IconButton'
import Task from './components/Task'

const createBulkTask = limit => {
  let obj = {};
  for(let i=0; i<limit; i++) {
    obj = {
      ...obj,
      [`${i}`]: {
        id: `${i}`,
        text: `text${i}`,
        completed: i%2 === 0 ? true : false
      }
    }
  }

  return obj;
}

const currentObject = obj => {
  return Object.assign({}, obj)
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
  const [tasks, setTasks] = useState(createBulkTask(12));

  const width = useWindowDimensions().width;

  const saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks)
    } catch (error) {
      console.error(error)
    }
  }

  const loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'))
  }

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
    // setTasks({ ...tasks, ...newTaskObject });
    saveTasks({ ...tasks, ...newTaskObject });
  }

const deleteTask = id => {
  const currentTasks = Object.assign({}, tasks);
  delete currentTasks[id];
  // setTasks(currentTasks);
  saveTasks(currentTasks);
}

const toggleTask = id => {
  console.log(id)
  const currentTasks = Object.assign({}, tasks);
  currentTasks[id]['completed'] = !currentTasks[id]['completed'];
  // setTasks(currentTasks)
  saveTasks(currentTasks)
}

const updateTask = item => {
  const currentTasks = Object.assign({}, tasks);
  currentTasks[item.id] = item;
  // setTasks(currentTasks);
  saveTasks(currentTasks);
};

  const handleTextChange = text => {
    setNewTask(text)
  }

  const onBlur = () => {
    setNewTask('');
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
          onChangeText={handleTextChange}
          onSubmitEditing={addTask}
          onBlur={onBlur}
        />
        <List width={width}>
        {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                updateTask={updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default App;