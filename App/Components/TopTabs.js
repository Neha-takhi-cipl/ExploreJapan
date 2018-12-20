import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet';
// import PropTypes from 'prop-types';
import { View, Text,TouchableOpacity } from 'react-native'
import styles from './Styles/TopTabsStyle'

export default class TopTabs extends Component {

  handleTabClick=(val)=>{
    this.props.handleTab(val);
  }
  showTabs=(rawData,i)=>{
    const {value,data} = this.props;
    const style = EStyleSheet.child(styles, 'tab', i, data.length);
    return(
    <TouchableOpacity
    key={rawData.value}
    style = {value === rawData.value ?  [styles.tab,styles.active,style]: [styles.tab,style]}
    onPress={()=>{this.handleTabClick(rawData.value)}}>
    <Text style={value === rawData.value ? styles.textColorActive : styles.textColor}>{rawData.title}</Text>
    </TouchableOpacity>
    )
  }
  render () {
    const { data } = this.props;

    return (
      <View>
      <View style={styles.container}>
      {
        data.map((item,i)=>(this.showTabs(item,i)))
      }
      </View>
      </View>
    )
  }
}
