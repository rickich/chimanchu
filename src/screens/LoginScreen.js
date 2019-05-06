import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AuthSession } from 'expo';
import axios from 'axios';
import Loading from '../components/Loading'
import {connect} from 'react-redux'
import {loadUser} from '../actions/authActions'

const TWITCH_APP_ID = 'vfno0i2im9fshlfil4hsyiq6esfnex'; 
const REDIRECT_URL = AuthSession.getRedirectUrl();

let data = {
  "access_token": null,
  "user_id": null,
  "profile_url": null,
  "display_name": null,
  "following_streamer_data": null,
}
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } 
  });
}

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
}
  state = {userTwitchData: [],auth_result: [],followingStreamer: [],streamer: []};
 
  render() {
    if (this.state.isLoading){
      return <Loading />
    }
  
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
    //console.log('result = '+JSON.stringify(result));
    this.setState({ auth_result: result });
    if(this.state.auth_result['type']=='success'){
      console.log('AUTH_SUCCESS!' + JSON.stringify(this.state.auth_result));
      data["access_token"]=this.state.auth_result.params['access_token'];
      this._handleUserdata(data["access_token"]);
    };
  };

  _handleUserdata = async (access_token) =>{  
    this.setState({isLoading:true})  
    let result = await axios.get('https://api.twitch.tv/helix/users',{
            headers:{'Authorization': 'Bearer '+access_token}
            });
        this.setState({ userTwitchData: result.data.data[0]});
        this._handleUserFollower(access_token);
  }

  _handleUserFollower = async (access_token) =>{
    let result = await axios.get('https://api.twitch.tv/helix/users/follows?first=100&from_id='+this.state.userTwitchData["id"],{
      headers:{'Authorization': 'Bearer '+access_token}
      });
    this.setState({ followingStreamer: result.data.data});
    this._handleFollowingStreamerData(access_token);
   //
  }

  _handleFollowingStreamerData =  async (access_token) => {
    let query1 = 'https://api.twitch.tv/helix/users?' //to get userID for each following streamer
    let query2 = 'https://api.twitch.tv/helix/streams?first=100&' //to get data for each of their most recent broadcast to see if they are currently live
    
    for (_streamer of this.state.followingStreamer){
      id = _streamer.to_id
      query1 = query1+"id="+id+"&"
      query2 = query2+"user_id="+id+"&"
    }

    let result = await axios.get(query1,{
      headers:{'Authorization': 'Bearer '+access_token}
      });
    this.setState({ streamer: result.data.data }); 

    let broadcastInfo = await axios.get(query2,{
        headers:{'Authorization': 'Bearer '+access_token}
        });
    await this.setState({ streamerBroadcastData: broadcastInfo.data.data}); 
    await this.isStreamLive();
    await this.cleanUpData();
    //console.log(JSON.stringify(this.state.streamer))
    setTimeout(() => {
      this.setState({isLoading: false})
      this.props.navigation.navigate("StreamerList",{'user_data':this.state.userData,'stream_data':this.state.streamer});
    }, 1000)
  }
  
  cleanUpData= async () => {
    data = {
      "access_token": this.state.auth_result.params['access_token'],
      "user_id": this.state.userTwitchData["id"],
      "profile_url": this.state.userTwitchData["profile_image_url"],
      "display_name": this.state.userTwitchData["display_name"],
    }     
      this.getLiveStreams();
      this.getOfflineStreams();
      this.setState({userData: data});
      this.props.loadUser(this.state.userData);
  }
  getLiveStreams = ()=>{
    liveStreams =  this.state.streamer.filter(function(item){
      return item.isLive == true;
    });
  }
  getOfflineStreams = ()=>{
    offlineStreams =  this.state.streamer.filter(function(item){
      return item.isLive == false;
    });
  }
  isStreamLive = () =>{
    for(_streamer of this.state.streamer){
      _streamer.isLive = false;
    }

    for(_livestream of this.state.streamerBroadcastData){
      for(_streamer of this.state.streamer){
        if(_livestream['user_id']===_streamer['id']){
          _streamer.isLive = true;
          console.log(_livestream['user_name']);
          break;
        }
      }
     }    
  }

  render() {
    if (this.state.isLoading){
      return <Loading />
    }
  
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
}


const styles = StyleSheet.create({
    container:{
      flex:1,
      alignContent: 'center',
      justifyContent: 'center',
    },
    title_text:{
      fontSize: 48,
      fontWeight: 'bold',
      textAlign:'center',
      color:'#645393',
    },
    text:{
      paddingLeft:'15%',
      fontSize: 18,
      alignSelf:'center',
      textAlign:'left',
      color:'#645393',
    },
    button:{
      marginTop:15,
      padding: 5,
      flexDirection: 'row',
      alignSelf:'center',
      alignContent: 'center',
      width: '70%',
      backgroundColor:'#ffffff',
      borderWidth:3,
      borderColor: '#645393',
      color:'#645393',
    },
    logo:{
      paddingLeft: '5%',
      alignSelf:'baseline',
      color:'#645393',
      
    }
})
const mapDispatchToProps = (dispatch) =>{
  return{
    loadUser: (user) => dispatch(loadUser(user))
  }
}

export default connect(null,mapDispatchToProps)(LoginScreen)