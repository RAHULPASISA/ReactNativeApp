import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-navigation";
import { Dimensions } from "react-native";
import { Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default class MapViewComponent extends Component {
  render() {
    return (
      <Container style={styles.topHeader}>
        <Header>
          <Left></Left>
          <Body>
            <Title>Map</Title>
          </Body>
          <Right></Right>
        </Header>
        <SafeAreaView>
          <View style={{ flex: 1 }}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 22.258652,
                longitude: 71.192383,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09
              }}
            >
              <Marker
                coordinate={{ latitude: 22.258652, longitude: 71.192383 }}
                onPress={() => {
                  alert("You tapped the marker!");
                }}
              />
              {/* //title="Gujarat" description="Nice State" */}

              <Polyline
                coordinates={[
                  { latitude: 22.258652, longitude: 71.192383 },
                  { latitude: 23.109144, longitude: 71.919733 },
                  { latitude: 23.015004, longitude: 71.41856 },
                  { latitude: 23.019386, longitude: 71.075313 },
                  { latitude: 23.240952, longitude: 69.672179 },
                  { latitude: 23.302622, longitude: 69.682503 }
                ]}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                  "#7F0000",
                  "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
                  "#B24112",
                  "#E5845C",
                  "#238C23",
                  "#7F0000"
                ]}
                strokeWidth={5}
              />
            </MapView>
          </View>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: screenHeight,
    width: screenWidth
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
