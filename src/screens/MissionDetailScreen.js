import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import { connect } from 'react-redux';
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'


class MissionDetailScreen extends Component {
    static navigationOptions = ({navigation})=> {
    return{
    title: 'MissionDetail',
    headerBackTitle:null,
    }
};
  componentDidMount(){
    //this.props.findAMission(this.props.navigation.getParam('mission'));
  }
  displayAdded = () =>{
    console.log('MISSIONS: '+JSON.stringify(this.props.addedMissions))
    if(this.props.addedMissions!=null){
      let missions = this.props.addedMissions
      return missions.map(_mission => {
        console.log(_mission['mission_id'])
        console.log(this.props.mission_id)
        if(_mission.mission_id == this.props.mission_id){
          return(
            <Text key={_mission.id}>ITS HERE!</Text>
          );
          }
      })
    }
  }
  render() {
    if(this.props.mission != undefined){
    return (
      <View>
        <Header title = {this.props.mission.title} />
        <Text>{this.props.mission.detail}</Text>
        {this.displayAdded()}
        <TouchableOpacity 
            onPress={()=>
                {
                this.props.navigation.navigate('AddToMission',{'mission':this.props.mission, 'mission_id':this.props.mission_id,'headerString': "Add to a mission"})}}
            style={styles.button}><Text>Add Bits</Text></TouchableOpacity>
      </View>
    )
  }
  else{
    return(<View>
      <Text>loading</Text>
  </View>)
  }
}
}

const styles = StyleSheet.create({
    button:{
      marginTop:15,
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf:'center',
      alignContent: 'center',
      backgroundColor:'#ffffff',
      borderWidth:1.5,
      borderColor: '#645393',
      color:'#645393',
    }
})

const mapStateToProps = (state,ownProps) =>  {
  console.log('from fireStore in detail'+JSON.stringify(state.firestore.data));
  const id = ownProps.navigation.state.params.mission_id;
  const missions = state.firestore.data.missions;
  const ownMission = missions ? missions[id] : null; 
  const addedMissions = state.firestore.ordered.added_to_mission;
 
  return{
    mission: ownMission ,
    mission_id:id,
    addedMissions: addedMissions
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      {
          collection: 'missions',
          collection: 'added_to_mission',
      }
  ])
)(MissionDetailScreen)