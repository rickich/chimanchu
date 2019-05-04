import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { createMission } from '../actions/missionActions'
import {connect} from 'react-redux'

class CreateMissionScreen extends Component {
  state ={
    title: '',
    detail: '',
    amount: '',
    from_id: '',
    to_id: '',
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
    console.log('handleing post of >>>>'+JSON.stringify(this.props.streamer))
    this.props.createMission(this.state)
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    createMission: (mission) => dispatch(createMission(mission))
  }
}

export default connect(null,mapDispatchToProps)(CreateMissionScreen)