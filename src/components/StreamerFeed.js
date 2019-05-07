import React, { Component } from 'react'
import { ScrollView,StyleSheet,View, TouchableOpacity,Text } from 'react-native'
import OfflineStreamerCard from './OfflineStreamerCard'
import StreamerCard from './StreamerCard'
import Header from './Header'
import {connect} from 'react-redux'

class StreamerFeed extends Component {
    constructor (props){
        super(props);
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
        if(this.props.streamers == undefined){
            return(<View>
                <Text>loading</Text>
            </View>)
        }
        else{
            return (
                <ScrollView style={styles.background}>
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
        streamers: state.twitch.followingStreamers
    }
}


export default connect(mapStateToProps)(StreamerFeed)