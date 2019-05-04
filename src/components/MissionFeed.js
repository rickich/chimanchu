import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView,Text,View } from 'react-native'
import MissionCard from '../components/MissionCard'
import {connect} from 'react-redux'


class MissionFeed extends Component {
    componentDidMount(){
       const streamer = this.props.navigation.getParam('streamer');
       const streamerID = streamer.id
    }

    returnNoMission(streamer){
        <Text>NO MISSION</Text>
        }
    
    getCurrentMission = () => {
        const allMissionIds = Object.keys(this.props.missions);
        for (let i = 0; i<allMissionIds.length;i++){
            if(this.props.missions[allMissionIds[i]].to_id==streamer.id){
               console.log('missions here')
            }
        }
    }
    
    displayCurrentMission = () =>{
        console.log(this.props.missions.abc.to_id)
        this.getCurrentMission();
    }

    render() {
        //console.log(this.props.missions)

        return (
            <ScrollView>
                <TouchableOpacity onPress={this.displayCurrentMission}><Text>Current</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.displayCurrentMission}><Text>Pending</Text></TouchableOpacity>

                <View style={styles.divide}></View>
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

const mapStateToProps = (state) => {
    return{
        missions: state.mission.missions 
    }
}

export default connect(mapStateToProps)(MissionFeed)