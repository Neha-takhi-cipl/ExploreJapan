import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView,Image, View,TouchableOpacity,FlatList,ActivityIndicator, Modal, TouchableHighlight,TextInput } from 'react-native'
import Dialog from "react-native-dialog"
import { List, ListItem} from 'react-native-elements'
import  Constants  from '../Utils/Constants'
import AudioPlayer from '../Components/AudioPlayer'
import SearchWithSort from '../Components/SearchWithSort'

import { Images } from '../Themes'

import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TagListScreenStyle'

const data= [
  {tagName: "Tag1"},
  {tagName: "Tag2"},
  {tagName: "Tag3"},
  {tagName: "Tag4"},
  {tagName: "Tag5"},
  {tagName: "Tag6"},
  {tagName: "Tag7"},
  {tagName: "Tag8"},
  {tagName: "Tag9"},
  {tagName: "Tag10"}
]
class TagListScreen extends Component {
  constructor(props){
    super(props);
    console.log("props in hlscreen", props);
    //const allData = props.screenProps.list ? this.createData(props.screenProps.list): [];
    this.state={
      data: data,
      list: data.length > 0 ? data.slice(0,Constants.LIMIT) :[],
      offset: 0, limit: Constants.LIMIT,
      search:'',
      currentSortOrder: 'desc',
      isFetching: false,
      dialogVisible: false,
      currentTag: ''
    }
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

  handleTag = (e, tagName) =>{
     this.setState({
       dialogVisible : true,
       currentTag : tagName
     })
  }
  handleCancel=()=>{
    this.setState({dialogVisible: false})
  }
  render () {
    const {data,search, currentTag, dialogVisible} = this.state;
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
                key={item.index}
                title={item.tagName}
                onPress={(e)=>{this.handleTag(e,item.tagName)}}

              />
            )}
        />
 <Dialog.Container visible={dialogVisible}>

          <Dialog.Input value = {currentTag} wrapperStyle={{ borderBottomWidth: .5,
    borderColor: '#000',  }}/>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Ok" onPress={this.handleCancel} />
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
