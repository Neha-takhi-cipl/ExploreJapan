import React, { Component } from 'react'
import { ScrollView, Text, Image, View,Button } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>

          <Button
          onPress={()=>{this.props.navigation.navigate('ListNavigatorScreen')}}
          title="Click Me"
          color="#841584"
          accessibilityLabel="view all lists"
          />

        </ScrollView>
      </View>
    )
  }
}
