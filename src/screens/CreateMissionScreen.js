import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { createMission } from '../actions/missionActions'
import {connect} from 'react-redux'

class CreateMissionScreen extends Component {
  streamer = this.props.navigation.getParam('streamer');

  state ={
    title: '',
    detail: '',
    amount: '',
    from_id: this.props.user.id,
    to_id: streamer.id,
    status: 'pending',
  }
  render() {
    return (
      <View>
        <Input label='Title' keyboardType = 'default' onChangeText={(text) => this.setState({title: text})}/>
        <Input label='Detail' keyboardType = 'default' onChangeText={(text) => this.setState({detail: text})}/>
        <Input label='Amount' keyboardType = 'numeric' onChangeText={(text) => this.setState({amount: text})}/>
        <Button title='Submit Mission'  onPress={this.handlePost}></Button>
      </View>
    )
  }
  handlePost= () =>{
    
    console.log('handleing post of >>>>'+JSON.stringify(this.props.navigation.getParam('streamer')))
    console.log('mission data: '+JSON.stringify(this.state))
    this.props.createMission(this.state)
    this.props.navigation.navigate('MissionList')
  }
}
const mapStateToProps = (state) =>{
  return{
    user: state.auth
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    createMission: (mission) => dispatch(createMission(mission))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateMissionScreen)