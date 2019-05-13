import React, { Component } from 'react'
import { TouchableOpacity, Image, Text, View, StyleSheet,AsyncStorage,Alert } from 'react-native'
import Header from '../components/Header'
import MyMissionFeed from '../components/MyMissionFeed'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { connect } from 'react-redux';
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import { ButtonGroup } from 'react-native-elements';
import MyAddedFeed from '../components/MyAddedFeed'
import PendingMissionsFeed from '../components/PendingMissionsFeed'
import CurrentMissionsFeed from '../components/CurrentMissionsFeed'
import CompleteMissionsFeed from '../components/CompleteMissionsFeed'


class MyProfileScreen extends Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: 0,
      user:{}
    }
    this.updateIndex = this.updateIndex.bind(this)

  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  displaySelected = () =>{
    if(this.state.selectedIndex==0){
      return <MyMissionFeed navigation={this.props.navigation}/> 
    }
    else if(this.state.selectedIndex==1){
      return <MyAddedFeed navigation={this.props.navigation}/> 
    }
    else if(this.state.selectedIndex==2){
      return <PendingMissionsFeed navigation={this.props.navigation}/> 
    }
    else if(this.state.selectedIndex==3){
      return <CurrentMissionsFeed navigation={this.props.navigation}/> 
    }
    else if(this.state.selectedIndex==4){
      return <CompleteMissionsFeed navigation={this.props.navigation}/> 
    }
  }

  static navigationOptions = ({navigation})=> {
    return{
    title: null,
    headerBackTitle:null,
    headerRight: <TouchableOpacity style={{
    width:'100%',
    }}
    onPress={()=>
      {AsyncStorage.clear()
      navigation.navigate('Login')}} 
    ><Text style={{
      fontFamily:'noto',
      fontSize:14,
      color:'#fff',
    }}>LOGOUT </Text></TouchableOpacity>,
    }
  };

  render() {
    const buttons = ['Sent','Added','Pending','Current','Complete']
    const { selectedIndex } = this.state
    streamer=this.props.navigation.getParam('streamer');
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
        <Image
            style={styles.thumbnail}
            source={{uri: this.props.twitch_user_data.profile_image_url}} />
            {this.displayName(this.props.twitch_user_data.displayName)}
        </View>
        <Header title='My Missions' style={{width:'100%',alignContent:'center',margin:'5%' }}/>
        <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{flex:1,borderColor:'#645393'}} 
      textStyle = {{fontFamily:'nunito-semibold',fontSize:14,color:'#645393'}}
      selectedButtonStyle={{backgroundColor:'#645393'}}
      containerBorderRadius={10}
      />

        <View style= {styles.missionFeed}>
        {this.displaySelected()}
        </View>
        <TouchableOpacity style={{flex:1.2,flexDirection:'row',borderColor:'#645393',borderWidth:1, borderRadius:10, justifyContent:'center',alignItems:'center', margin:'5%',paddingTop:15}} onPress={()=>{Alert.alert('To be updated!')}}>
          <FontAwesome name="diamond" size={16} color="#645393" style={{alignSelf:'baseline'}}/>
          <Text style={{fontSize:16,color:'#645393',marginLeft:'2%'}}>{this.props.user.daya}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  displayName= (name) =>{
    // if korean3130–318F
    const korean = /[\u3131-\uD79D]/ugi;
    if(name.match(korean)){
      return <Text style={styles.koreanName}>{name}</Text>;
    
  }
    else{
    return <Text style={styles.name}>{name}</Text>;
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
    justifyContent:'center',
    marginLeft:30,
    marginTop:20,
  },
  thumbnail:{
    alignSelf:'flex-start',
    width:70,
    height:70,
    borderRadius:15,
  },
  missionFeed:{
    flex:9,
    marginTop:'2%'
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

  const mapStateToProps = (state) =>  {
    const missions = state.firestore.ordered.missions;
    const users = state.firestore.data.users ? state.firestore.data.users: null;
    const id = state.auth.id
    const user = users ? users[id] : null;
    console.log(users)
    return{
      missions: missions,
      user: user,
      twitch_user_data:state.twitch
    }
  }
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'missions',
            collection: 'users',
        }
    ])
  )(MyProfileScreen)