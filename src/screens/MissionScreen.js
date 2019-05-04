import React, { Component } from 'react'
import { TouchableOpacity, Image, Text, View, StyleSheet, } from 'react-native'
import Header from '../components/Header'
import MissionFeed from '../components/MissionFeed'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default class MissionScreen extends Component {

    static navigationOptions = ({navigation})=> {
      
        return{
        title: null,
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
    state = {
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
    };
    render() {
      streamer=this.props.navigation.getParam('streamer');
      console.log(JSON.stringify(streamer))
    return (
      <View>
        <View style={styles.profile}>
        <Image
            style={styles.thumbnail}
            source={{uri: streamer["profile_image_url"]}} />
            <View style={styles.liveIcon}>
            {this.displayName()}
            {this.liveIndicator()}
            </View>
        </View>
        <Header title="Missions" style={{width:'100%',alignContent:'center', }}/>
        <MissionFeed navigation={this.props.navigation}/>
        <TouchableOpacity style={styles.button} onPress = {()=>{ this.props.navigation.navigate('CreateMission')}}>
                <Text style={styles.button_txt}>Send New Mission</Text>
        </TouchableOpacity>
      </View>
    )
  }
  liveIndicator = () =>{
    if(streamer.isLive){
      return <FontAwesome name="circle" size={6} color="red" style={styles.icon}/>
    }
    else{
      return <FontAwesome name="circle" size={6} color="gray" style={styles.icon}/>
    }
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
  scene: {
    flex: 1,
  },
  liveIcon:{
    marginLeft:15,
    flexDirection:'row',
    color: 'red',
    alignContent: 'center',
  },
  liveText:{
    color: 'red',
    alignContent: 'center',
  },
  icon:{
    alignSelf:'center',
    marginLeft: 10,
  },
  profile:{
    marginTop:15,
    marginLeft:20,
    flexDirection:'row',
  },
  thumbnail:{
    width:70,
    height:70,
    alignSelf:'baseline',
    borderRadius:15,
  },
  name:{
    fontFamily: 'nunito-semibold',
    paddingLeft: 10,
    fontSize: 22,
    alignSelf:'center',
    textAlign:'left',
    color:'#645393',
  },
  koreanName:{
    fontFamily: 'hanna',
    paddingLeft: 10,
    fontSize: 22,
    alignSelf:'center',
    textAlign:'left',
    color:'#645393',
    fontWeight:'bold'
  }, 
  button:{
    width:'100%',
    backgroundColor:'#645393',
    borderRadius:10,
},
button_txt:{
    color:'#fff',
},
     
})
