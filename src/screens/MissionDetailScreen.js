import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import { connect } from 'react-redux';
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import { ScrollView } from 'react-native-gesture-handler';


class MissionDetailScreen extends Component {
  static navigationOptions = ({navigation})=> {
    return{
    title: 'Mission Detail',
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
  

  displayAdded = () =>{
    console.log('MISSIONS: '+JSON.stringify(this.props.addedMissions))
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
      <View>
        <Text style={styles.label}>Mission Title</Text>
        <View style={styles.title}>
        <Text style={styles.title_text}> {this.props.mission.title}</Text>
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
       
        <ScrollView>
           <View  style={styles.donorTitle}>
            <Text>{this.props.mission.from_name}</Text>
            <Text>{this.props.mission.amount}</Text>
          </View>
        {this.displayAdded()}
        </ScrollView>
        <View style={styles.divideLast}></View>
        <View style={styles.totalSection}>
          <Text>TOTAL:</Text>
          {this.displayTotal()}
        </View>
        <TouchableOpacity 
            onPress={()=>
                {
                this.props.navigation.navigate('AddToMission',{'mission':this.props.mission, 'mission_id':this.props.mission_id,'headerString': "Add to a mission"})}}
            style={styles.button}><Text style={styles.button_txt}>Add Bits</Text></TouchableOpacity>
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
    borderWidth:1.5,
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
      margin:'5%',
      backgroundColor:'#645393',
      borderRadius:10,
      height:40,
      justifyContent:'center',

  },
  button_txt:{
    fontFamily: 'nunito-semibold',
    color:'#fff',
    alignSelf:'center',
    textAlign:'center'
  },
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