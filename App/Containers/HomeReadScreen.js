import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import { List, ListItem } from 'react-native-elements'
import Constants from '../Utils/Constants'
import AudioPlayer from '../Components/AudioPlayer'
import SearchWithSort from '../Components/SearchWithSort'

import { Images } from '../Themes'

import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeListScreenStyle'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'ArticleDatabase.db' });
class HomeReadScreen extends Component {
  constructor(props) {
    super(props);
    console.log("props in read screen", props);
    //const allData = props.screenProps.list ? this.createData(props.screenProps.list): [];
    this.state = {
      data: [],//props.screenProps.allData,
      list: [],//props.screenProps.allData.length > 0 ? props.screenProps.allData.slice(0,Constants.LIMIT) :[],
      offset: 0, limit: Constants.LIMIT,
      search: '',
      currentSortOrder: 'desc',
      isFetching: false
    }
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_article WHERE isRead = ?', [true], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          data: temp,
          list: temp.length > 0 ? temp.slice(0, Constants.LIMIT) : [],
          offset: this.state.offset + Constants.LIMIT,
          limit: this.state.limit + Constants.LIMIT
        });
      });
    });
  }


  // componentWillReceiveProps(nextProps){
  //   const {data}=  this.state;
  //   if(!_.isEqual(this.props.screenProps.allData, nextProps.screenProps.allData)){
  //    this.setState({data: nextProps.screenProps.allData,  list: nextProps.screenProps.allData.slice(0,Constants.LIMIT)});
  //   }
  // }
  componentWillUnmount() {
    //db.close();
  }
  handlePlayPause = (i, callback) => {
    const { data } = this.state;
    const currStat = data[i].isPlay;
    data.map((d, innerI) => {
      if (i === innerI) {
        data[i].isPlay = !data[i].isPlay;
      } else {
        if (currStat === false) {
          data[innerI].isPlay = false;
        }
      }
    })
    //data[i].isPlay= !data[i].isPlay;
    this.setState({ data: data }, () => { callback() });
  }
  fetchSliceData = (data) => {
    const { offset, limit } = this.state;
    return data.slice(offset, limit);
  }
  fetchResult = () => {
    const { offset, limit, list, data } = this.state;
    console.log("fetching", offset, limit, data)
    if (offset < data.length) {
      const chunkedData = this.fetchSliceData(data);
      this.setState({
        list: list.concat(chunkedData),
        offset: offset + Constants.LIMIT,
        limit: limit + Constants.LIMIT
      });
    }
  }
  emptyResult = () => {
    return (
      <View style={styles.centerDiv}>
        <Text>
          No Data Found
        </Text>
      </View>
    )
  }
  handleSearch = (searchText) => {
    const { data, list } = this.state;
    const filterData = data.filter((item, i) => {
      return (item['title'].toLowerCase().search(searchText.toLowerCase()) !== -1)
    });
    this.setState({ list: filterData, search: searchText })
  }

  handleSort = () => {
    const { data, currentSortOrder } = this.state;
    data.sort((a, b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      console.log("currentSortOrder", currentSortOrder)
      if (currentSortOrder === 'desc') {
        return a > b ? -1 : a < b ? 1 : 0;
      } else {
        return a < b ? -1 : a > b ? 1 : 0;
      }
    })
    console.log("sorted data", data)
    this.setState({ data: data, offset: 0, list: data.slice(0, Constants.LIMIT), limit: Constants.LIMIT, currentSortOrder: this.state.currentSortOrder === 'desc' ? 'asc' : 'desc' })
  }
  onRefresh = () => {
    this.setState({ isFetching: true }, this.props.screenProps.getArticles('eng', '', '', ''));
  }
  handleArticleDetails = (id) => {

    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'ArticleDetailsScreen',
    //   action: NavigationActions.navigate({ params :{id: id},routeName: 'ArticleDetailsScreen'})
    // })
    // //this.props.navigation.setParams({ id: id });
    //  this.props.navigation.dispatch(navigateAction);
    this.props.navigation.navigate({
      routeName: 'ArticleDetailsScreen',
      params: {
        updateData: this.updateData,
        article_id: id,
        name: "helloooo"
      }

    })
    //this.props.navigation.navigate('ArticleDetailsScreen', {article_id: id})
  }
  updateData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_article WHERE isRead = ?', [true], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          data: temp,
          list: temp.length > 0 ? temp.slice(0, Constants.LIMIT) : [],
          offset: this.state.offset + Constants.LIMIT,
          limit: this.state.limit + Constants.LIMIT
        });
      });
    });
  }
  render() {
    const { data, search } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SearchWithSort onChangeText={(searchText) => { this.handleSearch(searchText) }} onSort={(type) => { this.handleSort(type) }} />
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

          <FlatList
            ListHeaderComponent={this.showSearchBar}
            onEndReached={this.fetchResult}
            // onEndReachedThreshold={0.9}
            ListEmptyComponent={this.emptyResult}
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.list}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}

            renderItem={({ item, index }) => (
              <ListItem
                roundAvatar
                avatar={item.avatar_url ? { uri: item.avatar_url } : Images.defaultAvatar}
                key={item.id}
                title={`${item.titleNo}. ${item.title}`}
                onPress={() => { this.handleArticleDetails(item.article_id) }}
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>{`${item.date} ${item.time}`}</Text>
                    {
                      item.isAudio === 1 && (
                        <View>
                          <TouchableOpacity>
                            <AudioPlayer url={item.audio_url} isPlay={item.isPlay} onPress={(callback) => { this.handlePlayPause(index, callback) }} />
                          </TouchableOpacity>
                        </View>
                      )
                    }
                  </View>
                }
              />
            )}
          />

        </View>
      </View>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     list : state.articles.articleList ? state.articles.articleList.data : []
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getArticles: (lang, rpp, page, title) => {
//       dispatch(ArticleActions.articleRequest(lang, rpp, page, title))
//     }
//   }

// }

export default HomeReadScreen;
