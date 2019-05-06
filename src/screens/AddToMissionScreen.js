import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { createMission } from '../actions/missionActions'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'


class AddToMissionScreen extends Component {
  streamer = this.props.navigation.getParam('streamer');
  state ={
    detail: '',
    amount: '',
    from_id: this.props.user.id,
    to_id: streamer.id,
    status: 'pending',
    mission_id: this.props.mission.id
  }

  render() {
    return (
      <View>
        <Input editable={false} label='Title' keyboardType = 'default' value={this.props.mission.title}/>
        <Input editable={false} label='Detail' keyboardType = 'default' value={this.props.mission.detail}/>
        <Input editable={false} label='Amount' keyboardType = 'numeric' value={this.props.mission.amount}/>
        <Input label='Comment' keyboardType = 'default' onChangeText={(text) => this.setState({detail: text})}/>
        <Input label='Adding Amount' keyboardType = 'numeric' onChangeText={(text) => this.setState({amount: text})}/>
        <Button title='Submit Mission'  onPress={this.handlePost}></Button>
      </View>
    )
  }
  handlePost= () =>{
    
    console.log('handleing post of >>>>'+JSON.stringify(this.props.navigation.getParam('streamer')))
    console.log('mission data: '+JSON.stringify(this.state))
    //this.props.createMission(this.state)
    this.props.navigation.navigate.goBack();
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    createAddToMission: (mission) => dispatch(createAddToMission(mission))
  }
}
const mapStateToProps = (state,ownProps) =>  {
  const id = ownProps.navigation.state.params.mission_id;
  const missions = state.firestore.data.missions;
  const ownMission = missions ? missions[id] : null; 
   console.log(missions);
   console.log(ownProps)

  return{
    mission: ownMission,
    user: state.auth 
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
      {
          collection: 'missions'
      }
  ])
)(AddToMissionScreen)