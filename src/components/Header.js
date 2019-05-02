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
        paddingTop:14,
        paddingLeft:7,
        fontSize:24,
        fontWeight:'bold',
      }
})

export default Header;