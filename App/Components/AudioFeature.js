import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/FeatureStyle'
import { Text, View } from 'react-native'
import AudioPlayer from 'react-native-play-audio';

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);
const Header = ({children, style}) => <Text style={[styles.header, style]}>{children}</Text>;
const Feature = ({title, onPress, description, buttonLabel = 'PLAY', status}) => (
  <View style={styles.feature}>
    <Header style={{flex: 1}}>{title}</Header>
    {status ? <Text style={{padding: 5}}></Text> : null}
    <Button title={buttonLabel} onPress={onPress} />
  </View>
);
const callback = () => {
  AudioPlayer.play();
    
 AudioPlayer.getDuration((duration) => {
    console.log("duration",duration);
  });
  // setInterval(() => {
  //   AudioPlayer.getCurrentTime((currentTime) => {
  //     console.log("currentTime",currentTime);
  //   });
  // }, 1000);
}
class AudioFeature extends Component {
  static propTypes = {
    url:  'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'
  }
  prepare=(url, curr)=>{
    AudioPlayer.prepare(url, callback);
 // AudioPlayer.prepareWithFile('sample', 'mp3', callback);
  }
  render () {
    AudioPlayer.onEnd(() => {
      AudioPlayer.stop();
      console.log('on end');
    });
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Feature
           key={1}
           title={'Testttttt'}
           onPress={() => {
            this.prepare(url, this);
          }}
        />
      </TouchableOpacity>
    )
  }
}

export default AudioFeature