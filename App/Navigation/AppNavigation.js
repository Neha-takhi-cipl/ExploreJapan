import { createStackNavigator, createAppContainer } from 'react-navigation'
import ListNavigatorScreen from '../Containers/ListNavigatorScreen'
import TagsListScreen from '../Containers/TagsListScreen'
import FavoriteListScreen from '../Containers/FavoriteListScreen'
import AllListsScreen from '../Containers/AllListsScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  ListNavigatorScreen: { screen: ListNavigatorScreen },
  TagsListScreen: { screen: TagsListScreen },
  FavoriteListScreen: { screen: FavoriteListScreen },
  AllListsScreen: { screen: AllListsScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  allListsRoute:'AllListsScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
