import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView,Text,View } from 'react-native'
import MissionCard from '../components/MissionCard'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class MissionFeed extends Component {
    state = {
        isLoading: true
    }
    componentDidMount(){
       this.setState({isLoading: false});
    }
    
    displayAllMissions = () =>{
       const streamer = this.props.navigation.getParam('streamer');
       const streamerID = streamer.id
       console.log(this.props.missions)
        return this.props.missions.map(_mission => {
            if(_mission.to_id==streamerID){
            return(
            <MissionCard key={_mission.id} mission = {_mission} navigation={this.props.navigation}/>
            );
            }
        })
    }

    render() {
        //console.log(this.props.missions)
        if(this.props.missions == undefined){
            return(<View>
                <Text>loading</Text>
            </View>)
        }
        else{
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
        borderBottomWidth:2,
        borderBottomColor:'#645393'
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