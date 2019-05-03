import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from '../components/Header'
import MissionFeed from '../components/MissionFeed'

export default class MissionScreen extends Component {
    static navigationOptions = ({navigation})=> {
        const headerString = navigation.getParam('headerString');
        return{
        title: headerString,
        headerBackTitle:null,
        }
    };

    render() {
      const streamer = this.props.navigation.getParam('streamer');
      console.log(JSON.stringify(streamer))
    return (
      <View>
        <Header title="Missions"/>
        
        <MissionFeed navigation={this.props.navigation}/>
      </View>
    )
  }
}
