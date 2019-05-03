import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default class OfflineStreamerCard extends React.Component{
render(){
  streamer= this.props.streamer;

  return (
      <View>
        <TouchableOpacity 
        onPress={()=>{this.props.navigation.navigate('MissionList',{'streamer':this.props.streamer, 'headerString': "Missions"})}}
        style={styles.button}>

          <Image
            style={styles.graythumbnail}
            source={{uri:streamer["profile_image_url"]}} />

          <Image
            style={styles.thumbnail}
            source={{uri: streamer["profile_image_url"]}} />
          <Text style={styles.name}>{streamer['display_name']}</Text>
        </TouchableOpacity>
      </View>
  );
}
   
}

const styles = StyleSheet.create({
  graythumbnail:{
    width:25,
    height:25,
    alignSelf:'baseline',
    tintColor: 'silver',
  },  
  thumbnail:{
        position:'absolute',
        width:25,
        height:25,
        alignSelf:'baseline',
        opacity: 0.3,
        left:5,
        top:5,
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
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf:'center',
        alignContent: 'center',
        backgroundColor:'#ffffff',
        borderBottomWidth:1,
        borderBottomColor: '#645393',
        color:'#645393',
      },
      icon:{
        marginLeft:'auto',
        marginRight: '1%',
        alignSelf:'baseline',
        color:'#645393',
    
      }
})

