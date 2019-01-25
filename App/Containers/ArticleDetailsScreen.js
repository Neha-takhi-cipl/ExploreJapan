import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView ,View} from 'react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Header from '../Components/Header';
import ButtonWithIcon from '../Components/ButtonWithIcon';
import AutoTags from 'react-native-tag-autocomplete';
// Styles
import styles from './Styles/ArticleDetailsScreenStyle'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'ArticleDatabase.db' });

class ArticleDetailsScreen extends Component {
  constructor(props){
    super(props);
    console.log("Props in Article details screen",props)
   this.state={
      data: [],//props.screenProps.allData,
      isFavClicked: false,
      isTagClicked: false,
      isReadClicked: false,
      suggestions : [ {name:'Mickey Mouse'}],
    tagsSelected : [],
    showAutosuggestTag: false
    }
    if(this.props.navigation.state.params.article_id){

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_article WHERE article_id = ?', [this.props.navigation.state.params.article_id], (tx, results) => {
          console.log("results",tx,results.rows.length)
          this.setState({
            data: results.rows.item(0),
            isFavClicked: results.rows.item(0).isFavorite !== 1 ? false : true,
           isReadClicked: results.rows.item(0).isRead !== 1 ? false : true,
          });
        });
      });
      // db.transaction(tx => {
      //   tx.executeSql('SELECT * FROM table_tags', [], (tx, results) => {
      //   this.setState({
      //       data: results.rows.item(0),
      //       isFavClicked: results.rows.item(0).isFavorite !== 1 ? false : true,
      //      isReadClicked: results.rows.item(0).isRead !== 1 ? false : true,
      //     });
      //   });
      // });
    }
  }
  componentDidMount(){
    console.log("calling setHeaderShow...........")
    this.props.screenProps.setHeaderShow(false);
  }
  handleBack=()=>{
    this.props.navigation.goBack();
  }
  handleDelete = index => {
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
 }

 handleAddition = suggestion => {
    this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
 }
  handleTag=()=>{
    this.setState({
      showAutosuggestTag: true
    })
  }
  handleRead=()=>{
    const {isReadClicked} = this.state;
    this.setState({
      isReadClicked:!isReadClicked
    })
    db.transaction(tx => {
      tx.executeSql('UPDATE table_article SET isRead = ? WHERE article_id = ?', [!isReadClicked,this.props.navigation.state.params.article_id ], (tx, results) => {
        console.log("result of upsaTE",tx,results.rows.length)

      });
    });
  }
  handleFavorite=()=>{
    const {isFavClicked} = this.state;
    this.setState({
      isFavClicked: !isFavClicked
    })
    db.transaction(tx => {
      tx.executeSql('UPDATE table_article SET isFavorite = ?  WHERE article_id = ?', [!isFavClicked, this.props.navigation.state.params.article_id], (tx, results) => {
        if (! results.rowsAffected > 0) {
          alert('Article fetching Failed');
        } else {
          console.log("updated")
        }
      });
    });
  }
  handleSubmit=(e)=>{
   const tempTags= [...this.state.tagsSelected];
    tempTags.push({'name':e})

    this.setState({ tagsSelected:tempTags  }, ()=>{
      db.transaction(tx => {
        tx.executeSql('INSERT INTO table_tags (article_id, title) VALUES(?,?)', [ this.props.navigation.state.params.article_id, e], (tx, results) => {
          if (! results.rowsAffected > 0) {
            alert('Article fetching Failed');
          } else {
            console.log("inserted")
          }
        });
      });
    });
  }
  render () {
    const {data,isFavClicked,isReadClicked, showAutosuggestTag} = this.state;
    console.log("Props in Article details screen render",this.props)
    return (
      <View style={styles.container}>
        <Header>
          <Text h2> {`${data.titleNo}. ${data.title}`}</Text>
          <Text h3>Article tags will come here</Text>
        </Header>
        <View style={styles.contentContainer}>
          <Text>
          Neha Takhi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        {
          showAutosuggestTag &&
          <View
          //style={styles.autocompleteContainer}
          >
            <AutoTags
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
            onCustomTagCreated={this.handleSubmit}
            placeholder="Type here.."
            style={{width:'100%'}}/>
          </View>
        }
        <View style={styles.buttonContainer}>

            <ButtonWithIcon iconName="backButton" onPress={()=>{this.handleBack()}} style={styles.singleButton}/>
            <ButtonWithIcon iconName= "tagIcon" onPress={this.handleTag} style={styles.singleButton}/>
            <ButtonWithIcon iconName={isReadClicked ? "readDetailsActive": "readDetailsInActive"} onPress={()=>{this.handleRead()}} style={styles.singleButton}/>
            <ButtonWithIcon iconName={isFavClicked ? "favoriteActive": "favoriteInActive"} onPress={()=>{this.handleFavorite()}} style={styles.singleButton}/>
           </View>
      </View>
    )
  }
}

export default ArticleDetailsScreen;
