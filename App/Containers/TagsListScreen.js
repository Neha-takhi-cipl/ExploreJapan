import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  Image, View, Text } from 'react-native'
import { Images } from '../Themes'
import listScreen from './TagListScreen';
import imageListScreen from './TagImageListScreen';
import readScreen from './TagReadListScreen';
import helpScreen from './TagHelpScreen';
import ArticleActions from '../Redux/ArticleRedux';

import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AllListsScreenStyle'

const BottomTabNavigator = createBottomTabNavigator({
  List: {
    screen: listScreen,
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
},
  'Image List': {
    screen: imageListScreen,
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


const AppContainer = createAppContainer(BottomTabNavigator);
class App extends React.Component {
  constructor(props){
    super(props);
   this.state={
      data: [], loading: true
    }
  }
  componentDidMount(){
   this.props.getArticles('eng','','','');
  }
  createData=(data)=>{
    const tempData = [];
    (data || []).map((item)=>{
      let tempObj = {
        id: item.article_id || '',
        title: item.article_title || '',
        titleNo: item.article_title_number || '',
        date: item.article_date || '',
        time: item.article_time || '',
        avatar_url: item.article_image || '',
        isAudio: item.article_audio ? true : false,
        isPlay: false,
        audio_url :item.article_audio || '',
        type: item.article_type || ''
      }
      tempData.push(tempObj)
    });
    tempData.sort((a,b)=>{
      a = new Date(a.date);
      b = new Date(b.date);
      return a>b ? -1 : a<b ? 1 : 0;
     })
    return tempData;
  }

  componentWillReceiveProps(nextProps){
    const {data}=  this.state;
    if(!_.isEqual(this.props.list, nextProps.list)){
      const allData = this.createData(nextProps.list);
      this.setState({data: allData, loading:false});
    } else {
      if(this.props.list){
        this.setState({loading:false})
      }
    }
  }

  stopLoader=()=>{
    this.setState({loading: false})
  }
  render() {
    const params = {
      allData :this.state.data.length > 0 ? this.state.data :[],
      loading: this.state.loading,
      getArticles: this.props.getArticles
    }
   return (
     <AppContainer
      screenProps={params }
      />

    );
  }
}
const mapStateToProps = (state) => {
  return {
    list : state.articles.articleList ? state.articles.articleList.data: []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: (lang, rpp, page, title) => {
      dispatch(ArticleActions.articleRequest(lang, rpp, page, title))
    }
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(App)
