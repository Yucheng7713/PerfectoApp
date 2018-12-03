// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, AsyncStorage, Share } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Footer, Title, Left, Right, Segment, Card, CardItem, List, ListItem  } from 'native-base';
import Collapsible from 'react-native-collapsible';

// Component configuration for ordering screen -> layout, state...
export default class DoneScreen extends Component<Props> {
  // Header configuration
  static navigationOptions = ({ navigation, screenProps}) => ({
    title: "Order Confirmation",
    headerLeft: null
  });

  constructor(props) {
    super(props);
    this.state = {
      saved: props.navigation.state.params.saved
    };
  }

  // Share Recipe
  shareRecipe() {
    Share.share({
      message: 'Check out my new customized coffee!!',
      url: 'https://greenbay.usc.edu/csci577/fall2018/projects/team05/',
      title: 'Perfecto Coffee'
    });
  }

  // Save recipe function
  saveRecipe() {
      let baseRecipe = this.props.navigation.state.params.order.recipe;
      // Form the customized recipe object
      const customRecipe = {
          name: baseRecipe.name,
          base: baseRecipe.base,
          img: baseRecipe.img,
          size: baseRecipe.size,
          milkChoice: baseRecipe.milkChoice,
          milkPortion: baseRecipe.milkPortion,
          milkTemp: baseRecipe.milkTemp,
          foam: baseRecipe.foam,
          flavors: baseRecipe.flavors,
          sweetners: baseRecipe.sweetners,
          extra: baseRecipe.extra
      };
      // Store the customized recipe locally
      AsyncStorage.getItem("Recipes", (error,res) => {
        if (!error) {
            //handle result
            if (res !== null) {
              var recipesList = JSON.parse(res);
              recipesList.customList.push(customRecipe);
              AsyncStorage.setItem("Recipes", JSON.stringify(recipesList));
              this.props.navigation.navigate("Recipes");
            }
        }
      });
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'}}>
            <Title style={{ color: '#017afe', fontSize: 25, paddingBottom: 30 }}>Your order has been placed !</Title>
            <View style={{ paddingBottom: 50 }}>
              <Image
              style={{ width: 200, height: 200 }}
              source={ require('../../../assets/Background/orderComplete.png')}/>
            </View>
            <TouchableOpacity
            style={{ paddingBottom: 30}}
            onPress={() => { this.props.navigation.navigate('BaseCoffee') }}>
              <Text style={{ color: '#017afe', fontSize: 20 }}>Back to Home page</Text>
            </TouchableOpacity>
            { !this.state.saved &&
              <TouchableOpacity
              style={{ paddingBottom: 30}}
              onPress={() => { this.saveRecipe() }}>
                <Text style={{ color: '#017afe', fontSize: 20 }}>Save the recipe</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity
            style={{ paddingBottom: 30}}
            onPress={() => { this.shareRecipe() }}>
              <Text style={{ color: '#017afe', fontSize: 20 }}>Share the recipe</Text>
            </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
