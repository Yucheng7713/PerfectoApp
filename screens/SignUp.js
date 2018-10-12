// Required components from React, React Navigation, and Native Base
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground} from 'react-native';
import {Icon, Button, Container, Header, Content, Left, Right, Body, Title} from 'native-base'

export default class SignUp extends Component<Props> {
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <ImageBackground
        source={require('../assets/Background/splash-background.png')}
        style={ styles.imgBackground }>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={styles.instructions}>Sign Up Screen</Text>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  instructions: {
    color: "#f5fcff"
  }
});
