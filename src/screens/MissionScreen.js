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
        headerRight: <TouchableOpacity style={{
        width:'100%',
        }}
        onPress={()=>navigation.navigate('Login')} 
        ><Text style={{
          fontFamily:'noto',
          fontSize:14,
          color:'#fff',
        }}>LOGOUT </Text></TouchableOpacity>,
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
      console.log(JSON.stringify(this.props.navigation))
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
        <Image
            style={styles.thumbnail}
            source={{uri: streamer["profile_image_url"]}} />
            <View style={styles.liveIcon}>
            {this.displayName()}
            {this.liveIndicator()}
            </View>
        </View>
        <View style= {styles.missionFeed}>
        <Header title="Missions" style={{width:'100%',alignContent:'center', }}/>
        <MissionFeed navigation={this.props.navigation}/>
        </View>
          <TouchableOpacity style={styles.button} onPress = {()=>{ this.props.navigation.navigate('CreateMission',{'streamer':this.props.navigation.getParam('streamer')})}}>
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
  container:{
    flex:1,
    flexDirection:'column',
    alignContent:'flex-start'
  },
  liveIcon:{
    marginLeft:15,
    color: 'red',
    alignItems:'center',
    flexDirection:'row',
  },
  icon:{
    marginLeft: 10,
    alignSelf:'center'
  },
  profile:{
    flex:1.7,
    alignItems:'center',
    flexDirection:'row',
    alignSelf:'flex-start',
    alignItems:'center',
    marginLeft:30,
    marginTop:20,
  },
  thumbnail:{
    width:70,
    height:70,
    borderRadius:15,
  },
  missionFeed:{
    flex:9,
  },
  name:{
    fontFamily: 'nunito-semibold',
    paddingLeft: 10,
    fontSize: 22,
    alignSelf:'flex-start',
    textAlign:'left',
    color:'#645393',
  },
  koreanName:{
    fontFamily: 'hanna',
    paddingLeft: 10,
    fontSize: 22,
    alignSelf:'flex-start',
    textAlign:'left',
    color:'#645393',
    fontWeight:'bold'
  }, 

  button:{
    flex:1,
    justifyContent:'center',
    margin:20,
    backgroundColor:'#645393',
    borderRadius:10,
    height:50,
},
button_txt:{
  fontFamily: 'nunito-semibold',
    color:'#fff',
    textAlign:'center',
    alignSelf:'center',

},
     
})
