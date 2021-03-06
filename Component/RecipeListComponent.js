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
  TouchableWithoutFeedback,
  Button,
  Image
} from "react-native";
import { Platform } from "react-native";
import { Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { connect } from "react-redux";

class RecipeListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      isRefreshing: false
    };
  }

  Recipe = () => {
    const url = "http://35.160.197.175:3006/api/v1/recipe/feeds";
    const tokenFromLogin = "Bearer " + this.props.token;

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
      });
  };

  async componentDidMount() {
    console.disableYellowBox = true;
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    return this.Recipe();
  }

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
        <View style={styles.cardViewStyle}>
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
            source={this.checkImageURLNull(item.photo)}
            imageStyle={{ borderRadius: 10 }}
          >
            <ImageBackground
              blurRadius={22}
              style={styles.blurImage}
              imageStyle={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
              }}
              source={this.blurTextBackground(item.photo)}
            >
              <Text style={styles.cardTextStyle}>Name : {item.name}</Text>
              <Text style={styles.cardTextStyle}>
                Complexity : {item.complexity}
              </Text>
              <Text style={styles.cardTextStyle}>
                PreparationTime : {item.preparationTime}
              </Text>
            </ImageBackground>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  actionOnRow(item) {
    console.log("Selected Item :", item);
    this.props.navigation.navigate("DetailRecipe", {
      selectItem: JSON.stringify(item)
    });
  }

  checkImageURLNull(url) {
    console.log(url);
    if (url == null) {
      return require("../assets/Cook.gif");
    } else {
      return { uri: url };
    }
  }

  blurTextBackground(url) {
    if (url == null) {
      return {
        uri:
          "http://35.160.197.175:3006/uploads/346e7d17-515a-4908-b3d0-5b4136a56b7c.jpg"
      };
    } else {
      return { uri: url };
    }
  }

  onRefresh() {
    this.setState({ isRefreshing: true }, function() {
      this.Recipe();
    });
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
        <Container style={styles.topHeader}>
          <Header style={{ alignItems: "center", justifyContent: "center" }}>
            <Left></Left>
            <Body>
              <Title>Recipe List</Title>
            </Body>
            <Right>
              <Icon
                name="ios-add"
                style={styles.topHeader}
                onPress={() => this.props.navigation.navigate("AddRecipe")}
              >
                {" "}
              </Icon>
            </Right>
          </Header>
          <View style={styles.container}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
              <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(i, k) => k.toString()}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefreshing}
                    title="Loading..."
                  />
                }
              />
            </SafeAreaView>
          </View>
        </Container>
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
    paddingLeft: 15,
    color: "white",
    ...Platform.select({
      ios: {
        fontFamily: "Baskerville-SemiBold",
        top: 5
      },
      android: {
        fontFamily: "sans-serif-condensed",
        top: 0
      }
    })
  },
  cardViewStyle: {
    width: "95%",
    height: 250,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    margin: 10
  },
  blurImage: {
    width: "100%",
    height: 80,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  topHeader: {
    ...Platform.select({
      ios: {
        color: "rgba(34,119,255,1)"
      },
      android: {
        color: "white",
        paddingTop: getStatusBarHeight(),
        height: 54 + getStatusBarHeight()
      }
    })
  }
});

const mapStateToProps = state => {
  return { token: state.token };
};
export default connect(mapStateToProps)(RecipeListComponent);
