// @flow

import React, { Component } from 'react'
import { View, StatusBar, Linking } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
//////import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    // if (!ReduxPersist.active) {
    //   this.props.startup()
    // }
    var url = Linking.getInitialURL().then((url) => {
    if (url) {
      let fileHash = url.substring(url.lastIndexOf('/') + 1);
      NavigationActions.viewer({fileHash: fileHash});
      console.log('Initial url is: ' + url);
      console.log('Initial Hash: ', fileHash);
    }
  }).catch(err => console.error('An error occurred', err));
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
