import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeHelpScreenStyle'

class HomeHelpScreen extends Component {
  render () {
    return (

        <View style={styles.container}>
          <Text>Thank you for always patronizing us.</Text>
          <Text style={styles.marginTop}>Menu</Text>
          <Text>1. List</Text>
          <Text style={styles.marginLeft}>A list of distribution information is displayed.</Text>
          <Text style={styles.marginTop}>2. List</Text>
          <Text style={styles.marginLeft}>A list of distribution information is displayed.</Text>
          <Text style={styles.marginTop}>3. List</Text>
          <Text style={styles.marginLeft}>A list of distribution information is displayed.</Text>
          <Text style={styles.marginTop}>4. List</Text>
          <Text style={styles.marginLeft}>A list of distribution information is displayed.</Text>
          <Text style={[styles.marginTop ]}>Favorites</Text>
          <Text>Tap the heart mark at the bottom right of the article screen to register it.</Text>
          <View style={{flex:1,width:'100%'}}>
          <View style={{flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>{alert("redirect to playstore")}}>
            <Text style={[styles.button ]}>Rate Us</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHelpScreen)
