import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Login from "./Component/Login";
import Recipe from "./Component/Recipe";
import AddRecipe from "./Component/AddRecipe";
import DetailRecipe from "./Component/DetailRecipe";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

const detailNavigation = createStackNavigator(
  {
    Recipe: { screen: Recipe },
    DetailRecipe: { screen: DetailRecipe },
    AddRecipe: { screen: AddRecipe }
    // , navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } }
  },
  {
    mode: "card"
    // defaultNavigationOptions: {
    //   headerShown: false
    // },
  }
);

const navigate = createSwitchNavigator({
  Login: {
    screen: Login,
    navigationOptions: { headerShown: false }
  },
  detailNavigation
});

const App = createAppContainer(navigate);

export default App;
