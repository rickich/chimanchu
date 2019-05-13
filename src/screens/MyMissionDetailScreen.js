import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity,Image } from 'react-native'
import Header from '../components/Header'
import { connect } from 'react-redux';
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { discardMission,updateMissionStatus } from '../actions/missionActions'


class MyMissionDetailScreen extends Component {
  static navigationOptions = ({navigation})=> {
    return{
    title: 'Mission Detail',
    headerBackTitle:null,
    headerRight: <TouchableOpacity style={{
      width:'100%',
      }}
      onPress={()=>{
          navigation.navigate('MyProfile')}} 
        ><FontAwesome name="user-circle" size={20} color="white" style={{paddingRight: 10,}}/></TouchableOpacity>
    }
};
  

  displayAdded = () =>{
    if(this.props.addedMissions!=null){
      let missions = this.props.addedMissions
      return missions.map(_mission => {
        // console.log(_mission['mission_id'])
        // console.log(this.props.mission_id)
        if(_mission.mission_id == this.props.mission_id){
          return(
            <View key={_mission.id} style={styles.donorTitle}>
              <Text>{_mission.from_name}</Text>
              <Text>{_mission.amount}</Text>
            </View>
          );
          }
      })
    }
  }
  displayTotal = () =>{
    if(this.props.addedMissions!=null){
    let sum = this.props.mission.amount
    this.props.addedMissions.map(_mission => {
      if(_mission.mission_id == this.props.mission_id){
        sum=parseInt(sum)+parseInt(_mission.amount);
      }
    })
    return <Text>{sum}</Text>
  }
}
  render() {
    if(this.props.mission != undefined){
    return (
      <View style={styles.container}>
         {/* <Image
            style={styles.thumbnail}
            source={{uri: streamer["profile_image_url"]}} /> */}    
        <View style={styles.title_container}>
        <Text style={styles.label}>Mission Title</Text>
        <View style={styles.title}>
        <Text style={styles.title_text}> {this.props.mission.title}</Text></View>
        </View>
        <Text style={styles.label}>Mission Detail</Text>
        <View style={styles.detail_container}>
        <Text style={styles.detail}>{this.props.mission.detail}</Text>
        </View>
        <View style={styles.donorHeading}>
          <Text>
            Donator
          </Text>
          <Text>
            Amount
          </Text>
        </View>
        <View style={styles.divide}></View>
       
        <ScrollView style = {styles.added_container}>
           <View  style={styles.donorTitle}>
            <Text>{this.props.mission.from_name}</Text>
            <Text>{this.props.mission.amount}</Text>
          </View>
        {this.displayAdded()}
        </ScrollView>
        <View style={styles.divideLast}></View>
        <View style={styles.totalSection}>
          <Text>TOTAL: {this.props.mission.total_amount}</Text>
        </View>
        <View style={{flexDirection:'row', flex:0.8}}>
          <TouchableOpacity 
            onPress={()=>
                {
                  console.log(this.props.mission_id)
                this.props.discardMission(this.props.mission_id);
                this.props.navigation.navigate('MyProfile')}}
            style={styles.cbutton}><Text style={styles.button_txt}>Cancel</Text></TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>
                {
                  this.props.updateMissionStatus(this.props.mission_id);
                this.props.navigation.navigate('MyProfile')}}
            style={styles.button}><Text style={styles.button_txt}>Accept</Text></TouchableOpacity>
        </View>
        
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
  container:{
    flex:1,
    justifyContent:'center'
  },
  title_container:{
    flex:1,
  },
  totalSection:{
    marginTop:3,
    marginHorizontal:'7%',
    marginBottom:2,
    fontFamily: 'noto',
    color:'#645393',
    flexDirection:'row',
    justifyContent: 'flex-end',
  },
  donorHeading:{
    marginTop:35,
    marginHorizontal:'7%',
    marginBottom:2,
    fontFamily: 'noto',
    color:'#645393',
    flexDirection:'row',
    justifyContent: 'space-between',

  },
  donorTitle:{
    marginTop:20,
    marginHorizontal:'7%',
    marginBottom:2,
    fontFamily: 'noto',
    color:'#645393',
    flexDirection:'row',
    justifyContent: 'space-between',

  },
  divide :{
    borderBottomWidth:1.5,
    borderBottomColor:'#645393',
    marginHorizontal:'5%',
},
divideLast :{
  marginTop:20,
  borderBottomWidth:1.5,
  borderBottomColor:'#645393',
  marginHorizontal:'5%',
},
  label:{
    marginTop:20,
    marginLeft:'7%',
    marginBottom:2,
    fontFamily: 'noto',
    color:'#645393',
  },
  title:{
    height:50,
    marginHorizontal:'4%',
    width:'90%',
    borderColor:'#645393',
    borderWidth:1.5,
    justifyContent:'center',
    borderRadius:5,
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
    flex:1.6,
    marginHorizontal:'4%',
    width:'90%',
    borderColor:'#645393',
    borderWidth:1.5,
    justifyContent:'flex-start',
    borderRadius:5,
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
    added_container:{
      flex:1
    },
    button:{
      flex:1,
      margin:'5%',
      backgroundColor:'#645393',
      borderRadius:10,
      justifyContent: 'center',
      alignItems:'center',
  },
  cbutton:{
    flex:1,
    margin:'5%',
    backgroundColor:'#CC4553',
    borderRadius:10,
    justifyContent: 'center',
    alignItems:'center',
},
  button_txt:{
    flex:1,
    color:'#fff',
    alignSelf:'center',
    paddingTop:14,
  },
})
const mapDispatchToProps = (dispatch) =>{
  return{
    discardMission: (mID) => dispatch(discardMission(mID)),
    updateMissionStatus: (mID) => dispatch(updateMissionStatus(mID))
  }
}

const mapStateToProps = (state,ownProps) =>  {
  const id = ownProps.navigation.state.params.mission_id;
  console.log(id)
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
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
      {
          collection: 'missions',
          collection: 'added_to_mission',
      }
  ])
)(MyMissionDetailScreen)