// @flow

import {StyleSheet} from 'react-native'
import { Metrics, Colors } from '../../Themes/'

const navButton = {
  backgroundColor: Colors.transparent,
  justifyContent: 'center'
}

export default StyleSheet.create({
  backButton: {
    ...navButton,
    marginTop: 8,
    marginLeft: 5
  },
  searchButton: {
    ...navButton,
    marginTop: 15,
    marginRight: Metrics.baseMargin,
    alignItems: 'center'
  }
})
