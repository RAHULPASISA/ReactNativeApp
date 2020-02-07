import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class AddRecipe extends Component {
  render() {
    return (
      <View style={styles.container}>
            <TextInput placeholder= {"Enter First Name"} style={styles.textInputStyle}></TextInput>
            <TextInput placeholder= {"Enter Last Name"} style={[styles.textInputStyle,styles.spaceBetweenTxtfield]}></TextInput>
            <TextInput placeholder= {"Enter First Name"} style={[styles.textInputStyle,,styles.spaceBetweenTxtfield]}></TextInput>
            <TextInput placeholder= {"Enter Last Name"} style={[styles.textInputStyle,styles.spaceBetweenTxtfield]}></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    width: "100%",
  },
  textInputStyle: {
    top: 150,
    width: "90%",
    height: 45,
    borderBottomWidth: 1
  },
  spaceBetweenTxtfield: {
    marginTop: "5%"
  }
});
