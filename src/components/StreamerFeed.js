import React, { Component } from 'react'
import { ScrollView,StyleSheet,View, TouchableOpacity,Text } from 'react-native'
import OfflineStreamerCard from './OfflineStreamerCard'
import StreamerCard from './StreamerCard'
import Header from './Header'

export default class StreamerFeed extends Component {
    static navigationOptions = ({navigation}) => {
        return{
          headerBackTitle:null,
        }

      }
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
            <ScrollView style={styles.background}>
                <Header title="Live" />
                <View style={styles.divide}></View>
                {this.getLiveStreamerList()}
                <Header title="Offline"/>
                <View style={styles.divide}></View>
                {this.getOfflineStreamerList()}
            </ScrollView>
            
        );  
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
