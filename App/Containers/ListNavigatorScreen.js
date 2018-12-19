import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import TagsList from './TagsListScreen';
import FavoriteList from './FavoriteListScreen';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// StylesS
import styles from './Styles/ListNavigatorScreenStyle'
const TabNavigator = createMaterialTopTabNavigator({
  All: { screen: HomeScreen },
  Favorites: { screen: FavoriteList },
  Tags:{screen:TagsList}
});

export default createAppContainer(TabNavigator);
