import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default class LiveStreamerCard extends React.Component{
  state = {streamer: [],streamerBroadcastData: []};

  async componentDidMount(){
   await axios.get('https://api.twitch.tv/helix/users?id='+this.props.streamer['to_id'],{
           headers:{'Authorization': 'Bearer '+this.props.navigation.getParam('token')}
           })
       .then(response => {this.setState({ streamer: response.data.data[0]});
        });     
        this._handleStreamerBroadcastInfo(this.props.streamer);
}

   _handleStreamerBroadcastInfo = async () => {
      await axios.get('https://api.twitch.tv/helix/streams?first=1&user_id='+this.props.streamer['to_id'],{
        headers:{'Authorization': 'Bearer '+this.props.navigation.getParam('token')}
        })
      .then(response => {this.setState({ streamerBroadcastData: response.data.data[0]});
      });
 }

    render(){
        return (
            <View>
              {this.checkLive()}
              {this.displayIcon()}
            
            </View>
            );
   }
   checkLive = () =>{
    if (this.state.streamerBroadcastData!=null&&this.state.streamerBroadcastData['type'] == 'live')
       {
        this.isLive = true;
   }
   else{
     this.isLive = false;
   }
  }
   displayIcon = () =>{
       if (this.state.streamerBroadcastData!=null&&this.isLive)
       {
        return <TouchableOpacity 
        onPress={()=>
            {
            this.props.navigation.navigate('MissionList',{'streamer':this.state.streamer, 'headerString': "Missions"})}}
        style={styles.button}>

        <Image
            style={styles.thumbnail}
            source={{uri: this.state.streamer['profile_image_url']}} />
        <Text style={styles.name}>{this.state.streamer['display_name']}</Text>
        <Ionicons name="md-tv" size={28} style={styles.icon} />
        </TouchableOpacity>
       }
   }
}
export function isLive(){

}
const styles = StyleSheet.create({
    thumbnail:{
        width:25,
        height:25,
        alignSelf:'baseline',
      },
      name:{
        paddingLeft: 5,
        fontSize: 18,
        alignSelf:'center',
        textAlign:'left',
        color:'#645393',
        fontWeight: "600",
      },
      button:{
        width:'100%',
        marginTop:15,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf:'center',
        alignContent: 'center',
        backgroundColor:'#ffffff',
        borderWidth:1.5,
        borderColor: '#645393',
        color:'#645393',
      },
      icon:{
        marginLeft:'auto',
        marginRight: '1%',
        alignSelf:'baseline',
        color:'#645393',
    
      }
})

