// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Root, Icon, Container, Header, Content, Left, Right, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

// Import all screens related to customization and ordering
import BaseScreen from './Customizing/BaseScreen';
import PreferenceScreen from './Customizing/PreferenceScreen';
import MilkScreen from './Customizing/MilkScreen';
import FlavorScreen from './Customizing/FlavorScreen';
import SugarScreen from './Customizing/SugarScreen';
import ExtraScreen from './Customizing/ExtraScreen';
import ConfirmScreen from './Customizing/ConfirmScreen';
import MapScreen from './Customizing/MapScreen';
import DoneScreen from './Customizing/DoneScreen';

// Stack navigator holding order confirm screen and map screen
const orderConfirmation = createStackNavigator({
  Confirm: {
    screen: ConfirmScreen,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      title: "Choose Pickup Location",
      gesturesEnabled: false,
      headerBackImage: (
        <Icon style={ { color: '#017afe', marginLeft: 20 } } name='ios-arrow-down' />
      )
    }
  },
},{
  initialRouteName: 'Confirm',
  mode: 'modal',
  headerMode: 'screen',
  gesturesEnabled: false,
});

// Stack navigator holding base menu screen (home screen), all customization screens
export const CustomizeStepsNavigation = createStackNavigator({
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
  Order: {
    screen: orderConfirmation,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    }
  },
  Done: {
    screen: DoneScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
},{
  initialRouteName: 'BaseCoffee',
  mode: 'card',
  headerMode: 'float',
  headerBackTitle: null,
  gesturesEnabled: false,
});

// Component configuration for customize screen -> layout, state...
export default class CustomizeScreen extends Component<Props> {

  static router = CustomizeStepsNavigation.router;

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Root>
          <CustomizeStepsNavigation navigation={this.props.navigation}/>
        </Root>
      </Container>
    );
  }
}
