// @flow

import React, {PropTypes} from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  ListView,
  RefreshControl,
  Image,
  InteractionManager
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'

// Styles
import styles from './Styles/FilesStyle'
import FilesActions from '../Redux/FilesRedux'
import Spinner from '../Lib/LoadingSpinner';
import I18n from 'react-native-i18n';

class Files extends React.Component {
  static propTypes = {
    files: PropTypes.array.isRequired,
    fetching: PropTypes.bool,
    fetchFiles: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    console.log('proooops', props)
    
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this)
      })
    };
  }

  componentDidMount() {
    this.loadMore();
    if (this.props.files.length > 0) {
      this.state.dataSource = this.getUpdatedDataSource(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.getUpdatedDataSource(nextProps)
    });
  }

  getUpdatedDataSource(props) {
    let rows = props.files;
    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }

  _rowHasChanged(r1, r2) {
    return r1.views !== r2.views;
  }

  _renderRefreshControl() {
    return (<RefreshControl
      refreshing={this.props.fetching}
      onRefresh={this.props.fetchFiles}/>);
  }

  _onPressButton(fileHash) {
    NavigationActions.viewer({fileHash: fileHash});
  }

  renderRow = (rowData) => {
    return (
      <TouchableHighlight onPress={this._onPressButton.bind(this, rowData.hash)}>
        <View style={styles.cardStyle}>
          <Image source={{uri: rowData.thumbnail}} style={styles.cardImageStyle}/>
          <Text style={styles.cardContentStyle}>
            {I18n.t('views')}: {rowData.views}
          </Text>
          <Text style={styles.cardContentStyle}>
            {I18n.t('comments')}: {rowData.comments}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  loadMore = async(asd) => {
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchFiles();
    });

  }

  render() {
    let fetchOptions = {};
    if (this.props.files.length === 0) return <View style={styles.container}><Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#FFF'}} /></View>;

    return (
      <ListView
        style={styles.container}
        renderScrollComponent={props => <InfiniteScrollView {...props}/>}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        refreshControl={this._renderRefreshControl()}
        canLoadMore={true}
        onLoadMoreAsync={this.loadMore.bind(this)}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.files.files || [],
    fetching: state.files.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFiles: () => dispatch(FilesActions.filesRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Files)
