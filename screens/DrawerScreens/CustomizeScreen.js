// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Root, Icon, Container, Header, Content, Left, Right, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import BaseScreen from './Customizing/BaseFlavors';
import MilkScreen from './Customizing/MilkPreference';
import ExtraScreen from './Customizing/ExtraAdd';
//import ReviewScreen from './Customizing/Review';

export const CustomizeStespNavigation = createStackNavigator({
  BaseFlavor: {
    screen: BaseScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  Milk: {
    screen: MilkScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  Extra: {
    screen: ExtraScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
},{
  initialRouteName: 'BaseFlavor',
  mode: 'card',
  headerMode: 'none'
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
        <Header>
          <Left>
            <Icon name='ios-menu' onPress={ () => { this.props.navigation.openDrawer(); } }/>
          </Left>
          <Body><Title style={ styles.titleStyle }>Customization</Title></Body>
          <Right></Right>
        </Header>
        <Root>
          <CustomizeStespNavigation navigation={this.props.navigation}/>
        </Root>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  titleStyle: {
    width: 150
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f6d7a'
  }
});
