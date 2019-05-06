import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Octicons } from '@expo/vector-icons';


export default class StreamerCard extends React.Component{
  static navigationOptions = ({navigation}) => {
    return{
      headerBackTitle:null,
    }
  }
render(){ 
  streamer= this.props.streamer;
  console.log(streamer)
  return (
      <View>
        <TouchableOpacity 
        onPress={()=>{
          this.props.navigation.navigate('MissionList',{'streamer':this.props.streamer, 'headerString': "Missions"})}}
        style={styles.button}>
          <Image
            style={styles.thumbnail}
            source={{uri: streamer["profile_image_url"]}}
            />
            {this.displayName()}
          <Octicons name="primitive-dot" size={14} color="red" style={styles.icon}/>
        </TouchableOpacity>
      </View>
  );
}
  displayName= () =>{
    // if korean3130–318F
    const korean = /[\u3131-\uD79D]/ugi;
    if(streamer['display_name'].match(korean)){
      return <Text style={styles.koreanName}>{streamer['display_name']}</Text>;
    
  }
    else{
     return <Text style={styles.name}>{streamer['display_name']}</Text>;
    }
  }
}

const styles = StyleSheet.create({
  thumbnail:{
        width:25,
        height:25,
        alignSelf:'baseline',
      },
      name:{
        fontFamily: 'nunito-semibold',
        paddingLeft: 10,
        fontSize: 18,
        alignSelf:'center',
        textAlign:'left',
        color:'#645393',
      },
      koreanName:{
        fontFamily: 'hanna',
        paddingLeft: 10,
        fontSize: 17,
        alignSelf:'center',
        textAlign:'left',
        color:'#645393',
        fontWeight:'bold'
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
        marginRight: '3%',
        alignSelf:'center',    
      }
})

