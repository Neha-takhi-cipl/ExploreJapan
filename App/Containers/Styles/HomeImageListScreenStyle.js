import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Dimensions from 'Dimensions';
export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    },
    image: {
    width: (Dimensions.get('window').width / 4) - 10,
    height: 100,
    margin: 5,

    },
    flatListStyle: { flex: 1,
    }
})
