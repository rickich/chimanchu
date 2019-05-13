import React, { Component } from 'react'
import { Text, View,AsyncStorage } from 'react-native'
import Loading from '../components/Loading'
import {connect} from 'react-redux'
import {updateUserID} from '../actions/authActions'


 class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }
    
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => {
        const currentUserID = await AsyncStorage.getItem('currentUserID')
        this.props.updateUserID(currentUserID);

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
const mapDispatchToProps = (dispatch) =>{
  return{
    updateUserID: (userID) => dispatch(updateUserID(userID)),
  }
}

export default connect(null,mapDispatchToProps)(AuthLoadingScreen)