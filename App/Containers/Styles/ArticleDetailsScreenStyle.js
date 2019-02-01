import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors, Fonts } from '../../Themes'
import Dimensions from 'Dimensions';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    position: 'relative'
  },
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  headerView: { width: '100%', height: 'auto', backgroundColor: Colors.primaryBlue },
  header: {
    margin: 10
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  webView: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row', justifyContent: 'space-between', flex: 1,
    left: 15,
    position: 'absolute',
    right: 10,
    top: Dimensions.get('window').height - 190,
    zIndex: 1
  },
  singleButton: {
    width: 50, height: 50
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: Dimensions.get('window').height - 250,

  },
  tagContainer: {
    flex: 1
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    opacity: 0.5,
    width: 'auto', height: 50
  },
  headingColor: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14
  }
})
