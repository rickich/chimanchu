import React, { Component } from 'react'
import { AsyncStorage, ScrollView, Text } from 'react-native'
import axios from 'axios';
import LiveStreamerCard from './LiveStreamerCard'
import OfflineStreamerCard from './OfflineStreamerCard'
import Header from './Header'

export default class StreamerFeed extends Component {
    state = {followingStremaer: this.props.navigation.getParam('followingStreamer')};

    //  async componentDidMount(){
        
    //     // console.log(this.props.navigation.getParam('token'));
    //     // const following_streamer = await axios.get('https://api.twitch.tv/helix/users/follows?first=100&from_id='+user['id'],{
    //     //         headers:{'Authorization': 'Bearer '+this.props.navigation.getParam('token')}
    //     //         })
    //     //     .then(response => {this.setState({ followingStremaer: response.data.data});
    //     //      });
    //     //      this._handleStreamerBroadcastInfo();
    //     // this.props.navigation.setParams({token: this.props.navigation.getParam('token')});
    // }
   
    getLiveStreamerList(){
        //console.log(this.state.followingStremaer);
        return this.state.followingStremaer.map(_streamer => {
            return(
            <LiveStreamerCard key={_streamer['to_id']} streamer = {_streamer} navigation={this.props.navigation}/>
            );
        })
        
    }
    getOfflineStreamerList(){
        //console.log(this.state.followingStremaer);
        return this.state.followingStremaer.map(_streamer => {
            return(
            <OfflineStreamerCard key={_streamer['to_id']} streamer = {_streamer} navigation={this.props.navigation}/>
            );
        })
        
    }


    render() {
        return (
            <ScrollView>
                <Header title="Live"/>
                {this.getLiveStreamerList()}
                <Header title="Offline"/>
                {this.getOfflineStreamerList()}
            </ScrollView>
        )
    }
}
