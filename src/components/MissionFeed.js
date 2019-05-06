import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView,Text,View } from 'react-native'
import MissionCard from '../components/MissionCard'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class MissionFeed extends Component {
    
    displayAllMissions = () =>{
        const streamer = this.props.navigation.getParam('streamer');
        const streamerID = streamer.id
        let isEmpty = true
        console.log(this.props.missions)
        this.props.missions.map(_mission => {
            if(_mission.to_id == streamerID){
                console.log('not empty')
                isEmpty = false;
                return;
            }
        });
        if(isEmpty){
            return <Text style={styles.noMission}>Streamer has mission given. You can submit a mission by clicking button below!</Text>
        }
        else{
            return this.props.missions.map(_mission => {
                if(_mission.to_id==streamerID){
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
        // if (this.state.missionEmpty){
        //     console.log('nomission')
        //     return <Text style={styles.noMission}>Streamer has mission given. You can submit a mission by clicking button below!</Text>
        // }
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
        missions: state.firestore.ordered.missions 
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'missions'
        }
    ])
)(MissionFeed)