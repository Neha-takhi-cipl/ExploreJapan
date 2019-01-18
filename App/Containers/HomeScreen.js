import React, { Component } from 'react'
import { createBottomTabNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  Image, View, Text } from 'react-native'
import { Images } from '../Themes'
import ArticleDetailsScreen from './ArticleDetailsScreen'
import listScreen from './HomeListScreen';
import imageListScreen from './HomeImageListScreen';
import readScreen from './HomeReadScreen';
import helpScreen from './HomeHelpScreen';


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AllListsScreenStyle'

const BottomTabNavigator = createBottomTabNavigator({
  List: {
  screen: createStackNavigator({
    listScreen:{ screen: listScreen},
    ArticleDetailsScreen: { screen: ArticleDetailsScreen }

   },{
   headerMode: 'none',
    navigationOptions: {
    tabBarIcon: ({ focused }) => {
      const iconName = focused ? 'listActive' : 'listInActive';
        return (
      <View style={[styles.imageContainer]}>
        <Image source={Images[iconName]} style={styles.imageIcon}/>
      </View>
        )
    },
  }
})
},
  'Image List': {
   // screen: createStackNavigator({imageListScreen:imageListScreen}),
    screen: createStackNavigator({
      imageListScreen:{ screen: imageListScreen},
      ArticleDetailsScreen: { screen: ArticleDetailsScreen }

     },{
     headerMode: 'none',
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const iconName = focused ? 'imageListActive' : 'imageListInActive';
        return (
        <View style={[styles.imageContainer]}>
          <Image source={Images[iconName]} style={styles.imageIcon}/>
        </View>
        )
      },
    }
    })
  },
  Read:{
    screen: readScreen,

    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const iconName = focused ? 'readActive' : 'readInActive';
        return (
        <View style={[styles.imageContainer]}>
          <Image source={Images[iconName]} style={styles.imageIcon}/>
        </View>
        )
      },
    }
  },
  Help:{
    screen: helpScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const iconName = focused ? 'helpActive' : 'helpInActive';
        return (
        <View style={[styles.imageContainer]}>
          <Image source={Images[iconName]} style={styles.imageIcon}/>
        </View>
        )
      },
    }
  },

});

const mainNavigator = createStackNavigator({ BottomTabNavigator }, { headerMode: "none" })
export default createAppContainer(mainNavigator);

