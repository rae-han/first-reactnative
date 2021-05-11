import React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Home from '../screens/Home'
import List from '../screens/List'
import Item from '../screens/Item'

const Stack = createStackNavigator();

const StackNavigation = () => {
  const screenOptions = {
    cardStyle: {
      backgroundColor: '#fff'
    },
    // headerShown: false,
    headerStyle: {
      height: 110,
      backgroundColor: '#95a5a6',
      borderBottomWidth: 5,
      borderBottomColor: '#34495e',
    },
    headerTitle: ({style}) => (
      <MaterialCommunityIcons name='react' style={style} />
    ),
    headerTitleStyle: { color: '#fff', fontSize: 24 },
    headerTitleAlign: 'center',
    headerBackImage: ({ tintColor }) => {
      const style = {
        marginRight: 5,
        marginLeft: Platform.OS === 'ios' ? 11: 0,
      };
      return (
        <MaterialCommunityIcons 
          name="keyboard-backspace"
          size={30}
          color={tintColor}
          style={style}
        />
      )
    }
  }

  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={screenOptions}
    >
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="List" 
        options={{ 
          headerTitle: 'List Screen',
          headerBackTitleVisible: true,
          headerBackTitle: 'Prev',
          headerTitleStyle: { fontSize: 24 },
          headerTintColor: 'white'
        }}
        component={List} 
      />
      <Stack.Screen name="Item" component={Item} />
      <Stack.Screen name="Detail" component={Item} />
    </Stack.Navigator>
  );
};

export default StackNavigation;