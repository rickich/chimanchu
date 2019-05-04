import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView,Text,View } from 'react-native'
import MissionCard from '../components/MissionCard'


export default class MissionFeed extends Component {
    state = {missionList: [],missionDisplayType: 'current'};
    
    componentDidMount(){
       const streamer = this.props.navigation.getParam('streamer');
       const streamerID = streamer.id
    }

    redirectNoMission(streamer){
        this.props.navigation.navigate('NoMission',{'streamer':streamer,'headerString':'Ouch!'})
    }

    getOngoingMissionList(){
        return this.state.missionList.map(_mission => {
            if(this.state.missionDisplayType=="current"){
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
    displayCurrentMission = () =>{
        this.getOngoingMissionList();
    }
    displayPendingMission = () =>{
        this.getOngoingMissionList();
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={this.displayCurrentMission()}><Text>Current</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.displayPendingMission()}><Text>Pending</Text></TouchableOpacity>

                <View style={styles.divide}></View>
                {this.getOngoingMissionList()}
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
