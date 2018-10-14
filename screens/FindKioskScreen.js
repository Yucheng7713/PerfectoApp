// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { Icon, Button, Container, Header, Footer, Content, Left, Right, Body, Title } from 'native-base';

export default class FindKioskScreen extends Component<Props> {

  async componentDidMount() {
    // Do sth when the view is loaded
  }
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faea23'
        }}>
          <Text style={ styles.instructions }>Find Kiosk Screen</Text>
        </Content>
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
