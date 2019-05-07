import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet,AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AuthSession } from 'expo';
import axios from 'axios';
import Loading from '../components/Loading'
import {setUser} from '../actions/authActions'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

const TWITCH_APP_ID = 'vfno0i2im9fshlfil4hsyiq6esfnex'; 
const REDIRECT_URL = AuthSession.getRedirectUrl();
const TWITCH_SECRET = 'w8eaix5nyl36bjrmbwtzdxjv7g6861';
let data = {
  'token': null,
  "access_token": null,
  "user_id": null,
  "profile_url": null,
  "display_name": null,
  "code": null,
}
class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }
  state = {auth_result: []};

  _handlePressAsync = async () => {
    let result = await AuthSession.startAsync({
      authUrl:
      "https://id.twitch.tv/oauth2/authorize?"+
      "client_id="+TWITCH_APP_ID+
      "&redirect_uri="+REDIRECT_URL+
      "&response_type=code"+
      "&scope=viewing_activity_read+user_subscriptions+user:read:email",
    })
    this.setState({ auth_result: result });

    if(this.state.auth_result['type']=='success'){
      console.log('AUTH_SUCCESS!' + JSON.stringify(this.state.auth_result));
      data["code"]=this.state.auth_result.params['code'];
      this._getAccessToken(data['code']);
    };
  };

  _getAccessToken = async (code) => {
    this.setState({isLoading:true})
    let result = await axios.post('https://id.twitch.tv/oauth2/token'+
      '?client_id='+TWITCH_APP_ID+
      '&client_secret='+TWITCH_SECRET+
      '&code='+code+
      '&grant_type=authorization_code'+
      '&redirect_uri='+REDIRECT_URL)
    .then((response)=>{
      console.log(response.data);
      data['token']=response.data;
      data['access_token'] =response.data.access_token;
      // this._handleUserdata(data["access_token"]);
      this._validateToken(data['access_token']);
    })
    .catch(function (error){
      console.log(error);
    });
  }

  _validateToken = async (access_token) =>{
    let result = await axios.get('https://id.twitch.tv/oauth2/validate',{
            headers:{'Authorization': 'OAuth '+access_token}
            })
            .then((result) => 
              { 
                this.storeData(result.data.user_id,data['token'])
                this.checkUser(result.data.user_id)           
              }
            )
            .catch(function(error){
              console.log(error)
            });
  }

  storeData = async (userID,token) => {
    try {
      await AsyncStorage.setItem('currentUserID', userID)
      await AsyncStorage.setItem('access_token', token.access_token)
      await AsyncStorage.setItem('refresh_token', token.refresh_token)  
    } catch (e) {
      console.log(e)
    }
  }

 checkUser = (id) =>{
   //query users that has id
   //if no return / create user
   //else 
   console.log(this.props.users)
    let user = null;
    this.props.users.map(_user => {
      if(_user.id == id){
          user = _user;
      }
    });
    if (user==null){
      console.log('user doesnt exist');
      this.props.setUser(id,data['token'])
      this.props.navigation.navigate('AuthLoading');
    }
    else{
      console.log('user exists!')
      this.props.setUser(id,data['token']);
      this.props.navigation.navigate('AuthLoading');
    }
  }
    
  render() {
    if (this.state.isLoading){
      return <Loading />
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title_text}> ChiManChu </Text>
        <TouchableOpacity 
        onPress={this._handlePressAsync} 
        style={styles.button}
        >
        <Ionicons name="logo-twitch" size={28} style={styles.logo} />
        <Text style={styles.text}>Login with Twitch</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignContent: 'center',
      justifyContent: 'center',
    },
    title_text:{
      fontSize: 48,
      fontWeight: 'bold',
      textAlign:'center',
      color:'#645393',
    },
    text:{
      paddingLeft:'15%',
      fontSize: 18,
      alignSelf:'center',
      textAlign:'left',
      color:'#645393',
    },
    button:{
      marginTop:15,
      padding: 5,
      flexDirection: 'row',
      alignSelf:'center',
      alignContent: 'center',
      width: '70%',
      backgroundColor:'#ffffff',
      borderWidth:3,
      borderColor: '#645393',
      color:'#645393',
    },
    logo:{
      paddingLeft: '5%',
      alignSelf:'baseline',
      color:'#645393',
      
    }
})
const mapStateToProps = (state) =>  {
  console.log('from fireStore'+JSON.stringify(state));
  const allUsers = state.firestore.data.users;
  return{
      users: state.firestore.ordered.users 
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setUser: (userID,token) => dispatch(setUser(userID,token)),
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    {
        collection: 'users'
    }
  ])
)(LoginScreen)