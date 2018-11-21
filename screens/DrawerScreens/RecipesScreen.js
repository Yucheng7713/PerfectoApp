// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Root, Icon, Button, Container, Header, Content, Body, Title, Left, Right } from 'native-base'

import ListView from './RecipeInventory/ListScreen';
import DetailView from './RecipeInventory/DetailScreen';

export const RecipeInventoryNavigation = createStackNavigator({
  RecipeList: {
    screen: ListView,
  },
  RecipeDetail: {
    screen: DetailView,
  }
},{
  initialRouteName: 'RecipeList',
  headerMode: 'none',
});

export default class RecipesScreen extends Component<Props> {
  static router = RecipeInventoryNavigation.router;
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name='ios-menu' onPress={() => {this.props.navigation.openDrawer(); } }/>
          </Left>
          <Body><Title style={{width: 150}}>Recipes</Title></Body>
          <Right></Right>
        </Header>
        <Root>
          <RecipeInventoryNavigation navigation={this.props.navigation}/>
        </Root>
      </Container>
    );
  }
}
