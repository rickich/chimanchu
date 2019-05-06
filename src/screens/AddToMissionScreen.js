import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements'
import { createAddToMission } from '../actions/missionActions'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'


class AddToMissionScreen extends Component {
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
    }}>Hi,{userdata.display_name} </Text></TouchableOpacity>,
    headerRightContainerStyle:{
        paddingRight:10,
    },
    }
};
  streamer = this.props.navigation.getParam('streamer');
  state ={
    amount: '',
    from_id: this.props.user.id,
    to_id: streamer.id,
    mission_id: this.props.mission_id,
    from_name: this.props.user.displayName
  }

  render() {
    return (
      <View>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}editable={false} label='Title' keyboardType = 'default' value={this.props.mission.title}/>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}editable={false} label='Detail' keyboardType = 'default' value={this.props.mission.detail}/>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}editable={false} label='Amount' keyboardType = 'numeric' value={this.props.mission.amount}/>
        <Input labelStyle={styles.label} containerStyle={styles.inputContainer} inputContainerStyle={styles.title}label='Adding Amount' keyboardType = 'numeric' onChangeText={(text) => this.setState({amount: text})}/>
        <TouchableOpacity style = {styles.button} title='Submit Mission'  onPress={() =>{
          this.props.createAddToMission(this.state); 
          this.props.navigation.navigate('MissionDetail',{'mission':this.props.mission})
          }}><Text style={styles.button_txt}>Add To this Mission</Text></TouchableOpacity>
      </View>
    )
  }
  handlePost= () =>{
    
    console.log('handleing post of >>>>'+JSON.stringify(this.props.navigation.getParam('streamer')))
    console.log('mission data: '+JSON.stringify(this.state.from_name))
    //this.props.createMission(this.state)
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
    user: state.auth,
    mission_id: id,
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