import React, { Component } from 'react'
import { TouchableOpacity, Text, View, WebView } from 'react-native'
import { Buffer } from 'buffer';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Header from '../Components/Header';
import AudioPlayer from '../Components/AudioPlayer'
import ButtonWithIcon from '../Components/ButtonWithIcon';
import AutoTags from 'react-native-tag-autocomplete';
// Styles
import styles from './Styles/ArticleDetailsScreenStyle'
import { openDatabase } from 'react-native-sqlite-storage';
import { encodeHtmlEntity, decode_base64, decodeHtmlEntity } from '../Utils/CommonFunctions';
import atob from 'base-64';

var db = openDatabase({ name: 'ArticleDatabase.db' });

class ArticleDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],//props.screenProps.allData,
      isFavClicked: false,
      isTagClicked: false,
      isReadClicked: false,
      suggestions: [],
      tagsSelected: [],
      showAutosuggestTag: false, articleTags: [],
      isPlay: false
    }
    if (this.props.navigation.state.params.article_id) {

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_article WHERE article_id = ?', [this.props.navigation.state.params.article_id], (tx, results) => {
          this.setState({
            data: results.rows.item(0),
            isFavClicked: results.rows.item(0).isFavorite !== 1 ? false : true,
            isReadClicked: results.rows.item(0).isRead !== 1 ? false : true,
          });
        });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_tags WHERE article_id = ?', [this.props.navigation.state.params.article_id], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));

          }
          this.setState({
            articleTags: temp,

          });
        });
      });
      db.transaction(tx => {
        tx.executeSql('SELECT distinct(title) FROM table_tags', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ 'name': results.rows.item(i).title });
          }
          this.setState({
            suggestions: temp,

          });
        });
      });

    }
  }
  componentDidMount() {
    this.props.screenProps.setHeaderShow(false);

  }
  handleBack = () => {
    this.props.navigation.state.params.updateData();
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
  handleTag = () => {
    this.setState({
      showAutosuggestTag: true
    })
  }
  handleRead = () => {
    const { isReadClicked } = this.state;
    this.setState({
      isReadClicked: !isReadClicked
    })
    db.transaction(tx => {
      tx.executeSql('UPDATE table_article SET isRead = ? WHERE article_id = ?', [!isReadClicked, this.props.navigation.state.params.article_id], (tx, results) => {
      });
    });
  }
  handleFavorite = () => {
    const { isFavClicked } = this.state;
    this.setState({
      isFavClicked: !isFavClicked
    })
    db.transaction(tx => {
      tx.executeSql('UPDATE table_article SET isFavorite = ?  WHERE article_id = ?', [!isFavClicked, this.props.navigation.state.params.article_id], (tx, results) => {
        if (!results.rowsAffected > 0) {
          alert('Article fetching Failed');
        }
      });
    });
  }
  handleSubmit = (e) => {
    const tempTags = [...this.state.tagsSelected];
    tempTags.push({ 'name': e })

    this.setState({ tagsSelected: tempTags }, () => {
      db.transaction(tx => {
        tx.executeSql('INSERT INTO table_tags (article_id, title) VALUES(?,?)', [this.props.navigation.state.params.article_id, e], (tx, results) => {
          if (!results.rowsAffected > 0) {
            alert('Article fetching Failed');
          }
        });
      });
    });
  }
  showTags() {
    const { articleTags } = this.state;
    return (
      articleTags.map((item, i) => {
        return (
          <View key={i} style={styles.tagContainer}>{item &&
            <View><Text style={styles.tags}>{item.title}</Text>
            </View>}
          </View>)
      })
    )
  }
  handlePlayPause = (callback) => {
    this.setState({ isPlay: !this.state.isPlay }, () => { callback() });
  }
  showDescription = (str) => {

    //base64_encode(html_entity_decode($value['ArticleText']))
    const userData = Buffer.from(str, 'base64').toString();
    console.log("b64", userData)
    //var base64Code = decode_base64(str);
    var htmlCode = decodeHtmlEntity(userData);
    return htmlCode;
  }
  render() {
    const { data, isFavClicked, isReadClicked, showAutosuggestTag, isPlay, suggestions } = this.state;
    return (
      <View style={styles.maincontainer}>
        <View style={styles.headerView}>
          <Header>
            <Text style={styles.headingColor} h2> {`${data.titleNo}. ${data.title}`}</Text>
            {
              this.showTags()
            }
            <View>
              <TouchableOpacity>
                <AudioPlayer url={data.audio_url} isPlay={isPlay} onPress={(callback) => { this.handlePlayPause(callback) }} />
              </TouchableOpacity>
            </View>
          </Header>
        </View>


        {data.description && <WebView
          source={{
            html: this.showDescription(data.description)
          }}
          automaticallyAdjustContentInsets={false}
        />}
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
              createTagOnSpace={this.handleSubmit}
              placeholder="Type here.."
              style={{ width: '100%' }} />
          </View>
        }
        <View style={styles.buttonContainer}>
          <ButtonWithIcon iconName="backButton" onPress={() => { this.handleBack() }} style={styles.singleButton} />
          <ButtonWithIcon iconName="tagIcon" onPress={this.handleTag} style={styles.singleButton} />
          <ButtonWithIcon iconName={isReadClicked ? "readDetailsActive" : "readDetailsInActive"} onPress={() => { this.handleRead() }} style={styles.singleButton} />
          <ButtonWithIcon iconName={isFavClicked ? "favoriteActive" : "favoriteInActive"} onPress={() => { this.handleFavorite() }} style={styles.singleButton} />
        </View>
      </View >
    )
  }
}

export default ArticleDetailsScreen;
