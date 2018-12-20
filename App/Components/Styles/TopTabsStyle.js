import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../Themes/Colors';

export default EStyleSheet.create({
  container: {
    margin: 20,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tab: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  'tab:first-child': {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderRightWidth:0
  },
  'tab:last-child': {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderLeftWidth:0
  },
  active: {
    backgroundColor: Colors.white
  },
  textColor:{
    color: Colors.white,
    fontWeight:'bold'
  },
  textColorActive:{
    color: Colors.primaryBlue,
    fontWeight:'bold'
  }
})
