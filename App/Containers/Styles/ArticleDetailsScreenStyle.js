import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Dimensions from 'Dimensions';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
   position:'relative'
  },
  innerContainer:{
    //position: 'absolute',
    //zIndex:999999999,
    //top: -10,
    //left: 0,
   // width: Dimensions.get('window').width,

  }
})
