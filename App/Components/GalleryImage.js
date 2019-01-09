import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity,Image } from 'react-native'
import styles from './Styles/GalleryImageStyle'
import Dimensions from 'Dimensions';
import { Images } from '../Themes'

const WIDTH = Dimensions.get('window').width
const Button = ({ onPress, children}) => (
  <TouchableOpacity onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default class GalleryImage extends Component {
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
    const { image_uri, index, onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}
        onPress={() => onPress(index)}
        style={{
          backgroundColor: 'transparent',
          borderRadius: 0,
          height: 80,
          width: WIDTH / 3,
        }}
      >
        <Image
        source={ image_uri ? {uri:image_uri } : Images.defaultAvatar}
          style={{
            height: 80,
            left: 0,
            position: 'absolute',
            resizeMode: 'cover',
            top: 0

          }}
        />
      </TouchableOpacity>
      </View>
    )
  }
}
