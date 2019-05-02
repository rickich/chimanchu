import React, { Component } from 'react'
import { View , StyleSheet} from 'react-native'
import Header from '../components/Header'
import StreamerFeed from '../components/StreamerFeed'

export default class StreamerListScreen extends Component {
  static navigationOptions = {
    title: 'ChiManChu',
    headerBackTitle:null,
  };

  render() {
    return (
        <View style={styles.container}>
          <Header title="Following Streamers"/>
          <StreamerFeed navigation={this.props.navigation}/>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent: 'center',
  }
})