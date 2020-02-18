import React, { Component } from "react";
import { Image, Text } from "react-native";
import Login from "./Component/LoginComponent";
import Recipe from "./Component/RecipeListComponent";
import AddRecipe from "./Component/AddRecipeComponent";
import DetailRecipe from "./Component/DetailRecipeComponent";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator,TransitionPresets } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import Setting from "./Component/SettingComponent"

const tabbarNavigator = createBottomTabNavigator({
  Recipe: {
    screen: Recipe, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/cooking.png')}></Image>
      ),
      title: 'Cooking List'
    }
  },
  SettingComponent: {
    screen: Setting, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/settings.png')}></Image>
      ),
      title: 'Settings'
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: 'rgba(0,182,524,1)',
  }, 
  navigationOptions:{
    headerShown: false
  }
  
})

// tabbarNavigator.navigationOptions = ({ navigation }) => {
//   let { routeName } = navigation.state.routes[navigation.state.index];
//   let title;
//   if (routeName === 'home') {
//     title = 'Home';
//   } else if (routeName === 'profile') {
//     title = 'Profile';
//   }
//   return {
//     title,
//   };
// };

const detailNavigation = createStackNavigator({
  tabbarNavigator,
  DetailRecipe: { screen: DetailRecipe , navigationOptions:{ ...TransitionPresets.SlideFromRightIOS}},
  AddRecipe: { screen: AddRecipe}, //navigationOptions: { ...TransitionPresets.ModalPresentationIOS } 
});

const navigate = createSwitchNavigator({
  Login: {
    screen: Login,
    navigationOptions: { headerShown: false }
  },
  detailNavigation
});

const App = createAppContainer(navigate);

export default App;
