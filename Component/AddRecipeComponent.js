import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Dropdown } from "react-native-material-dropdown";

export default class AddRecipeComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "Pizza",
      preparationTime: "1 Hour",
      serves: "4",
      complexity: "",
      token: null
    };
  }

  addRecipe = () => {
    console.log('Rahul ', this.state.complexity);
    
    const { goBack } = this.props.navigation;
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
        Alert.alert("Success", "Data added successfully", [
          {
            text: "Okay",
            onPress: () => goBack(),
            style: "cancel"
          }
        ]);
      })
      .catch(error => {
        Alert.alert("ERROR", error);
      });
  };

  render() {
    complexityData = [
      {
        value: "Medium"
      },
      {
        value: "Easy"
      },
      {
        value: "Complex"
      }
    ];
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={"Enter Item Name"}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          style={styles.textInputStyle}
        ></TextInput>
        <TextInput
          placeholder={"Enter preparation Time"}
          value={this.state.preparationTime}
          onChangeText={preparationTime => this.setState({ preparationTime })}
          style={styles.textInputStyle}
          style={[styles.textInputStyle, styles.spaceBetweenTxtfield]}
        ></TextInput>
        <TextInput
          placeholder={"Servers"}
          value={this.state.serves}
          onChangeText={serves => this.setState({ serves })}
          style={[styles.textInputStyle, , styles.spaceBetweenTxtfield]}
        ></TextInput>
         <View style={[styles.dropDownStyle, { width: '90%', marginTop: 75 }]}>
                            <Dropdown
                                label="Complexity"
                                ref={"dropdownComplexity"}
                                animationDuration={100}
                                containerStyle={{ marginTop: 10 }}
                                dropdownOffset={{ top: 0, left: 0 }}
                                rippleInsets={{ top: 0, bottom: 0 }}
                                value={this.state.complexity}
                                data={complexityData} />
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
  }
});
