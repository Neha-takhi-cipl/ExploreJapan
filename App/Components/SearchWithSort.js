import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
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
    console.log("in search");
    return (
      <View>
      <View style={styles.inputContainer}>
        <View style={styles.searchSection}>
          <Icon iconStyle={styles.searchIcon} name="search" size={20} color="#000"/>
          <TextInput
              style={styles.input}
              placeholder="Type here"
              onChangeText={(searchString) => {this.props.onChangeText(searchString)}}
              underlineColorAndroid="transparent"
          />

      </View>
      <View style={styles.sortIcon}>
        <Icon style={styles.searchIcon} name="unfold-more" size={20} color="#000" onPress={()=>{this.props.onSort()}}/>
      </View>
    </View>
    </View>
    )
  }
}
