// @flow

import React, { Component, PropTypes } from 'react'
import { ScrollView, Image, BackAndroid, Text, View, TouchableHighlight } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import I18n from 'react-native-i18n';
class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressHome = () => {
    this.toggleDrawer()
    NavigationActions.presentationScreen()
  }
  
  handlePressMyUploads = () => {
    this.toggleDrawer()
    NavigationActions.myUploads()
  }
  
  handlePressLogout = () => {
    this.toggleDrawer();
    this.props.logout();
  }

  render () {
    return (
      <View style={styles.upperContainer}>
      <ScrollView style={styles.container}>
        <Image source={Images.driprLogo} style={styles.logo} />
        <DrawerButton key="drawer-pload-file" text={I18n.t('uploadAnImage')} onPress={this.handlePressHome} />
        {this.props.loggedIn && <DrawerButton key="drawer-uploads" text={I18n.t('myUploads')} onPress={this.handlePressMyUploads} />}
      </ScrollView>
      {this.props.loggedIn &&
        <TouchableHighlight onPress={this.handlePressLogout} style={styles.bottom}>
          <View style={styles.bottomView}>
            <DrawerButton key="drawer-logout" text={I18n.t('logOut')} onPress={this.handlePressLogout} />
            <Text style={styles.text}>{this.props.user.name}</Text>
          </View>
        </TouchableHighlight>
      }
      </View>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

DrawerContent.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
    loggedIn: isLoggedIn(state.login)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)