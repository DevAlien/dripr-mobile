// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  groupContainer: {
    ...ApplicationStyles.groupContainer
  }
})
