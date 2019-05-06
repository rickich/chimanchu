import React, { Component } from 'react'
import { View , StyleSheet, Text, TouchableOpacity} from 'react-native'
import Header from '../components/Header'
import StreamerFeed from '../components/StreamerFeed'

export default class StreamerListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    userdata = navigation.getParam(['user_data']);
      return {
        headerLeft:<Text style={{
          fontFamily:'noto-bold',
          fontSize:16,
          color:'#fff'}
        }>ChiManChu</Text>,
        headerRight: <TouchableOpacity style={{
          width:'100%',
          }}
          onPress={()=>navigation.navigate('Login')} 
          ><Text style={{
            fontFamily:'noto',
            fontSize:14,
            color:'#fff',
          }}>Hi,{userdata.display_name} </Text></TouchableOpacity>,
        headerStyle:{
          backgroundColor:'#645393',
         },
         headerLeftContainerStyle:{
          paddingLeft:10,
         },
        headerRightContainerStyle:{
          paddingRight:10,
        },
        headerBackTitle:null,
      }
  };
  _handleOnPress=()=>{
    console.log('pressed')
  }
  render() {
    return (
        <View style={styles.container}>
          <Header title="Following Streamers"/>
          <StreamerFeed navigation={this.props.navigation}/>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent: 'center',
  },
  
})