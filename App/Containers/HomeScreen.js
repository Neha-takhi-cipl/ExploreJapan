import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import listScreen from './HomeListScreen';
import imageListScreen from './HomeImageListScreen';
import readScreen from './HomeReadScreen';
import helpScreen from './HomeHelpScreen';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
//import styles from './Styles/AllListsScreenStyle'

const BottomTabNavigator = createBottomTabNavigator({
  list: { 
    screen: listScreen, 
    navigationOptions: {
    tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-list${focused ? '' : '-box'}`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }
},
  'image list': { 
    screen: imageListScreen ,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `ios-image${focused ? '' : 's'}`;
          return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }
  },
  read:{
    screen: readScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
          const iconName = `ios-book`;
          return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }
  },
  help:{
    screen: helpScreen,
    navigationOptions: {
      tabBarIcon: ({  tintColor }) => {
          const iconName = `ios-bulb`;
          return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }
  },
  
});

export default createAppContainer(BottomTabNavigator);
