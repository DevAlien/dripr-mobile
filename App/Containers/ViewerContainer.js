// @flow

import React from 'react'
import { View, ScrollView, Text, Image, Linking } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ViewerContainerStyle'
import FileActions from '../Redux/FileRedux'
import PhotoView from 'react-native-photo-view';

class ViewerContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {};
    
    props.fetchFile(props.fileHash);
  }
  componentWillUnmount() {
    this.props.resetFile();
  }

  render () {
    console.log('my file', this.props.file)
    if (!this.props.file) return null; //loading
    return (
      <View style={styles.container}>
     
        <PhotoView
  source={{uri: this.props.file.url}}
  minimumZoomScale={0.5}
  maximumZoomScale={3}
  androidScaleType="fitCenter"
  onLoad={() => console.log("Image loaded!")}
  style={styles.image} />
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    file: state.file.data || {},
    fetching: state.file.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFile: (id) => dispatch(FileActions.fileRequest(id)),
    resetFile: () => dispatch(FileActions.fileReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerContainer)
