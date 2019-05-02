import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AuthSession } from 'expo';
import axios from 'axios';

const TWITCH_APP_ID = 'vfno0i2im9fshlfil4hsyiq6esfnex'; 
const REDIRECT_URL = AuthSession.getRedirectUrl();

export default class LoginScreen extends Component {
  state = {userTwitchData: [],auth_result: [],followingStreamer: []};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title_text}> ChiManChu </Text>
        <TouchableOpacity 
        onPress={this._handlePressAsync} 
        style={styles.button}
        >
        <Ionicons name="logo-twitch" size={28} style={styles.logo} />
        <Text style={styles.text}>Login with Twitch</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _handlePressAsync = async () => {
    let result = await AuthSession.startAsync({
      authUrl:
      "https://id.twitch.tv/oauth2/authorize?client_id="+TWITCH_APP_ID+"&redirect_uri="+REDIRECT_URL+"&response_type=token&scope=viewing_activity_read+user_subscriptions+user:read:email",
    });
    console.log('result = '+JSON.stringify(result));
    this.setState({ auth_result: result });
    if(this.state.auth_result['type']=='success'){
      console.log('SUCCESS!');

      this.props.navigation.setParams({token: this.state.auth_result.params['access_token']});
      await this._handleUserdata();
      await this._handleUserFollower();
    };
  };
  _handleUserdata = async () =>{
    await axios.get('https://api.twitch.tv/helix/users',{
            headers:{'Authorization': 'Bearer '+this.props.navigation.getParam('token')}
            })
        .then(response => {this.setState({ userTwitchData: response.data.data[0]});
        });
  }
  _handleUserFollower = async () =>{
    const user_id = this.state.userTwitchData['id'];
    console.log(user_id)
    await axios.get('https://api.twitch.tv/helix/users/follows?first=100&from_id='+user_id,{
      headers:{'Authorization': 'Bearer '+this.props.navigation.getParam('token')}
      })
  .then(response => {this.setState({ followingStreamer: response.data.data});
   });
   console.log("1"+this.state.userTwitchData)
   console.log("2"+this.state.followingStreamer)
    this.props.navigation.navigate("StreamerList",{'user_data':this.state.userTwitchData,'followingStreamer':this.state.followingStreamer,'token':this.props.navigation.getParam('token')});
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignContent: 'center',
      justifyContent: 'center',
    },
    title_text:{
      fontSize: 28,
      fontWeight: 'bold',
      textAlign:'center',
      color:'#645393',
    },
    text:{
      fontSize: 18,
      alignSelf:'center',
      textAlign:'center',
      color:'#645393',
      fontWeight: "600",

    },
    button:{
      marginTop:15,
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf:'center',
      alignContent: 'center',
      width: 200,
      backgroundColor:'#ffffff',
      borderWidth:1.5,
      borderColor: '#645393',
      color:'#645393',
    },
    logo:{
      alignSelf:'baseline',
      color:'#645393',

    }
})