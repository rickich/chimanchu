import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'


export default class MissionCard extends React.Component{
    render(){
        const mission = this.props.mission;
        return (
            <View>
            <TouchableOpacity 
            onPress={()=>
                {
                this.props.navigation.navigate('MissionDetail',{'mission':mission})}}
            style={styles.button}>

            <Text style={styles.name}>{mission.title}</Text>
            <Text style={styles.name}>{mission.amount}</Text>

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


