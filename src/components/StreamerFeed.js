import React, { Component } from 'react'
import { ScrollView,StyleSheet,View, RefreshControl } from 'react-native'
import OfflineStreamerCard from './OfflineStreamerCard'
import StreamerCard from './StreamerCard'
import Header from './Header'
import {connect} from 'react-redux'

class StreamerFeed extends Component {
    constructor (props){
        super(props);
        this.state = {
            refreshing: false,
        }
    }
    getLiveStreamerList(){
        return this.props.streamers.map(_streamer => {
            if(_streamer.isLive){
                return(
                    <StreamerCard key={_streamer['id']} streamer = {_streamer} navigation={this.props.navigation}/>
                );
            }
        });
        
    }
    getOfflineStreamerList(){
        return this.props.streamers.map(_streamer => {
            if(!_streamer.isLive){
                return(
                    <OfflineStreamerCard key={_streamer['id']} streamer = {_streamer} navigation={this.props.navigation}/>
                );
            }
        });
    }


    render() {
            return (
                <ScrollView>
                    <Header title="Live" />
                    <View style={styles.divide}></View>
                    {this.getLiveStreamerList()}
                    <Header title="Offline"/>
                    <View style={styles.divide}></View>
                    {this.getOfflineStreamerList()}
                </ScrollView>
                
            )
        
    }
}
const styles= StyleSheet.create({
    background:{
        backgroundColor:'#ffffff'
    },
    divide :{
        backgroundColor:'#fff',
        borderBottomWidth:1.5,
        borderBottomColor:'#a9a0c0'
    }
})
const mapStateToProps = (state) =>  {
    //console.log('loading state of'+JSON.stringify(state.twitch))
    return{
        streamers: state.twitch.followingStreamers,
        twitchData: state.twitch
    }
}


export default connect(mapStateToProps)(StreamerFeed)