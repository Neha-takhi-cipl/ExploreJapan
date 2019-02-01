import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import { Icon } from 'react-native-elements'
import styles from './Styles/SearchWithSortStyle'

export default class SearchWithSort extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
   return (
      <View>
      <View style={styles.inputContainer}>
        <View style={styles.searchSection}>
          <Icon iconStyle={styles.searchIcon} name="search" size={20} color="#000"/>
          <TextInput
              style={styles.input}
              placeholder="search"
              onChangeText={(searchString) => {this.props.onChangeText(searchString)}}
              underlineColorAndroid="transparent"
          />

      </View>
      <TouchableOpacity onPress={()=>{this.props.onSort()}} style={[styles.imageContainer,styles.sortIcon]}>
     
        <Image source={Images.sortIcon} style={[styles.imageIcon, styles.searchIcon]}/>
  
    </TouchableOpacity> 
    </View>
    </View>
    )
  }
}
