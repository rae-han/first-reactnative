import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import TabScreens, { Mail, Meet, Settings } from '../screens/TabScreens'

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Settings" 
      tabBarOptions={{ 
        labelPosition: 'beside-icon', 
        showLabel:false,
        style: {
          backgroundColor: 'skyblue',
          borderTopColor: '#fff',
          borderTopWidth: 2,
        },
        activeTintColor: '#fff',
        inactiveTintColor: '#cfcfcf'
      }}
    >
      <Tab.Screen 
        name="Mail" 
        component={Mail} 
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: props => TabIcon({ ...props, name: props.focused ? 'email' : 'email-outline' }),
        }}
      />
      <Tab.Screen 
        name="Meet" 
        component={Meet} 
        options={{
          tabBarIcon: props => TabIcon({ ...props, name: props.focused ? 'video' : 'video-outline' }),
        }}
      />
      <Tab.Screen 
        name="TabScreens" 
        component={TabScreens} 
        options={{
          tabBarIcon: props => TabIcon({ ...props, name: 'monitor' }),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          tabBarIcon: props => TabIcon({ ...props, name: 'account-settings' }),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;