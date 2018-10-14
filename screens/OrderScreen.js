// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon, Button, Container, Header, Footer, Content, Left, Right, Body, Title } from 'native-base';

export default class OrderScreen extends Component<Props> {

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name='ios-menu' onPress={ () => { this.props.navigation.openDrawer(); } }/>
          </Left>
          <Body><Title style={ { width: 150 } }>Order page</Title></Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1675ba'
        }}>
          <Text style={ styles.instructions }>Order Screen</Text>
        </Content>
        <Footer style={ { backgroundColor: "rgba(0,44,54,0.3)" } }>
          <TouchableOpacity onPress={ () => { this.props.navigation.navigate('KioskMap'); }}>
            <Body style={ { justifyContent: 'center' } }>
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
  }
});
