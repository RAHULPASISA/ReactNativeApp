import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import Recipe from './Recipe'

export default class Login extends Component {
  constructor() {
    super();
    this.state = { username: "jm1@example.com", password: "jay@123", token: null };
  }

  Login = () => {
    this.setState({ showProcess: true });
    fetch("http://35.160.197.175:3006/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      })
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
        }
      })
      .catch((error) => console.warn("fetch error:", error))
      .then(responseJSON => {
        this.setState({ showProcess: false });
        if (this.state.username.length == 0) {
          Alert.alert("Email", "The email you entered is incorrect", [
            {
              text: "Okay",
              style: "cancel"
            }
          ]);
        } else if (this.state.password.length == 0) {
          Alert.alert("Password", "The password you entered is incorrect", [
            {
              text: "Okay",
              style: "cancel"
            }
          ]);
        } else {
          console.log(responseJSON.token)
          this.setState({token:responseJSON.token});
          this.props.navigation.navigate('Recipe',{token: this.state.token})
      try {
            // var email = responseJSON["email"];
            // if (email) {
            //   console.log("success: ", responseJSON);
            // }
            // var message = email
            //   ? "You are successfully logged in"
            //   : "There was an error with your E-Mail/Password. Please try again.";
            // var title = email ? "Success" : "Failure";
            // Alert.alert(title, message, [
            //   {
            //     text: "Okay",
            //     style: "cancel"
            //   }
            // ]);
          } catch (err) {
            console.log("error");
            var message = "There was an error with your E-Mail/Password. Please try again.";
            var title = "Failure";
            Alert.alert(title, message, [
              {
                text: "Okay",
                style: "cancel"
              }
            ]);
          }
        }
      });
  };

  render() {
    // if (this.state.token != null) {
    //  return <Recipe token={this.state.token} />
    // }else {
      return (
        <ImageBackground
          source={require('../assets/Cook.gif')}
          style={{ width: "100%", height: "100%", resizeMode: "resize" }}
        >
          <View style={styles.container}>
            <View style={styles.firstView}>
              <Image
                source={require('../assets/logo.png')}
                style={{ width: 140, height: 125 }}
              />
            </View>
            <View style={styles.secondView}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#FFF"
                keyboardType="email-address"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                style={styles.usernameTextInput}
              ></TextInput>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#FFF"
                secureTextEntry= {true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                style={styles.passwordTextInput}
              ></TextInput>
            </View>
            <View style={styles.thirdView}>
              <TouchableOpacity onPress={this.Login} style={styles.buttonLogin}>
                <Text   
                  style={{
                    color: "white",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: "bold"
                  }}
                >
                Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      );
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  firstView: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column-reverse",
    bottom: 75
  },
  secondView: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center"
  },
  thirdView: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column-reverse",
    top: 150,
  },
  loginTextStyle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black"
  },
  usernameTextInput: {
    borderWidth: 1,
    borderColor: "white",
    width: "85%",
    height: 40,
    bottom: 20,
    borderRadius: 10,
    color: "white",
    padding: 10
  },
  passwordTextInput: {
    borderWidth: 1,
    borderColor: "white",
    width: "85%",
    height: 40,
    borderRadius: 10,
    color: "white",
    padding: 10
  },
  buttonLogin: {
    height: 65,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  }
});
