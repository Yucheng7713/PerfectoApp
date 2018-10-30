// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon, Container, Header, Footer, Content, Left, Right, Body, Title } from 'native-base';

// Component configuration for ordering screen -> layout, state...
export default class OrderList extends Component<Props> {
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name='ios-menu' onPress={ () => { this.props.navigation.openDrawer(); } }/>
          </Left>
          <Body><Title style={ styles.titleStyle }>Order page</Title></Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={ styles.containerStyle }>
          <Text style={ styles.instructions }>Order Screen</Text>
        </Content>
        <Footer style={ styles.bottomTabStyle }>
          <TouchableOpacity onPress={ () => { this.props.navigation.navigate('KioskMap'); }}>
            <Body style={ styles.bottomTabBodyStyle }>
              <Text style= { styles.instructions }>Choose a kiosk to pick up</Text>
            </Body>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  instructions: {
    color: "#f5fcff",
    fontSize: 20,
  },
  titleStyle: {
    width: 150
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1675ba'
  },
  bottomTabStyle: {
    backgroundColor: 'rgba(0,44,54,0.3)'
  },
  bottomTabBodyStyle: {
    justifyContent: 'center'
  }
});
