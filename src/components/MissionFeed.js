import React, { Component } from 'react'
import { StyleSheet, ScrollView,Text,View } from 'react-native'
import MissionCard from '../components/MissionCard'


export default class MissionFeed extends Component {
    state = {missionList: []};
    
    componentDidMount(){
       const streamer = this.props.navigation.getParam('streamer');
       const streamerID = streamer.id
    }

    redirectNoMission(streamer){
        this.props.navigation.navigate('NoMission',{'streamer':streamer,'headerString':'Ouch!'})
    }

    getOngoingMissionList(){
        return this.state.missionList.map(_mission => {
            if(_mission.status=="ongoing"){
            return(
            <MissionCard key={_mission.id} mission = {_mission} navigation={this.props.navigation}/>
            );
            }
        })
        
    }
    getPendingMissionList(){
        return this.state.missionList.map(_mission => {
            if(_mission.status=="pending"){
            return(
            <MissionCard key={_mission.id} mission = {_mission} navigation={this.props.navigation}/>
            );
            }
        })
        
    }

    render() {
        return (
            <ScrollView>
                
                <Text> Current Mission </Text>
                <View style={styles.divide}></View>
                {this.getOngoingMissionList()}
                <Text> Pending Mission </Text>
                {this.getPendingMissionList()}
            </ScrollView>
        )
    }
}
const styles= StyleSheet.create({
    divide :{
        borderBottomWidth:2,
        borderBottomColor:'#645393'
    }
})
