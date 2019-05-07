import React, { Component } from 'react'
import { View , StyleSheet, Text, TouchableOpacity, AsyncStorage, ScrollView, RefreshControl} from 'react-native'
import Header from '../components/Header'
import StreamerFeed from '../components/StreamerFeed'
import {updateUser} from '../actions/authActions'
import {loadTwitchData} from '../actions/twitchActions'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import axios from 'axios';
import Loading from '../components/Loading'

const TWITCH_APP_ID = 'vfno0i2im9fshlfil4hsyiq6esfnex'; 
const TWITCH_SECRET = 'w8eaix5nyl36bjrmbwtzdxjv7g6861';
const currentUserID = AsyncStorage.getItem('currentUserID');

class StreamerListScreen extends Component {
  constructor (props){
    super(props);
    this.state = {isLoading:true,user:'',refreshing:false,}
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const refresh_token = await AsyncStorage.getItem('refresh_token');

    this._validateToken(access_token,refresh_token);
  }
  
  _refreshData = async () =>{
    const access_token = await AsyncStorage.getItem('access_token');
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    this.setState({refreshing:true});
    this._validateToken(access_token,refresh_token);
  }
  _validateToken = async (access_token,refresh_token) =>{
    let result = await axios.get('https://id.twitch.tv/oauth2/validate',{
            headers:{'Authorization': 'OAuth '+access_token}
            })
            .then((result) => 
              { 
                this.props.updateUser(result.user_id);
                console.log('token validated')
                this._handleUserdata(access_token);
              }
            )
            .catch(()=>
            {
              console.log('token invalid, refreshing token')
              this._refreshToken(refresh_token)
            });
  }

  _refreshToken = async (refresh_token) =>{
    let result = await axios.post('https://id.twitch.tv/oauth2/token'+
      '?client_id='+TWITCH_APP_ID+
      '&client_secret='+TWITCH_SECRET+
      '&grant_type=refresh_token'+
      '&refresh_token='+refresh_token)
    .then((response)=>{
      AsyncStorage.setItem('access_token', response.data.access_token)
      AsyncStorage.setItem('refresh_token', response.data.refresh_token)
      this.props.setUser(currentUserID, response.data);
    })
    .catch(function (error){
      console.log(error);
    });
  }
  
  _handleUserdata = async (access_token) =>{  
    console.log('requesting user data')
    let result = await axios.get('https://api.twitch.tv/helix/users',{
            headers:{'Authorization': 'Bearer '+access_token}
            });
        this.setState({ userTwitchData: result.data.data[0]});
        this._handleUserFollower(access_token);
  }

  _handleUserFollower = async (access_token) =>{
    console.log('requesting user follower data')
    let result = await axios.get('https://api.twitch.tv/helix/users/follows?first=100&from_id='+this.state.userTwitchData["id"],{
      headers:{'Authorization': 'Bearer '+access_token}
      });
    this.setState({ followingStreamer: result.data.data});
    this._handleFollowingStreamerData(access_token);
   //
  }

  _handleFollowingStreamerData =  async (access_token) => {
    console.log('requesting following streamer data')
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
  }
  
  cleanUpData= async () => {
    data = {
      "profile_url": this.state.userTwitchData["profile_image_url"],
      "display_name": this.state.userTwitchData["display_name"],
    }     
      this.isStreamLive();
      this.setState({userData: data,isLoading:false, refreshing: false});
      this.props.loadTwitchData(this.state.userData,this.state.streamer);
  }
  isStreamLive = () =>{
    for(_streamer of this.state.streamer){
      _streamer.isLive = false;
    }

    for(_livestream of this.state.streamerBroadcastData){
      for(_streamer of this.state.streamer){
        if(_livestream['user_id']===_streamer['id']){
          _streamer.isLive = true;
          break;
        }
      }
     }    
  }



  static navigationOptions = ({ navigation }) => {
      return {
        headerLeft:<Text style={{
          fontFamily:'noto-bold',
          fontSize:16,
          color:'#fff'}
        }>ChiManChu</Text>,
        headerRight: <TouchableOpacity style={{
          width:'100%',
          }}
          onPress={()=>{
              AsyncStorage.removeItem('currentUserID');
              navigation.navigate('AuthLoading')}} 
            ><Text style={{
              fontFamily:'noto',
              fontSize:14,
              color:'#fff',
            }}> LOGOUT </Text></TouchableOpacity>
      }
        
         
  };

  render() {
    if(this.state.isLoading){
      return(
        <View>
            <Loading />
        </View>
      )
    }
    else{
      return (
        <View contentContainerStyle={{flex: 1}}>
          <ScrollView style={styles.container} refreshControl = {
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this._refreshData} title='FETCHING STREAMERS' tintColor='#645393'titleColor="#999"/>}>
            <Header title="Following Streamers"/>
            <StreamerFeed navigation={this.props.navigation}/>
          </ScrollView>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container:{
    alignContent: 'center',
  },
  
})
const mapStateToProps = (state) =>  {
  const allUsers = state.firestore.data.users ? state.firestore.data.users: null;
  return{
      users: allUsers
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    loadTwitchData: (userData,followingStreamersData) => dispatch(loadTwitchData(userData,followingStreamersData)),
    updateUser: (uid) => dispatch(updateUser(uid))
  }
}
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    {
        collection: 'users'
    }
  ])
)(StreamerListScreen)