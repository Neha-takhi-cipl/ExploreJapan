import React, { Component } from 'react'
import { ScrollView, Text, SafeAreaView,Image, View,TouchableOpacity,FlatList,ListView } from 'react-native';

import { List, ListItem} from 'react-native-elements'
import  Constants  from '../Utils/Constants'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeImageListScreenStyle'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'ArticleDatabase.db' });

class FavoriteImageListScreen extends Component {
  constructor(props){
    super(props);
   this.state={
      data: [],//props.screenProps.allData,
      list: [],//props.screenProps.allData.length > 0 ? props.screenProps.allData.slice(0,Constants.LIMIT) :[],
      offset: 0, limit: Constants.LIMIT,
      isFetching: false
    }
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_article WHERE isFavorite = ?', [true], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          data: temp,
          list: temp.length > 0? temp.slice(0,Constants.LIMIT): [],
          offset: this.state.offset + Constants.LIMIT,
          limit: this.state.limit + Constants.LIMIT
        });
      });
    });
  }

  // componentDidMount(){
  //   this.props.screenProps.getArticles('eng','','','');
  // }
  // componentWillReceiveProps(nextProps){
  //  if(!_.isEqual(this.props.screenProps.allData, nextProps.screenProps.allData)){
  //     this.setState({data: nextProps.screenProps.allData,list: nextProps.screenProps.allData.slice(0,Constants.LIMIT)});
  //   }
  // }
  componentWillUnmount(){
    //db.close();
  }
  fetchSliceData=(data)=>{
    const {offset,limit} = this.state;
    return data.slice(offset,limit);
  }
  fetchResult=()=>{
    const {offset,limit,list,data} = this.state;
    console.log("fetching",offset,limit,data)
    if(offset < data.length) {
    const chunkedData = this.fetchSliceData(data);
    this.setState({
        list: list.concat(chunkedData),
        offset: offset + Constants.LIMIT,
        limit: limit + Constants.LIMIT
    });
   }
  }
  emptyResult=()=>{
    return(
      <View style={styles.centerDiv}>
        <Text>
          No Data Found
        </Text>
      </View>
    )
  }
  onRefresh=()=>{
    this.setState({ isFetching: true },this.props.screenProps.getArticles('eng','','',''));
  }
  handleArticleDetails=(id)=>{
    this.props.navigation.navigate('ArticleDetailsScreen', {article_id: id})
  }
  render () {
    const {data} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={this.showSearchBar}
            onEndReached={this.fetchResult}
            // onEndReachedThreshold={0.9}
            ListEmptyComponent={this.emptyResult}
            style={styles.flatListStyle}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.list}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            numColumns={4}
            renderItem={({item,index}) => (
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={()=>{this.handleArticleDetails(item.article_id)}}>
                  <Image source={item.avatar_url ? {uri:item.avatar_url } : Images.defaultAvatar} style={styles.image}/>
                </TouchableOpacity>
              </View>

            )}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default (FavoriteImageListScreen);
