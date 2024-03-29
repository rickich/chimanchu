import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView,Text,View } from 'react-native'
import MyMissionCard from './MyMissionCard'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class CurrentMissionsFeed extends Component {
    
    displayAllMissions = () =>{
        const missions = this.props.ownMissions
        let isEmpty = true

        missions.map(_mission => {
            if(_mission.status == 'current'){
                isEmpty = false;
                return;
            }
        });
        if(isEmpty){
            return <Text style={styles.noMission}>You have no on-going mission!</Text>
        }
        else{
            return missions.map(_mission => {
                if(_mission.status == 'current'){
                    return(
                    <MyMissionCard key={_mission.id} mission = {_mission} navigation={this.props.navigation}/>
                    );
                }
            })
        }
    }

    render() {
        if(this.props.ownMissions == undefined){
            return(<Text style={styles.noMission}>loading</Text>)
        }
        else if(this.props.ownMissions!= undefined){
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
        marginTop:5,
        borderBottomWidth:1.5,
        borderBottomColor:'#D5C8FA'
    },
    noMission:{
        fontFamily: 'nunito-semibold',
        padding:'5%',
        fontSize: 18,
        alignSelf:'center',
        textAlign:'left',
        color:'#645393',
        fontWeight:'bold'        
    }
})

const mapStateToProps = (state) =>  {
    const id = state.twitch.id
    const missions = state.firestore.ordered.missions;
    const ownMissions = missions ? missions.filter(_mission => {
        return _mission.to_id === id
    }) : null
    return{
        ownMissions: ownMissions,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'missions'
        }
    ])
)(CurrentMissionsFeed)