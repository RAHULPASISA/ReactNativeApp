import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-navigation";
import { Dimensions } from "react-native";
import { Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default class MapViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
    const { status } = this.state;
    console.log(status);
    this._watchLocation();
  }

  _watchLocation = async () => {
    await navigator.geolocation.watchPosition(position => {
      this.setState({ coords: position.coords, loading: false });
    });
  };

  _getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {
      // this.setState({ coords: position.coords, loading: false });
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012
      };
      this.map.animateToRegion(region, 50);
    });
  };

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
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              ref={map => {
                this.map = map;
              }}
              showsUserLocation={true}
              // followsUserLocation={true}
              //  customMapStyle = {require('./CustomMap.json')}
              showsMyLocationButton={true}
              //showsPointsOfInterest={true}
              //   showsCompass={true}
              initialRegion={{
                latitude: 23.029213,
                longitude: 72.570387,
                latitudeDelta: 10.0,
                longitudeDelta: 10.0
              }}
            >
              <Marker
                coordinate={{ latitude: 23.029213, longitude: 72.570387 }}
                title="Solution Analysts Pvt Ltd"
                description="Solution Analysts Pvt Ltd, 101, Sankalp Iconic, Opp. Vikram Nagar, Ambli - Bopal Road, Iskcon Cross Road, Ahmedabad, Gujarat"
                onPress={() => {
                  Alert.alert("Ahmedabad", "Solution Analysts Pvt Ltd");
                }}
              />
              <Polyline
                coordinates={[
                  { latitude: 23.029213, longitude: 72.570387 },
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
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                backgroundColor: "clear",
                position: "absolute",
                alignSelf: 'flex-end'
              }}
              onPress={() => {
                this._getLocation();
              }}
            >
              <Image
                style={{ width: 60, height: 60 }}
                source={require("../assets/CurrentLocation.png")}
              />
            </TouchableOpacity>
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
