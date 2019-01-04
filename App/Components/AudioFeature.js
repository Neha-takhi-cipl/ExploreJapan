import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/AudioFeatureStyle'

import AudioPlayer from 'react-native-play-audio';

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

const Feature = ({ onPress,isPlay}) => (
  <View style={styles.feature}>
   <Button title={isPlay ? "Pause" : "Play"} onPress={onPress} />
  </View>
);

class AudioFeature extends Component {

  static propTypes = {
    url: PropTypes.string
  }
  static defaultProps = {
    url: 'http://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'
  }
  constructor(props){
    super(props);
    this.state={
      isPlay: false
    }
  }
  callback = () => {
    const {isPlay} = this.state;
   if(isPlay === true) {
     console.log('iffffffff');
      AudioPlayer.play();
       AudioPlayer.onEnd(() => {
        AudioPlayer.stop();
        this.setState({isPlay: false})
      });
    } else {
      console.log('elseeeeee',AudioPlayer);
      AudioPlayer.pause();
      console.log('elseeeeee out',AudioPlayer);
    }
    //  AudioPlayer.getDuration((duration) => {
    //     console.log("duration",duration);
    //   });
      // setInterval(() => {
      //   AudioPlayer.getCurrentTime((currentTime) => {
      //     console.log("currentTime",currentTime);
      //   });
      // }, 1000);

    }
  prepare=()=>{
    const { url } = this.props;
    console.log("innnnnnnnnnnn");
     this.setState({isPlay:!this.state.isPlay},()=>{
      AudioPlayer.prepare(url, ()=>{this.callback()});
     })
   }

  render () {
    const {isPlay} = this.state;
    return (
      <TouchableOpacity >
        <Feature
           key={1}
           isPlay= {isPlay}
           onPress={() => {
            this.prepare();
          }}
        />
      </TouchableOpacity>
    )
  }
}

export default AudioFeature
