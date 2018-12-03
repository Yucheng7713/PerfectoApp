// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Root, Icon, Button, Container, Header, Content, Body, Title, Left, Right } from 'native-base'

import ListView from './RecipeInventory/ListScreen';
import DetailView from './RecipeInventory/DetailScreen';

// My Recipes navigator holding recipe list and recipe detail
export const RecipeInventoryNavigation = createStackNavigator({
  RecipeList: {
    screen: ListView,
    navigationOptions: {
      header: null,
    }
  },
  RecipeDetail: {
    screen: DetailView,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
},{
  initialRouteName: 'RecipeList',
  mode: 'card',
  headerBackTitle: null,
  headerMode: 'float',
});

export default class RecipesScreen extends Component<Props> {
  static router = RecipeInventoryNavigation.router;
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Root>
          <RecipeInventoryNavigation navigation={this.props.navigation}/>
        </Root>
      </Container>
    );
  }
}
