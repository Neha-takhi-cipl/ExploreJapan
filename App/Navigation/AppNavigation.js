import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeHelpScreen from '../Containers/HomeHelpScreen'
import HomeReadScreen from '../Containers/HomeReadScreen'
import HomeImageListScreen from '../Containers/HomeImageListScreen'
import HomeListScreen from '../Containers/HomeListScreen'
import ListNavigatorScreen from '../Containers/ListNavigatorScreen'
import TagsListScreen from '../Containers/TagsListScreen'
import FavoriteListScreen from '../Containers/FavoriteListScreen'
import HomeScreen from '../Containers/HomeScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  HomeHelpScreen: { screen: HomeHelpScreen },
  HomeReadScreen: { screen: HomeReadScreen },
  HomeImageListScreen: { screen: HomeImageListScreen },
  HomeListScreen: { screen: HomeListScreen },
  ListNavigatorScreen: { screen: ListNavigatorScreen },
  TagsListScreen: { screen: TagsListScreen },
  FavoriteListScreen: { screen: FavoriteListScreen },
  HomeScreen: { screen: HomeScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',

  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
