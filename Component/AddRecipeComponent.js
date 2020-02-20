import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Dropdown } from "react-native-material-dropdown";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Container, Header,Left,Right,Icon, Body, Title } from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";

const complexityData = [
  {
    value: "Easy"
  },
  {
    value: "Medium"
  },
  {
    value: "Complex"
  }
];

export default class AddRecipeComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: "",
      preparationTime: "",
      serves: "",
      complexity: complexityData[0].value,
      token: null,
      image: null
    };
  }

  getImagePermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }else {
      this.clickedOnImage();
    }
  };

  clickedOnImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    } else {
      console.log("Image picker Cancelled");
    }
  };

showLoadingIndicator() {
  // if (this.state.isLoading) {
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
        animating={this.state.isLoading} 
      ></ActivityIndicator>
    </View>
// }else {
  
// }
}
  addRecipe = () => {
    // console.log("Rahul ", this.state.complexity);

    this.setState({
      isLoading: true,
    });
  this.showLoadingIndicator();

    fetch("http://35.160.197.175:3006/api/v1/recipe/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s"
      },
      body: JSON.stringify({
        name: this.state.name,
        preparationTime: this.state.preparationTime,
        serves: this.state.serves,
        complexity: this.refs.dropdownComplexity.selectedItem().value
      })
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
        }
      })
      .then(responseJson => {
        if (responseJson.error != null) {
          Alert.error('ERROR', responseJson.error)
      }
      else {
          console.log(responseJson);
          this.uploadImage(responseJson.id)
       //   this.props.navigation.goBack()
      }
        // Alert.alert("Success", "Data added successfully", [
        //   {
        //     text: "Okay",
        //     onPress: () => goBack(),
        //     style: "cancel"
        //   }
        // ]);
      })
      .catch(error => {
        Alert.alert("ERROR", error);
      });
  };

  uploadImage(id) {
    var photo = {
        uri : this.state.image ,
        type : 'image/jpeg',
        name : 'photo.jpg'
    }
    const { goBack } = this.props.navigation;

    var formData = new FormData();
    formData.append('photo', photo)
    formData.append('recipeId', id)

    fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo',{
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
            'Content-Type' : 'application/json'
        },
        body: formData
    }).then((responseJson) => {
      this.setState({
        isLoading: false,
      });
    this.showLoadingIndicator();
        Alert.alert('Success','Recipe added',[
            {
                text: 'Okay',
                style: 'cancel',
                onPress: () => goBack(),
            }
        ])
    }).catch((error) => {
        Alert.alert('Upload Image Failed')
    })
}

  render() {
    const { goBack } = this.props.navigation;
    return (
      <Container style={styles.topHeader}>
      <Header style={{alignItems: "center",
                justifyContent: "center"}}> 
            <Left>
              <Icon name="ios-arrow-back" style={[styles.topHeader,{paddingLeft:20}]} onPress={() => goBack()}></Icon>
            </Left>
            <Body>
              <Title>Add Recipe</Title>
            </Body>
            <Right></Right>
          </Header>
          <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.getImagePermissions();
          }}
         style={{ backgroundColor: 'white', height: 100, width: 100, margin: 20 }}
        >
          {this.state.image ? (
            <Image source={{ uri: this.state.image }} style={{ flex: 1 }} />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/Recipe.jpg")}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder={"Enter Item Name"}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          style={styles.textInputStyle}
        ></TextInput>
        <TextInput
          placeholder={"Enter preparation Time (Ex: 1 Min)"}
          value={this.state.preparationTime}
          onChangeText={preparationTime => this.setState({ preparationTime })}
          style={styles.textInputStyle}
          style={[styles.textInputStyle, styles.spaceBetweenTxtfield]}
        ></TextInput>
        <TextInput
          placeholder={"Servers (Ex: 4)"}
          keyboardType='numeric'
          value={this.state.serves}
          onChangeText={serves => this.setState({ serves })}
          style={[styles.textInputStyle, , styles.spaceBetweenTxtfield]}
        ></TextInput>
        <View style={[styles.dropDownStyle, { width: "90%", marginTop: 75 }]}>
          <Dropdown
            label="Complexity"
            ref={"dropdownComplexity"}
            animationDuration={100}
            containerStyle={{ marginTop: 10 }}
            dropdownOffset={{ top: 0, left: 0 }}
            rippleInsets={{ top: 0, bottom: 0 }}
            value={this.state.complexity}
            data={complexityData}
          />
        </View>
        <TouchableOpacity onPress={this.addRecipe} style={styles.buttonLogin}>
          <Text
            style={{
              color: "black",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: "bold"
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
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
    justifyContent: "flex-start",
    backgroundColor: "white",
    width: "100%"
  },
  textInputStyle: {
    top: 40,
    width: "90%",
    height: 45,
    borderBottomWidth: 1
  },
  spaceBetweenTxtfield: {
    marginTop: "5%"
  },
  buttonLogin: {
    height: 65,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    top: 60
  },
  topHeader: {
    ...Platform.select({
      ios: {
        color:'rgba(34,119,255,1)',
      },
      android: {
        color:'white',
        paddingTop: getStatusBarHeight(),
        height: 54 + getStatusBarHeight(),
      }
  }),
  },
});
