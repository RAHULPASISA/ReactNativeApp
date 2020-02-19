import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker,Polyline } from "react-native-maps";
import * as Permission from "expo-permissions";
import { SafeAreaView } from "react-navigation";
import { Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default class MapViewComponent extends Component {
  constructor() {
    super();
    // Permission.askAsync(Permission.LOCATION)
    // navigator.geolocation.watchPosition(this.onSuccess, this.onError)
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 44,
              width: screenWidth,
              borderBottomWidth: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Map</Text>
          </View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 22.258652,
              longitude: 71.192383,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09
            }}>
                <Marker coordinate={{latitude: 22.258652,longitude: 71.192383}} onPress={() => {
                     alert('You tapped the marker!');
                }} /> 
                {/* //title="Gujarat" description="Nice State" */}

                <Polyline
		coordinates={[
            { latitude: 22.258652, longitude: 71.192383 }, 
			{ latitude: 23.109144, longitude: 71.919733 }, 
			{ latitude: 23.015004, longitude: 71.418560 },
			{ latitude: 23.019386, longitude: 71.075313 },
			{ latitude: 23.240952, longitude: 69.672179 },
			{ latitude: 23.302622, longitude: 69.682503 }
		]}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={5}
	/>
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    //   flex: 1,
    //   top:0,
    //   bottom:0,
    //   left:0,
    //   right:0,
    height: screenHeight,
    width: screenWidth

    //   justifyContent:'flex-end',
    //   alignItems:'center'
  }
});
