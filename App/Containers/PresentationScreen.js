// @flow

import React from 'react'
import {ScrollView, Text, Image, View} from 'react-native'
import { Colors, Images, Metrics } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import {Actions as NavigationActions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import LoginActions, {isLoggedIn} from '../Redux/LoginRedux'
import FilesActions from '../Redux/FilesRedux'
import FileActions from '../Redux/FileRedux'
// Styles
import styles from './Styles/PresentationScreenStyle'
const FBSDK = require('react-native-fbsdk');

import ImagePicker from 'react-native-image-crop-picker';
import Spinner from '../Lib/LoadingSpinner';
const {LoginButton, LoginManager, AccessToken} = FBSDK;
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

class PresentationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fbLogin: false
    };
  }

  fbDoLogin = () => {
    this.setState({fbLogin: true});
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data) {
        this.setState({fbLogin: false});
        return this.props.login(data);
      }
      return this.fbLogin();
    });
  }

  fbLogin() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
      if (!result.isCancelled) {
        this.fbDoLogin();
      }
      this.setState({fbLogin: false});
    }).catch((error) => {
      this.setState({fbLogin: false});
      console.log('Login failed with error: ' + error);
    });
  }

  componentWillUnmount() {
    this.props.resetFile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.file && nextProps.file.hash) {
      NavigationActions.viewer({fileHash: nextProps.file.hash});
    }
  }

  openSelectImage = () => {
    ImagePicker.openPicker({}).then(image => {
      this.props.postFiles(image);
    }).catch((err) => {});
  }

  openCamera = () => {
    ImagePicker.openCamera({width: 600, height: 800, cropping: true}).then(image => {
      this.props.postFiles(image);
    }).catch((err) => {});
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Spinner
          visible={this.props.fetching}
          textContent={I18n.t('uploadingFile')}
          textStyle={{color: '#FFF'}}
          color="white"/>
        <Spinner
          visible={this.props.fetchingLogin || this.state.fbLogin}
          textContent={I18n.t('loggingIn')}
          textStyle={{color: '#FFF'}}
          color="white"/>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode='stretch'/>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.driprLogo} style={styles.logo}/>
          </View>
          <RoundedButton onPress={this.openSelectImage}>{I18n.t('uploadAnImage')}</RoundedButton>
          <RoundedButton onPress={this.openCamera}>{I18n.t('takeAPhoto')}</RoundedButton>
          {!this.props.loggedIn && 
            <View style={styles.section} >
            <Text style={styles.sectionText} >{I18n.t('loginReason')}</Text>
          </View>
          }
          {!this.props.loggedIn && 
            <View style={styles.groupContainer}>
              <Icon.Button name='facebook' style={styles.facebookButton} backgroundColor={Colors.facebook} onPress={this.fbDoLogin}>
                {I18n.t('loginWithFacebook')}
              </Icon.Button>
            </View>
          }
          {this.props.loggedIn && <RoundedButton onPress={this.props.logout}>{I18n.t('logOut')}</RoundedButton>}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login),
    fetching: state.file.fetching || false,
    file: state.file.data,
    fetchingLogin: state.login.fetching || false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout()),
    requestTemperature: (city) => dispatch(TemperatureActions.temperatureRequest(city)),
    login: (data) => dispatch(LoginActions.loginRequest(data)),
    fetchFiles: () => dispatch(FilesActions.filesRequest()),
    postFiles: (data) => dispatch(FileActions.fileUpload(data)),
    resetFile: () => dispatch(FileActions.fileReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)