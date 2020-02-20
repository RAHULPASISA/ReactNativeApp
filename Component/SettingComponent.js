import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default class SettingComponent extends Component {
  render() {
    return (
        <Container style={styles.topHeader}>
        <Header>
          <Left></Left>
          <Body>
            <Title>Setting</Title>
          </Body>
          <Right></Right>
        </Header>
        <View style={styles.container}>
            <Text style={styles.centerTextStyle}>Setting Page</Text>
        </View>
      </Container>
    );
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
  topHeader: {
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: getStatusBarHeight(),
        height: 54 + getStatusBarHeight()
      }
    })
  }
});
