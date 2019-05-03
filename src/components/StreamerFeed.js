import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import OfflineStreamerCard from './OfflineStreamerCard'
import StreamerCard from './StreamerCard'
import Header from './Header'

export default class StreamerFeed extends Component {
    getLiveStreamerList(){
        return this.props.navigation.getParam('stream_data').map(_streamer => {
            if(_streamer.isLive){
                return(
                    <StreamerCard key={_streamer['id']} streamer = {_streamer} navigation={this.props.navigation}/>
                );
            }
        });
        
    }
    getOfflineStreamerList(){
        return this.props.navigation.getParam('stream_data').map(_streamer => {
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
                <Header title="Live"/>
                {this.getLiveStreamerList()}
                <Header title="Offline"/>
                {this.getOfflineStreamerList()}
            </ScrollView>
        )
    }
}
