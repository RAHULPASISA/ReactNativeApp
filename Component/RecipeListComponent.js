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
import {Platform} from 'react-native';

export default class RecipeListComponent extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      isRefreshing: false
    };
  }

  static navigationOptions =  ({ navigation })=> {
    return {
    title: 'Recipe List',
    headerTitleAlign: 'center',
    headerBackImage: null,
    headerBackTitleVisible: false,
    headerRightImage: (
      <Image
        style={StyleSheet.absoluteFill}
        source={{ uri: 'http://35.160.197.175:3006/uploads/d3da38ab-df97-49a8-9485-8955eb0deb80.jpg' }}
      />
    ),
    // headerStyle: {
    //     height: 100,
    //     backgroundColor: 'rgba(240, 240, 246, 1)',
    //   },
    //   headerTintColor: 'black',
    //   headerTitleStyle: {
    //     fontFamily: 'TimesNewRomanPS-BoldMT',
    //     fontSize: 30
    //   },
    headerRight: () => (
        <Button
          // style= {styles.addButtonStyleNavigation}
          onPress={() => navigation.navigate('AddRecipe')}
          title="Add"
          //color="black"
        />
      )
    
    }
}

  Recipe = () => {
    const url = "http://35.160.197.175:3006/api/v1/recipe/feeds";
    const tokenFromLogin =
      'Bearer ' + this.props.navigation.getParam('token')   

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
      <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
        <View style={styles.cardViewStyle}>
          <ImageBackground
            style={{ width: "100%", height: "100%",  justifyContent: 'flex-end', alignItems: 'flex-end' }}
            source={ this.checkImageURLNull(item.photo) }
            imageStyle={{ borderRadius: 10 }}
          >
            <ImageBackground 
            blurRadius = {22} style={styles.blurImage}
            imageStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
            source={this.blurTextBackground(item.photo)}>  
            <Text style={styles.cardTextStyle}>
              {/* Full Name : {item.firstName} {item.lastName} */}
            Name : {item.name}
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
      </TouchableWithoutFeedback>

        
    );
  };

  actionOnRow(item) {
    console.log('Selected Item :',item);
    this.props.navigation.navigate('DetailRecipe',{selectItem: JSON.stringify(item)})
 }

  checkImageURLNull(url) {
    console.log(url);
    if (url == null) {
      return require('../assets/Cook.gif')
    } else {
      return {uri: url};
    }
  }

  blurTextBackground(url) {
    if (url == null) {
      return {uri: 'http://35.160.197.175:3006/uploads/346e7d17-515a-4908-b3d0-5b4136a56b7c.jpg'}
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
          <SafeAreaView style={{ flex:1,backgroundColor:'white'}}>
          <View style={{flexDirection:"row", backgroundColor:"white", height:44,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'rgba(231,231,232,1)'}}>
            <Text style={{color:'red'}}>hello</Text>
            <Button
          // style= {styles.addButtonStyleNavigation}
          onPress={() => this.props.navigation.navigate('AddRecipe')}
          title="Add"
          //color="black"
        />
          </View>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(i,k) => k.toString()}

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
          fontFamily: 'Baskerville-SemiBold',
          top: 5,
        },
        android: {
          fontFamily: 'sans-serif-condensed',
          top: 0,
        }
    }),
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
    alignItems: 'flex-start',
   }
});
