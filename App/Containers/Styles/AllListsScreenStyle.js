import { StyleSheet,Platform } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    menuItem:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    }
});
