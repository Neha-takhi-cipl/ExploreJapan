import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView,Image, View,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { SearchBar,List, ListItem} from 'react-native-elements'
import  Constants  from '../Utils/Constants'
import AudioPlayer from '../Components/AudioPlayer'
import SearchWithSort from '../Components/SearchWithSort'
import ArticleActions from '../Redux/ArticleRedux'
import _ from 'lodash';
import { Images } from '../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeListScreenStyle'

class HomeListScreen extends Component {
  constructor(props){
    super(props);
    const allData = props.list ? this.createData(props.list): [];
    this.state={
      data: allData,
      list: allData.length > 0 ? allData.slice(0,Constants.LIMIT) :[],
      offset: 0, limit: Constants.LIMIT,loading: true,
      search:'',
      currentSortOrder: 'desc',
      isFetching: false
    }
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
  componentDidMount(){
    this.props.getArticles('eng','','','');
  }
  componentWillReceiveProps(nextProps){
    const {data}=  this.state;
    if(!_.isEqual(this.props.list, nextProps.list)){
       const allData = this.createData(nextProps.list);
      this.setState({data: allData, list: this.fetchSliceData(allData), loading: false});
    } else {
      if(this.props.list){
        this.setState({loading:false})
      }
    }
  }

  handlePlayPause=(i,callback)=>{
    const { data } = this.state;
    const currStat = data[i].isPlay;
    data.map((d,innerI)=>{
        if(i === innerI){
          data[i].isPlay= !data[i].isPlay;
        } else {
        if(currStat=== false){
          data[innerI].isPlay= false;
        }
      }
    })
    //data[i].isPlay= !data[i].isPlay;
    this.setState({data: data},()=>{callback()});
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
  handleSearch=(searchText)=>{
    const {data, list} = this.state;
    const filterData = data.filter((item,i)=> {
       return (item['title'].toLowerCase().search(searchText.toLowerCase()) !== -1)
    });
   this.setState({list: filterData,search:searchText})
  }

  handleSort=()=>{
    const {data,currentSortOrder} = this.state;
    data.sort((a,b)=>{
      a = new Date(a.date);
      b = new Date(b.date);
      if(currentSortOrder === 'desc') {
        return a>b ? -1 : a<b ? 1 : 0;
      } else {
        return a<b ? -1 : a<b ? 1 : 0;
      }
    })
    this.setState({data: data , currentSortOrder: this.state.currentSortOrder === 'desc'? 'asc': 'desc'})
  }
  onRefresh=()=>{
    this.setState({ isFetching: true },this.props.getArticles('eng','','',''));
  }
  render () {
    const {data,search} = this.state;
    return (
      <View style={{flex:1}}>
      {/* <SearchBar
          showLoading
          style={{position:'relative',flex:0.8}}
          value={search}
          platform={Constants.deviceType}
          cancelButtonTitle="Cancel"
          placeholder='Search'
          onChangeText={(searchText)=>{this.handleSearch(searchText)}}
          lightTheme
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...'
          inputStyle={{borderRadius: 50}}
          onClearText={()=>this.handleSearchCancel()}
          onCancel={()=>this.handleSearchCancel()}
        /> */}

        <SearchWithSort onChangeText={(searchText)=>{this.handleSearch(searchText)}} onSort={(type)=>{this.handleSort(type)}}/>
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
        { this.state.loading ? (
          <ActivityIndicator size="large" />):(
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
                roundAvatar
                avatar={item.avatar_url ? {uri:item.avatar_url} :Images.defaultAvatar}
                key={item.id}
                title={`${item.titleNo}. ${item.title}`}
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>{`${item.date} ${item.time}`}</Text>
                    {
                      item.isAudio && (
                      <View>
                        <TouchableOpacity>
                          <AudioPlayer url={item.audio_url} isPlay={item.isPlay} onPress={(callback)=>{this.handlePlayPause(i,callback)}}/>
                        </TouchableOpacity>
                      </View>
                      )
                    }
                  </View>
                }
              />
            )}
        />
          )
      }
      </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list : state.articles.articleList ? state.articles.articleList.data : []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: (lang, rpp, page, title) => {
      dispatch(ArticleActions.articleRequest(lang, rpp, page, title))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeListScreen)
