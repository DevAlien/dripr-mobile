import React, { PropTypes } from 'react'
import { View, Image, LayoutAnimation, Clipboard } from 'react-native'
import NavItems from './NavItems'
import styles from './Styles/CustomNavBarStyle'
import { connect } from 'react-redux'
import { Metrics, Images } from '../Themes'
class CustomNavBar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showSearchBar: false
    }
  }

  onCopy = () => {
    Clipboard.setString('https://dripr.io/file/' + this.props.file.hash);
  }

  renderMiddle () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (this.state.showSearchBar) {
      return null
    } else {
      return (
        <Image resizeMode='contain' style={styles.logo} source={Images.driprLogo} />
      )
    }
  }

  renderRightButtons () {
    if (this.state.showSearchBar) {
      return <View style={{width: Metrics.icons.medium}} />
    } else {
      return (
        <View style={styles.rightButtons}>
          {NavItems.copyButton(this.onCopy)}
        </View>
      )
    }
  }

  renderLeftButtons () {
    if (this.state.showSearchBar) {
      return null
    } else {
      return (
        <View style={styles.leftButtons}>
          {NavItems.backButton()}
        </View>
      )
    }
  }

  render () {
    let state = this.props.navigationState
    let selected = state.children[state.index]
    while (selected.hasOwnProperty('children')) {
      state = selected
      selected = selected.children[selected.index]
    }

    const containerStyle = [
      styles.container,
      this.props.navigationBarStyle,
      state.navigationBarStyle,
      selected.navigationBarStyle
    ]

    return (
      <View style={containerStyle}>
        {this.renderLeftButtons()}
        {this.renderMiddle()}
        {this.renderRightButtons()}
      </View>
    )
  }
}

CustomNavBar.propTypes = {
  navigationState: PropTypes.object,
  navigationBarStyle: View.propTypes.style
}

const mapStateToProps = (state) => {
  return {
    file: state.file.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavBar)
