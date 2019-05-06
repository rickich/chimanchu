import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Header = (props) => {
    return (
        <View>
            <Text style={styles.heading}>{props.title}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    heading:{
        fontFamily:'noto-bold',
        color:'#645393',
        paddingTop:14,
        paddingLeft:'2%',
        fontSize:24,
        fontWeight:'bold',
      }
})

export default Header;