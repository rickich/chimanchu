import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { HeaderBackButton } from 'react-navigation';


export default class AddToMissionScreen extends Component {
    static navigationOptions = ({navigation})=> {
        const headerString = navigation.getParam('headerString');
        return{
        title: headerString,
        headerBackTitle:null,
        headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('MissionList')}}/>)
        }
    };
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
