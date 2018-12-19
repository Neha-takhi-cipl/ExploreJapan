import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView,Image, View,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { SearchBar,List, ListItem} from 'react-native-elements'
// import AudioFeature from '../Components/AudioFeature'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeListScreenStyle'
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  
];

class HomeListScreen extends Component {
 
  render () {
   
   return (
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
        <SearchBar
          showLoading
          platform="android"
          cancelButtonTitle="Cancel"
          placeholder='Search' 
          onChangeText={(e)=>{alert(e)}}
          lightTheme
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...'
        />
        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l) => (
              <ListItem
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={l.name}
                title={l.name}
                subtitle={
                  <View style={styles.subtitleView}>
                    
                    <Text style={styles.ratingText}>{l.subtitle}</Text>
                  
                  {/* <AudioFeature
                    key={l.title}
                    title={l.title}
                    onPress={() => {
                      this.prepare(url, this);
                    }}
                  /> */}
                  </View>
                }
              />
            ))
          }
        </List>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeListScreen)
