import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centerDiv:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
})
