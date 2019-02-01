import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'

import { ListItem } from 'react-native-elements'
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

class HomeListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],//props.screenProps.allData,
      list: [],//props.screenProps.allData.length > 0 ? props.screenProps.allData.slice(0,Constants.LIMIT) :[],
      offset: 0, limit: Constants.LIMIT,
      search: '',
      currentSortOrder: 'desc',
      isFetching: false
    },
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_article', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log("data in Home List screen is", temp);
          this.setState({
            data: temp,
            list: temp.length > 0 ? temp.slice(0, Constants.LIMIT) : [],
            offset: this.state.offset + Constants.LIMIT,
            limit: this.state.limit + Constants.LIMIT
          });
        });
      });
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
    const { data } = this.state;
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
      if (currentSortOrder !== 'desc') {
        return a > b ? -1 : a < b ? 1 : 0;
      } else {
        return a < b ? -1 : a > b ? 1 : 0;
      }
    })
    this.setState({ data: data, offset: 0, list: data.slice(0, Constants.LIMIT), limit: Constants.LIMIT, currentSortOrder: this.state.currentSortOrder === 'desc' ? 'asc' : 'desc' })
  }
  onRefresh = () => {
    this.setState({ isFetching: false }, this.props.screenProps.getArticles('eng', '', '', ''));
  }
  handleArticleDetails = (id) => {

    this.props.navigation.navigate({
      routeName: 'ArticleDetailsScreen',
      params: {
        updateData: this.updateData,
        article_id: id,
        name: "helloooo"
      }
    })
  }
  updateData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_article', [], (tx, results) => {
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
  componentWillUnmount() {
    //db.close();
  }
  render() {
    const { list } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <SearchWithSort onChangeText={(searchText) => { this.handleSearch(searchText) }} onSort={() => { this.handleSort() }} />
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

          <FlatList
            ListHeaderComponent={this.showSearchBar}
            onEndReached={this.fetchResult}
            ListEmptyComponent={this.emptyResult}
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index.toString()}
            data={list}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}

            renderItem={({ item, index }) => (
              <ListItem
                roundAvatar
                avatar={item.avatar_url ? { uri: item.avatar_url } : Images.defaultAvatar}
                //avatarStyle={{resizeMode:'contain'}}
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


export default HomeListScreen;
