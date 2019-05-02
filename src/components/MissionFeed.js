import React, { Component } from 'react'
import { ScrollView,Text } from 'react-native'
import axios from 'axios';
import MissionCard from '../components/MissionCard'


export default class MissionFeed extends Component {
    state = {missionList: []};
    
    componentDidMount(){
       const streamer = this.props.navigation.getParam('streamer');
       const streamerID = streamer.id

    axios.get('http://localhost:3000/missions')
    .then(response => {this.setState({ missionList: response.data[streamerID] });
     });
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
                {this.getOngoingMissionList()}
                <Text> Pending Mission </Text>
                {this.getPendingMissionList()}
            </ScrollView>
        )
    }
}
