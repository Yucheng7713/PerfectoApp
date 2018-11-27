// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon, Container, Header, Footer, Content, Left, Right, Body, Title } from 'native-base';
import {createStackNavigator } from 'react-navigation';

// Import all screens as classes
import OrderList from './Ordering/OrderList';
import FindKioskScreen from './Ordering/FindKioskScreen';

// Order screen stack navigation : order list and find kiosk view
export const OrderCoffeeNavigation = createStackNavigator({
  Menu: {
    screen: OrderList,
    navigationOptions: {
      header: null
    }
  },
  KioskMap: {
    screen: FindKioskScreen,
    navigationOptions: {
      title: "Select a Kiosk",
      gesturesEnabled: false,
      headerBackImage: (
        <Icon style={{ paddingLeft: 10 }} name='ios-arrow-down' />
      )
    }
  }
},{
    initialRouteName: 'Menu',
    mode: 'modal',
    headerMode: 'screen',
    gesturesEnabled: false,
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
