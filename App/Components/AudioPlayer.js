import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert,Image} from 'react-native';
import Sound from 'react-native-sound';
import { Images } from '../Themes'
import styles from '../Components/Styles/AudioPlayerStyle'

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

const Header = ({children, style}) => <Text style={[styles.header, style]}>{children}</Text>;

const Feature = ({ onPress,isPlay}) => (
  <View style={[styles.imageContainer]}>
  <TouchableOpacity onPress={onPress}>
    { !isPlay ? (
        <Image source={Images.audioActive} style={styles.imageIcon} />
    ) : (
        <Image source={Images.audioInActive} style={styles.imageIcon} />
    )
    }
</TouchableOpacity>
</View>

);

var soundsInstance  = [];
class MainView extends Component {
static propTypes = {
  url: PropTypes.string
}
static defaultProps = {
  url: 'http://www.hochmuth.com/mp3/Bloch_Prayer.mp3'
}
componentDidMount(){
  this.s = new Sound(this.props.url);
  soundsInstance.push(this.s)
}

componentWillUnmount(){
  this.s.stop().release();
}
playPauseSound=()=>{
  this.props.onPress(this.callback);

}
handleErr=(error)=>{
  if (error) {
    Alert.alert('error', error.message);
    return;
  }
}
callback = (data) => {

    const { isPlay } = this.props;

    if(isPlay === false) {
      this.s.pause(()=>{
      });
    } else {
      this.s.play();

      soundsInstance.map((instance)=>{
        if(instance._filename !== this.s._filename){
          instance.stop();
          //this.s.play();
        }
      })
    }
};
  render() {
    const {isPlay} = this.props;
     return (
      <View>
          <Feature
                key={1}
                isPlay={isPlay}
                onPress={() => {
                  this.playPauseSound();
                }}
          />
      </View>
    );
  }
}

export default MainView;
