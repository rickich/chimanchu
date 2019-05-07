import React, { Component } from 'react'
import { Text,TouchableOpacity, StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { createMission } from '../actions/missionActions'
import {connect} from 'react-redux'

class CreateMissionScreen extends Component {
  static navigationOptions = ({navigation})=> {
      
    return{
    title: 'Missions',
    headerBackTitle:null,
    headerTintColor: '#fff',
    headerStyle:{
      backgroundColor:'#645393',
     },
    headerRight: <TouchableOpacity style={{
    width:'100%',
    }}
    onPress={()=>navigation.navigate('Login')} 
    ><Text style={{
      fontFamily:'noto',
      fontSize:14,
      color:'#fff',
    }}>LOGOUT</Text></TouchableOpacity>,
    headerRightContainerStyle:{
        paddingRight:10,
    },
    }
};
  streamer = this.props.navigation.getParam('streamer');

  state ={
    title: '',
    detail: '',
    amount: '',
    from_id: this.props.user.id,
    to_id: streamer.id,
    status: 'pending',
    from_name: this.props.twitch_user_data.displayName
  }
  render() {
    return (
      <View>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title} label='Title' keyboardType = 'default' onChangeText={(text) => this.setState({title: text})}/>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}label='Detail' keyboardType = 'default' onChangeText={(text) => this.setState({detail: text})}/>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title} label='Amount' keyboardType = 'numeric' onChangeText={(text) => this.setState({amount: text})}/>
        <TouchableOpacity style = {styles.button} onPress={this.handlePost}><Text style={styles.button_txt}>Submit Mission</Text></TouchableOpacity>
      </View>
    )
  }
  handlePost= () =>{
    this.setState({from_id: this.props.user.id,from_name:this.props.twitch_user_data.displayName})
    console.log('handleing post of >>>>'+JSON.stringify(this.props.navigation.getParam('streamer')))
    console.log('mission data: '+JSON.stringify(this.state))
    this.props.createMission(this.state)
    this.props.navigation.navigate('MissionList')
  }
}
const styles = StyleSheet.create({
  divide :{
    borderBottomWidth:1.5,
    borderBottomColor:'#645393'
},
  label:{
    marginTop:40,
    marginLeft:'7%',
    marginBottom:2,
    fontFamily: 'noto',
    color:'#645393',
  },
  title:{
    marginHorizontal:'5%',
    width:'90%',
    borderColor:'#645393',
    borderBottomWidth:1.5,
    justifyContent:'center',
    borderRadius:5,
    height:50,
  },
  title_text:{
    fontFamily: 'nunito-semibold',
      paddingLeft: 10,
      fontSize: 20,
      alignSelf:'flex-start',
      textAlign:'left',
      color:'#645393', 
  },
  detail_container:{
    marginHorizontal:'5%',
    width:'90%',
    borderColor:'#645393',
    borderWidth:1.5,
    justifyContent:'flex-start',
    borderRadius:5,
    height:120,
  },
    detail:{
      fontFamily: 'nunito-semibold',
      paddingTop: 7,
      paddingLeft: 10,
      fontSize: 18,
      alignSelf:'flex-start',
      textAlign:'left',
      color:'#645393', 
    },
    button:{
      alignItems:'center',
      justifyContent:'center',
      margin:'5%',
      backgroundColor:'#645393',
      borderRadius:10,
      height:50,
  },
  button_txt:{
    fontFamily: 'nunito-semibold',
    color:'#fff',
    textAlign:'center',
    alignSelf:'center'
  },
})


const mapStateToProps = (state) =>{
  return{
    user: state.auth,
    twitch_user_data:state.twitch
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    createMission: (mission) => dispatch(createMission(mission))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateMissionScreen)