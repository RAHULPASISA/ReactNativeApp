import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Alert,
  Image
} from "react-native";

export default class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: [],
      isRefreshing: false
    };
  }

  Recipe = () => {
    const url = "http://35.160.197.175:3006/api/v1/recipe/cooking-list";
    const tokenFromLogin =
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s";

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: tokenFromLogin
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
            Alert.alert("Something went wrong from api server!");
        }
      })
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          isRefreshing: false
        });
        // console.log(this.state.dataSource);
      });
  };

  componentDidMount() {
    return this.Recipe();
  }

  renderItem = ({ item }) => {
    return (
        <View style={styles.cardViewStyle}>
          <ImageBackground
            style={{ width: "100%", height: "100%",  justifyContent: 'flex-end', alignItems: 'flex-end' }}
            source={ this.checkImageURLNull(item.photo) }
            imageStyle={{ borderRadius: 10 }}
          >
            <ImageBackground 
            blurRadius = {100} style={styles.blurImage}
            source={this.checkImageURLNull(item.photo)}>  
            <Text style={styles.cardTextStyle}>
              Full Name : {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.cardTextStyle}>
              Complexity : {item.complexity}
            </Text>
            <Text style={styles.cardTextStyle}>
              PreparationTime : {item.preparationTime}
            </Text>
             </ImageBackground>
          </ImageBackground>
        </View>
    );
  };

  checkImageURLNull(url) {
    console.log(url);
    if (url == null) {
      return require('../assets/Cook.gif')
    } else {
      return {uri: url};
    }
  }

  onRefresh() {
    this.setState({ isRefreshing: true }, function() { this.Recipe() });
 }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "110%",
            zIndex: 1
          }}
        >
          <ActivityIndicator
            size="large"
            color="gray"
            style={{ flex: 1 }}
          ></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(i,k) => k.toString()}

            refreshControl={
              <RefreshControl 
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
              title="Loading"
              />
            }
          />
          </SafeAreaView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  cardTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    top: 5,
    paddingLeft: 15,
    color: "white"
  },
  cardViewStyle: {
    width: "95%",
    height: 250,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    margin: 10,
  },
  blurImage: {
    width: '100%',
    height: 80,
    justifyContent: 'flex-start', 
    alignItems: 'flex-start'
   }
});
