import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors, Fonts } from '../../Themes'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20
  },
  marginTop:{
    marginTop: 20
  },
  marginLeft:{
    marginLeft: 20
  },
  button:{
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding:15,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: Colors.primaryBlue,
  }
})
