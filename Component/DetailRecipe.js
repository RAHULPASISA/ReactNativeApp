import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import { Platform } from "react-native";

export default class DetailRecipe extends Component {
  constructor() {
    super();
    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);
    this.state = {
      screenWidth: screenWidth,
      screenHeight: screenHeight
    };
  }

  static navigationOptions = {
    title: "Detail Recipe",
  };

  render() {
    const setData = JSON.parse(
      this.props.navigation.state["params"]["selectItem"]
    );
    const setImgData = JSON.parse(
      this.props.navigation.state["params"]["selectItem"]
    ).photo;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: setImgData }}
          style={{
            width: this.state.screenWidth,
            height: this.state.screenHeight / 2,
            resizeMode: "contain"
          }}
        />
        <Text style={styles.detailTextStyle}>
          {" "}
          Full Name : {setData.firstName} {setData.lastName}{" "}
        </Text>
        <Text style={styles.detailTextStyle}> Item Name : {setData.name} </Text>
        <Text style={styles.detailTextStyle}>
          {" "}
          Complexity : {setData.complexity}{" "}
        </Text>
        <Text style={styles.detailTextStyle}>
          {" "}
          PreparationTime : {setData.preparationTime}{" "}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  detailTextStyle: {
    fontSize: 25,
    fontWeight: "bold",
    margin: Platform.OS === "ios" ? 15 : 12,
    alignSelf: "flex-start"
  }
});
