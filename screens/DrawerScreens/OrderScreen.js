// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon, Container, Header, Footer, Content, Left, Right, Body, Title } from 'native-base';
import {createStackNavigator } from 'react-navigation';

// Import all screens as classes
import OrderList from './Ordering/OrderList';
import OrderDetailScreen from './Ordering/OrderDetailScreen';

// Order history stack navigator : history list and order detail screen
export const OrderCoffeeNavigation = createStackNavigator({
  Menu: {
    screen: OrderList,
    navigationOptions: {
      header: null
    }
  },
  OrderDetail: {
    screen: OrderDetailScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
},{
    initialRouteName: 'Menu',
    mode: 'card',
    headerBackTitle: null,
    headerMode: 'float',
});

// Component configuration for ordering screen -> layout, state...
export default class OrderScreen extends Component<Props> {
  static router = OrderCoffeeNavigation.router;
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <OrderCoffeeNavigation navigation={ this.props.navigation } />
    );
  }
}
