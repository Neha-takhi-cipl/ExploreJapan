import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1
  }, centerDiv:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  imageContainer:{
    width: 30,
    height: 20,
    // overflow: 'hidden',
  },
  imageIcon: {
    width:'100%',
    height: '100%',
    resizeMode:'contain'
  }
})
