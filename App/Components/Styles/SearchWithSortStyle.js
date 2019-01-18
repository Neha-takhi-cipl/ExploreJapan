import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'
import EStyleSheet from 'react-native-extended-stylesheet';

// define extended styles
const styles = EStyleSheet.create({

  inputContainer:{
    backgroundColor: Colors.grey,
    display:'flex',
    flexDirection:'row',

  },
  searchSection: {
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    flex:0.9,
    margin: 10
},
searchIcon:{
  padding:10
 },
sortIcon:{
  flex:0.1,
  height: 40,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 40,
  margin: 10
},
input: {
  flex:1,
  paddingLeft:10,
  paddingTop:10,
  paddingBottom: 10,
}

})
export default styles;
