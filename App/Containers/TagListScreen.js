import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView,Image, View,TouchableOpacity,FlatList,ActivityIndicator, Modal, TouchableHighlight,TextInput } from 'react-native'
import Dialog from "react-native-dialog"
import { List, ListItem} from 'react-native-elements'
import  Constants  from '../Utils/Constants'
import AudioPlayer from '../Components/AudioPlayer'
import SearchWithSort from '../Components/SearchWithSort'

import { Images } from '../Themes'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'ArticleDatabase.db' });

import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TagListScreenStyle'

class TagListScreen extends Component {
  constructor(props){
    super(props);
     //const allData = props.screenProps.list ? this.createData(props.screenProps.list): [];
    this.state={
      data: [],
      list: [],//data.length > 0 ? data.slice(0,Constants.LIMIT) :[],
      offset: 0, limit: Constants.LIMIT,
      search:'',
      currentSortOrder: 'desc',
      isFetching: false,
      dialogVisible: false,
      dialogTagDeleteVisible: false,
      currentTag: {}
    }
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_tags', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log("inserting into table_tags", results.rows.item(i))
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

// componentWillReceiveProps(nextProps){
//   const {data}=  this.state;
//   if(!_.isEqual(this.data, nextdata)){
//    this.setState({data: nextProps.screenProps.allData,  list: nextProps.screenProps.allData.slice(0,Constants.LIMIT)});
//   }
// }

  fetchSliceData=(data)=>{
    const {offset,limit} = this.state;
    return data.slice(offset,limit);
  }
  fetchResult=()=>{
    const {offset,limit,list,data} = this.state;
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

  handleTag = (e, tagName, tagId) =>{
     this.setState({
       dialogVisible : true,
       currentTag : {title:tagName,id:tagId}
     })
  }
  handleCancel=()=>{
    console.log("m clicked");
    this.setState({dialogVisible: false})
  }
  handleTagInputChange=(e)=>{
    const {currentTag} = this.state;
    const temp = {...currentTag}
    console.log("temp is before",temp,e);
    temp.title =  e;
    console.log("temp is",temp);
    this.setState({
      currentTag:temp
    })
  }
  handleTagUpdate=()=>{
    console.log("clickeddddddddddddddd",this.state.currentTag)
    const { currentTag} = this.state;
    this.setState({dialogVisible: false},()=>{
      db.transaction(tx => {
        tx.executeSql('UPDATE table_tags SET title = ? WHERE id = ?', [currentTag.title, currentTag.id ], (tx, results) => {
          console.log("result of upsaTE",tx,results.rows.length)

        });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_tags', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log("inserting into table_tags", results.rows.item(i))
          }
          this.setState({
            data: temp,
            list: temp.length > 0? temp.slice(0,Constants.LIMIT): [],
            offset: this.state.offset + Constants.LIMIT,
            limit: this.state.limit + Constants.LIMIT
          });
        });
      });
    })
  }
  handleTagDelete = (id)=>{
    db.transaction(tx => {
      tx.executeSql('DELETE FROM table_tags  WHERE id = ?', [id ], (tx, results) => {
        console.log("result of DELETE",tx,results.rows.length)

      });
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_tags', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log("inserting into table_tags", results.rows.item(i))
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
  render () {
    const {data,search, currentTag, dialogVisible,dialogTagDeleteVisible} = this.state;
    return (
     <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>

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

            renderItem={({item,index}) => (
              <ListItem
                avatar={Images.tagIcon}
                avatarStyle={{resizeMode:'center', backgroundColor:'#fff'}}
                key={index}
                title={item.title}
                chevron={false}
                onPress={(e)=>{this.handleTag(e,item.title,item.id)}}
            rightIcon = {
                  <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={()=>{this.setState({dialogTagDeleteVisible: true})}}>
                  <Dialog.Container visible={dialogTagDeleteVisible}>
                  <Dialog.Title>Delete Tag</Dialog.Title>
                      <Dialog.Description>
                        Are you sure you want to delete this tag?
                      </Dialog.Description>
                      <Dialog.Button label="No" onPress={()=>{this.setState({dialogTagDeleteVisible: false})}} />
                      <Dialog.Button label="Yes" onPress={()=>{this.handleTagDelete(item.id)}} />
                  </Dialog.Container>
                  <Image source={ Images.deleteIcon} style={styles.imageIcon}/>
                  </TouchableOpacity>
                  </View>

            }
              />
            )}
        />
      <Dialog.Container visible={dialogVisible}>
      <Dialog.Title>Rename Tag</Dialog.Title>
        <Dialog.Input value = {currentTag.title} wrapperStyle={{ borderBottomWidth: .5, borderColor: '#000' }} onChangeText={(e)=>{this.handleTagInputChange(e)}}/>
        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        <Dialog.Button label="Save" onPress={this.handleTagUpdate} />
      </Dialog.Container>

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

export default TagListScreen;
