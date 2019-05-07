import React, { Component } from 'react'
import { Text, View,AsyncStorage } from 'react-native'
import Loading from '../components/Loading'

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }
    
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => {
        const currentUserID = await AsyncStorage.getItem('currentUserID');
        
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(currentUserID ? 'App' : 'Auth');
      };

  render() {
    return (
     <Loading />
    )
  }
}
