import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView,Text,View } from 'react-native'
import MissionCard from './MissionCard'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class MyMissionFeed extends Component {
    
    displayAllMissions = () =>{
        const missions = this.props.missions
        const myID = this.props.userID
        let isEmpty = true
        console.log(this.props.missions)
        missions.map(_mission => {
            if(_mission.from_id == myID){
                console.log('not empty')
                isEmpty = false;
                return;
            }
        });
        if(isEmpty){
            return <Text style={styles.noMission}>You have no missions given to streamers yet! </Text>
        }
        else{
            return missions.map(_mission => {
                if(_mission.from_id==myID){
                    return(
                    <MissionCard key={_mission.id} mission = {_mission} navigation={this.props.navigation}/>
                    );
                }
            })
        }
    }

    render() {
        //console.log(this.props.missions)
        if(this.props.missions == undefined){
            return(<View>
                <Text>loading</Text>
            </View>)
        }
        else if(this.props.missions!= undefined){
            return (
                <ScrollView>
                    <View style={styles.divide}></View>
                    {this.displayAllMissions()}
                </ScrollView>
            )
        }
    }
}

const styles= StyleSheet.create({
    divide :{
        borderBottomWidth:1.5,
        borderBottomColor:'#645393'
    },
    noMission:{
        fontFamily: 'nunito-semibold',
        paddingLeft: 10,
        fontSize: 18,
        alignSelf:'center',
        textAlign:'left',
        color:'#645393',
        fontWeight:'bold'        
    }
})

const mapStateToProps = (state) =>  {
    console.log('from fireStore'+JSON.stringify(state.firestore.ordered.missions));

    return{
        missions: state.firestore.ordered.missions,
        userID: state.twitch.id,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'missions'
        }
    ])
)(MyMissionFeed)