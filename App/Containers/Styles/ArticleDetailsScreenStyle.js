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

  },
  contentContainer:{

  },
  buttonContainer:{
    flexDirection: 'row', justifyContent: 'space-between', flex: 1,
    left: 15,
    position: 'absolute',
    right: 10,
    top: Dimensions.get('window').height -190,
    zIndex: 1
  },
  singleButton:{
    width: 50, height: 50
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: Dimensions.get('window').height -250,

  }
})
