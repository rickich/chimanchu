import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'


export default class MyMissionCard extends React.Component{
    render(){
        const mission = this.props.mission;
        return (
            <View>
            <TouchableOpacity 
            onPress={()=>
                {
                  if(mission.status == 'pending'){
                this.props.navigation.navigate('MyMissionDetail',{'mission':mission,'mission_id':mission.id})}
                else if (mission.status == 'current'){
                  this.props.navigation.navigate('MyCurrentMissionDetail',{'mission':mission,'mission_id':mission.id})}
                else if (mission.status == 'complete'){
                  this.props.navigation.navigate('MyCompleteMissionDetail',{'mission':mission,'mission_id':mission.id})}
                }
              }
          
              

            style={styles.button}>

            <Text style={styles.title}>{mission.title}</Text>
            <Text style={styles.amount}>{mission.total_amount}</Text>
            </TouchableOpacity>
            </View>
            );
   }
}

const styles = StyleSheet.create({
    thumbnail:{
        width:25,
        height:25,
        alignSelf:'baseline',
      },
      title:{
        paddingLeft: 5,
        fontSize: 18,
        alignSelf:'center',
        textAlign:'left',
        color:'#645393',
        fontWeight: "600",
      },
      amount:{
        marginLeft:'auto',
        marginRight:'3%',
        fontSize: 18,
        color:'#645393',
      },
      button:{
        width:'100%',
        marginBottom:0,
        paddingVertical: 12,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf:'center',
        alignContent: 'center',
        backgroundColor:'#ffffff',
        color:'#645393',
        shadowColor:'#28334C',
        shadowOffset:{
          width:0.2,
          height:0,
        },
        shadowOpacity:0.6,
        shadowRadius:0.8,
      },
      icon:{
        marginLeft:'auto',
        marginRight: '1%',
        alignSelf:'baseline',
        color:'#645393',
    
      }
})


