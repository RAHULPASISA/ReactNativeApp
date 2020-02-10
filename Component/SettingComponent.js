import React, { Component } from 'react'
import {StyleSheet, Text, View } from 'react-native'

export default class SettingComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.centerTextStyle}> Setting Page </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "white",
      width: "100%"
    },
    centerTextStyle: {
        fontSize: 50,
        fontWeight: "bold",
        color: "black"
      },
})