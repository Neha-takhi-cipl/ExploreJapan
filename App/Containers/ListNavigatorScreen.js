import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView,View } from 'react-native'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import TagsList from './TagsListScreen';
import FavoriteList from './FavoriteListScreen';
import Header from '../Components/Header';
import TopTabs from '../Components/TopTabs';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// StylesS
import styles from './Styles/ListNavigatorScreenStyle'
const TabNavigator = createMaterialTopTabNavigator({
  All: { screen: HomeScreen },
  Favorites: { screen: FavoriteList },
  Tags:{screen:TagsList},

},{
  tabBarOptions: {
    tabStyle: {
      backgroundColor: 'white',
    },
    style: {

    },
    labelStyle: {
      fontWeight: 'bold',
      color: 'red'
    }
  }
});

const Tabs =  createAppContainer(TabNavigator);
// export default  createStackNavigator({
//   watchTopTabNavigator: TabNavigator
// }, {
//   navigationOptions: {
//      headerTitle: < Header>hiiii</Header>
//   }
// });


export default class ListNavigatorScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      tabVal: 1
    }
  }
  render () {
    const tabsData = [
      {value:1, title: 'All'},
      {value:2, title: 'Favorites'},
      {value:3, title: 'Tags'}
    ];
    const {tabVal} = this.state;
    return (
    <View style={styles.mainContainer}>
    <View>
    <Header>
        <TopTabs data={tabsData} handleTab={(val)=>{this.setState({tabVal: val})}} value={tabVal}/>
    </Header>
    </View>
     {tabVal === 1 && <View style={styles.screenContainer}><HomeScreen/></View>}
     {tabVal === 2 && <View style={styles.screenContainer}><FavoriteList/></View>}
     {tabVal === 3 && <View style={styles.screenContainer}><TagsList/></View>}
    </View>
    )
  }
}
