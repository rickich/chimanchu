import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView,Text,View } from 'react-native'
import MyMissionCard from './MyMissionCard'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class PendingMissionsFeed extends Component {
    
    displayAllMissions = () =>{
        const missions = this.props.ownMissions
        let isEmpty = true

        missions.map(_mission => {
            if(_mission.status == 'pending'){
                console.log('not empty')
                isEmpty = false;
                return;
            }
        });
        if(isEmpty){
            return <Text style={styles.noMission}>You have no missions received!</Text>
        }
        else{
            return missions.map(_mission => {
                if(_mission.status == 'pending'){
                    return(
                    <MyMissionCard key={_mission.id} mission = {_mission} navigation={this.props.navigation}/>
                    );
                }
            })
        }
    }

    render() {
        console.log(this.props.ownMissions)
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
)(PendingMissionsFeed)