import { createStackNavigator, createAppContainer } from 'react-navigation'
import FavoriteReadListScreen from '../Containers/FavoriteReadListScreen'
import FavoriteImageListScreen from '../Containers/FavoriteImageListScreen'
import FavoriteScreen from '../Containers/FavoriteScreen'
// import ArticleDetailsScreen from '../Containers/ArticleDetailsScreen'
import TagHelpScreen from '../Containers/TagHelpScreen'
import TagReadListScreen from '../Containers/TagReadListScreen'
import TagImageListScreen from '../Containers/TagImageListScreen'
import TagListScreen from '../Containers/TagListScreen'
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
  FavoriteReadListScreen: { screen: FavoriteReadListScreen },
  FavoriteImageListScreen: { screen: FavoriteImageListScreen },
  FavoriteScreen: { screen: FavoriteScreen },
  //ArticleDetailsScreen: { screen: ArticleDetailsScreen },
  TagHelpScreen: { screen: TagHelpScreen },
  TagReadListScreen: { screen: TagReadListScreen },
  TagImageListScreen: { screen: TagImageListScreen },
  TagListScreen: { screen: TagListScreen },
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
  initialRouteName: 'ListNavigatorScreen',

  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
