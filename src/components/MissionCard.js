import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default class MissionCard extends React.Component{
    render(){
        const mission = this.props.mission;
        return (
            <View>
            <TouchableOpacity 
            onPress={()=>
                {
                this.props.navigation.navigate('MissionDetail',{'mission':mission, 'headerString': "Detail"})}}
            style={styles.button}>

            <Text style={styles.name}>{mission.title}</Text>
            <Text style={styles.name}>{mission.amount}</Text>   
            {/* {this.logMission(mission)}  */}
            {this.displayIcon()}
            </TouchableOpacity>
            </View>
            );
   }
   logMission(mission){
       console.log("MISSION"+(mission.status))
   }

   displayIcon(){ 
        return <Ionicons name="md-add" size={15} style={styles.icon} />
   }
}

const styles = StyleSheet.create({
    thumbnail:{
        width:25,
        height:25,
        alignSelf:'baseline',
      },
      name:{
        paddingLeft: 5,
        fontSize: 18,
        alignSelf:'center',
        textAlign:'left',
        color:'#645393',
        fontWeight: "600",
      },
      button:{
        width:'100%',
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
      },
      icon:{
        marginLeft:'auto',
        marginRight: '1%',
        alignSelf:'baseline',
        color:'#645393',
    
      }
})

