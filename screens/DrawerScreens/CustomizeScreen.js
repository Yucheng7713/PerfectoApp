// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Root, Icon, Container, Header, Content, Left, Right, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import BaseScreen from './Customizing/BaseScreen';
import PreferenceScreen from './Customizing/PreferenceScreen';
import MilkScreen from './Customizing/MilkScreen';
import FlavorScreen from './Customizing/FlavorScreen';
import SugarScreen from './Customizing/SugarScreen';
import ExtraScreen from './Customizing/ExtraScreen';

export const CustomizeStespNavigation = createStackNavigator({
  BaseCoffee: {
    screen: BaseScreen,
    navigationOptions: {
      header: null,
    }
  },
  Preference: {
    screen: PreferenceScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Milk : {
    screen: MilkScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Flavor : {
    screen: FlavorScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Sugar : {
    screen: SugarScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Extra: {
    screen: ExtraScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
},{
  initialRouteName: 'BaseCoffee',
  mode: 'card',
  headerMode: 'float',
  headerBackTitle: null,
  gesturesEnabled: false,
});

// Component configuration for customize screen -> layout, state...
export default class CustomizeScreen extends Component<Props> {
  
  static router = CustomizeStespNavigation.router;

  componentDidMount() {

  }
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Root>
          <CustomizeStespNavigation navigation={this.props.navigation}/>
        </Root>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f6d7a'
  }
});
