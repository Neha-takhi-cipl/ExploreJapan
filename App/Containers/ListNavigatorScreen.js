import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import TagsList from './TagsListScreen';
import FavoriteList from './FavoriteScreen';
import Header from '../Components/Header';
import TopTabs from '../Components/TopTabs';
import ArticleActions from '../Redux/ArticleRedux';

import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// StylesS
import styles from './Styles/ListNavigatorScreenStyle'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'ArticleDatabase.db' });

export class ListNavigatorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabVal: 1
    },
      db.transaction(function (txn) {
        //txn.executeSql('DROP TABLE IF EXISTS table_article', []);

        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_article'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS table_article', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_article (id INTEGER PRIMARY KEY AUTOINCREMENT, article_id INTEGER UNIQUE ON CONFLICT REPLACE, title VARCHAR(20), titleNo VARCHAR(20), date VARCHAR(20), time  VARCHAR(20), avatar_url VARCHAR(255), isAudio BOOLEAN, isPlay BOOLEAN, audio_url VARCHAR(255),type VARCHAR(20), isFavorite BOOLEAN, isRead BOOLEAN, description VARCHAR(5000))',
                []
              );
            }
          }
        );

        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_tags'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS table_tags', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_tags (id INTEGER PRIMARY KEY AUTOINCREMENT, article_id INTEGER, title VARCHAR(20) UNIQUE ON CONFLICT REPLACE)',
                []
              );
            }
          }
        );
      });

  }
  componentDidMount() {
    console.log("ListNavigatorScreen", this.props)
    this.props.getArticles('eng', '', '', '');
    this.props.setHeaderShow(false)
  }
  createData = (data) => {
    (data || []).map((item) => {

      db.transaction(function (tx) {
        tx.executeSql(
          "INSERT OR REPLACE INTO table_article (article_id, title, titleNo, date, time, avatar_url, isAudio, isPlay, audio_url, type, isFavorite,isRead, description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [item.article_id, item.article_title, item.article_title_number, item.article_date, item.article_time, item.article_image, item.article_audio ? true : false, false, item.article_audio, item.article_type, false, false, item.article_text],
          (tx, results) => {
            if (!results.rowsAffected > 0) {
              alert('Article fetching Failed');
            } else {
              console.log("inserted")
            }
          }
        );
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // const {data}=  this.state;
    if (!_.isEqual(this.props.list, nextProps.list)) {
      this.createData(nextProps.list);
    }
  }
  componentWillUnmount() {
    //db.close();
  }
  render() {
    const tabsData = [
      { value: 1, title: 'All' },
      { value: 2, title: 'Favorites' },
      { value: 3, title: 'Tags' }
    ];
    const { tabVal } = this.state;
    const { isHeaderShowBool } = this.props;
    console.log("isHeaderShowBool--->>", isHeaderShowBool)
    return (
      <View style={styles.mainContainer} >

        <Header>
          {isHeaderShowBool && <TopTabs data={tabsData} handleTab={(val) => { this.setState({ tabVal: val }) }} value={tabVal} />}
        </Header>

        {tabVal === 1 && <View style={styles.screenContainer}><HomeScreen getArticles={() => { this.props.getArticles('eng', '', '', '') }} setHeader={() => { this.props.setHeaderShow(false) }} /></View>}
        {tabVal === 2 && <View style={styles.screenContainer}><FavoriteList getArticles={() => { this.props.getArticles('eng', '', '', '') }} setHeader={() => { this.props.setHeaderShow(false) }} /></View>}
        {tabVal === 3 && <View style={styles.screenContainer}><TagsList /></View>}

      </View>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("states are", state);
  return {
    list: state.articles.articleList ? state.articles.articleList.data : [],
    isHeaderShowBool: state.articles.isHeaderShow ? state.articles.isHeaderShow : true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: (lang, rpp, page, title) => {
      dispatch(ArticleActions.articleRequest(lang, rpp, page, title))
    },
    setHeaderShow: (val) => { dispatch(ArticleActions.isHeaderShowBool(val)) }
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(ListNavigatorScreen)
