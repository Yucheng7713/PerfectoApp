// Required components from React, React Navigation, and Native Base
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground } from 'react-native';
import {Button, Container, Content, Form, Item as FormItem, Input, Title} from 'native-base'
import { onSignIn } from "../src/auth";

export default class SignIn extends Component<Props> {
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <ImageBackground
        source={ require('../assets/Background/splash-background.png') }
        style={ styles.imgBackground }>
        <Content style={{paddingTop: 70}}>
          <Title style={ styles.welcomeBackStyle}> Welcome Back ! </Title>
          <Form style={ styles.inputField }>
            <FormItem>
              <Input placeholder="Username" placeholderTextColor="#808080" />
            </FormItem>
            <FormItem>
              <Input placeholder="Password" placeholderTextColor="#808080" secureTextEntry={true} />
            </FormItem>
          </Form>
          <View style={ styles.loginButtonLayout }>
            <Button style={ styles.loginButtonStyle }
            onPress={() => { onSignIn().then(() => this.props.navigation.navigate("SignedIn")); }}>
              <Text style={{ color: 'white' }}>Login</Text>
            </Button>
          </View>
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
  welcomeBackStyle: {
    color: 'white',
    fontSize: 30
  },
  inputField: {
    paddingRight: 20,
    paddingTop: 20

  },
  loginButtonLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  loginButtonStyle: {
    width: '33%',
    backgroundColor: 'rgba(22, 22, 22, 0.3)',
    justifyContent: 'center'
  },
});
