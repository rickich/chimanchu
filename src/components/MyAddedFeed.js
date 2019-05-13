import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView,Text,View } from 'react-native'
import MissionCard from './MissionCard'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class MyAddedFeed extends Component {
    
    displayAllMissions = () =>{
        const added = this.props.ownAddeds
        const missions = this.props.missions

        let isEmpty = true

        missions.map(_mission => {
            for(_added of added){
                if(_added.mission_id == _mission.id){
                console.log('not empty')
                isEmpty = false;
                return;
                }
            }
        });
        if(isEmpty){
            return <Text style={styles.noMission}>You have no missions received!</Text>
        }
        else{
            return missions.map(_mission => {
                for(_added of added){
                        if(_added.mission_id == _mission.id){
                            return<MissionCard key={_mission.id} mission = {_mission} navigation={this.props.navigation}/>
                        }
                    }
            })
        }
    }
    render() {
        //console.log(this.props.missions)
        if(this.props.ownAddeds == undefined){
            return(<Text style={styles.noMission}>loading</Text>)
        }
        else if(this.props.ownAddeds!= undefined){
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
    const id = state.twitch.id
    // const missions = state.firestore.ordered.missions;
    // const ownMissions = missions.filter(_mission => {
    //     return _mission.from_id === id
    // })
    const addeds = state.firestore.ordered.added_to_mission;
    const ownAddeds = addeds ? addeds.filter(_added => {
        return _added.from_id === id
    }) : null;
    console.log('from fireStore'+JSON.stringify(ownAddeds));

    return{
        missions: state.firestore.ordered.missions,
        ownAddeds: ownAddeds,
        userID: id,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'missions',
            collection: 'added_to_mission'
        }
    ])
)(MyAddedFeed)