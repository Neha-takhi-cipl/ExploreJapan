import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView ,View} from 'react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Header from '../Components/Header';
import ButtonWithIcon from '../Components/ButtonWithIcon';
// Styles
import styles from './Styles/ArticleDetailsScreenStyle'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'ArticleDatabase.db' });

class ArticleDetailsScreen extends Component {
  constructor(props){
    super(props);
   this.state={
      data: [],//props.screenProps.allData,

    }
    if(this.props.navigation.state.params.article_id){

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_article WHERE article_id = ?', [this.props.navigation.state.params.article_id], (tx, results) => {
          console.log("results",tx,results.rows.length)
          this.setState({
            data: results.rows.item(0),
          });
        });
      });
    }
  }
  handleBack=()=>{

  }
  render () {
    const {data} = this.state;
    console.log("in detail screen ", this.props, this.state.data)
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Header>
            <Text h2> {`${data.titleNo}. ${data.title}`}</Text>
            <Text h3>Article tags will come here</Text>
           </Header>
           <ButtonWithIcon iconName="backButton" onPress={()=>{this.handleBack}}/>
           <ButtonWithIcon text="back" iconName="tagIcon" onPress={()=>{this.handleBack}}/>
           <ButtonWithIcon text="back" iconName="readDetailsInActive" onPress={()=>{this.handleBack}}/>
           <ButtonWithIcon text="back" iconName="favoriteInActive" onPress={()=>{this.handleBack}}/>
        </View>

      </View>
    )
  }
}

export default ArticleDetailsScreen;
