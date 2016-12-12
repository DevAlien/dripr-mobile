// @flow

import { Metrics, Colors, Fonts } from '../../Themes'

export default {
  upperContainer: {
    flex: 1,
    padding: 0
  },
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  logo: {
    height: Metrics.images.logo2,
    width: Metrics.images.logo2,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  text: {
    ...Fonts.style.regular,
    color: Colors.snow,
    marginTop: -5
  },
  bottom: {
    flex:1,
    maxHeight:80,
    height:80,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    borderTopColor: '#fff'
  }
}
