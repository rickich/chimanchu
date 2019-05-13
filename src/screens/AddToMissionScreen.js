import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements'
import { createAddToMission } from '../actions/missionActions'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import FontAwesome from '@expo/vector-icons/FontAwesome'


class AddToMissionScreen extends Component {
  static navigationOptions = ({navigation})=> {
      
    return{
    title: 'Missions',
    headerRight: <TouchableOpacity style={{
      width:'100%',
      }}
      onPress={()=>{
          navigation.navigate('MyProfile')}} 
        ><FontAwesome name="user-circle" size={20} color="white" style={{paddingRight: 10,}}/></TouchableOpacity>
    }
};
  streamer = this.props.navigation.getParam('streamer');
  state ={
    amount: '',
    from_id: this.props.twitch_user_data.id,
    to_id: this.props.mission.to_id,
    mission_id: this.props.mission_id,
    from_name: this.props.twitch_user_data.displayName,
  }

  render() {
    return (
      <View>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}editable={false} label='Title' keyboardType = 'default' value={this.props.mission.title}/>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}editable={false} label='Detail' keyboardType = 'default' value={this.props.mission.detail}/>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}editable={false} label='Amount' keyboardType = 'numeric' value={this.props.mission.amount}/>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}label='Adding Amount' keyboardType = 'numeric' onChangeText={(text) => this.setState({amount: text})}/>
        <TouchableOpacity style = {styles.button} title='Submit Mission'  onPress={() =>{
          sum = parseInt(this.props.mission.total_amount)+parseInt(this.state.amount)
          this.props.createAddToMission(this.state,sum); 
          this.props.navigation.navigate('MissionDetail',{'mission':this.props.mission})
          }}><Text style={styles.button_txt}>Add To this Mission</Text></TouchableOpacity>
      </View>
    )
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
      height:40,
  },
  button_txt:{
    fontFamily: 'nunito-semibold',
    color:'#fff',
    textAlign:'center',
    alignSelf:'center',
    paddingTop:11
  },
})

const mapDispatchToProps = (dispatch) =>{
  return{
    createAddToMission: (mission,sum) => dispatch(createAddToMission(mission,sum))
  }
}
const mapStateToProps = (state,ownProps) =>  {
  const id = ownProps.navigation.state.params.mission_id;
  const missions = state.firestore.data.missions;
  const ownMission = missions ? missions[id] : null; 
  //  console.log(missions);
  //  console.log(ownProps)

  return{
    mission: ownMission,
    user: state.auth,
    mission_id: id,
    twitch_user_data:state.twitch
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