import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import Header from '../components/Header'


export default class MissionDetailScreen extends Component {
     static navigationOptions = ({navigation})=> {
    const headerString = navigation.getParam('headerString');
    return{
    title: headerString,
    headerBackTitle:null,
    
    }
};
  getOngoingMissionList(){
    return this.state.rank.map(_rank => {
        if(_rank.status=="ongoing"){
        return(
        <MissionCard key={_mission.id} mission = {_mission} navigation={this.props.navigation}/>
        );
        }
    })
    
  }
  render() {
    const mission = this.props.navigation.getParam('mission')
    return (
      <View>
        <Header title = {mission.info.title} />
        <Text>{mission.info.detail}</Text>
        <Text>Total Amount</Text>
        <Text>{this.getTotalAmount(mission.info.amount)}</Text> 
        <TouchableOpacity 
            onPress={()=>
                {
                this.props.navigation.navigate('AddToMission',{'mission':mission, 'headerString': "Add to a mission"})}}
            style={styles.button}><Text>Add Bits</Text></TouchableOpacity>
      </View>
    )
  }
  getTotalAmount(amt){
    let sum=0;
     for (let i = 0 ; i<amt.length; i++){
        sum=sum+amt[i];
    }
    return sum;
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
