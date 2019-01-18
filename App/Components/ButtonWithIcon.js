import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text ,TouchableOpacity, Image} from 'react-native'
import styles from './Styles/ButtonWithIconStyle'
import { Images } from '../Themes'

  const ButtonWithIcon = ({style,text, iconName,onPress}) =>
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>

        <View style={[styles.imageContainer]}>
          <Image source={Images[iconName]} style={styles.imageIcon}/>
        </View>
        <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
 ;
  export default ButtonWithIcon
