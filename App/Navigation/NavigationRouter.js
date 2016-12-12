// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import Files from '../Containers/Files'
import ViewerContainer from '../Containers/ViewerContainer'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='presentationScreen' component={PresentationScreen} title='Dripr Home' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='myUploads' component={Files} title='Uploads' />
            <Scene key='viewer' component={ViewerContainer} title='Dripr' navBar={CustomNavBar}/>
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
