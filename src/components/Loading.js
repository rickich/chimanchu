import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import Header from './Header'
export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bouncing_twitch_white.gif')} style={styles.img} />
        <Header title={'ChiManChu'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems:'center'
  },
    img : {
      resizeMode: 'contain',
      justifyContent: 'center',
      alignItems:'center',
      width:'80%',
    }
});
