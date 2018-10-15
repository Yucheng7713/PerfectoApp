// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import { Button, Container, Content, Form, Item as FormItem, Input, Title } from 'native-base';
import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { onSignIn } from "../src/auth";

export default class SignIn extends Component<Props> {
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  state = {
    userid: 'NEED_TO_BE_PROVIDED',
    name: 'Perfecto User',
    password: 'NEED_TO_BE_PROVIDED',
    email: 'perfectodemo@email.com',
    profile_url: "../assets/Profile/default-profile.png"
  }

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
              <Input placeholder="Username"
              placeholderTextColor="#808080"
              onChangeText={(textValue) => this.state.userid = textValue}/>
            </FormItem>
            <FormItem>
              <Input placeholder="Password"
              placeholderTextColor="#808080"
              onChangeText={(textValue) => this.state.password = textValue}
              secureTextEntry={true} />
            </FormItem>
          </Form>
          <View style={ styles.loginButtonLayout }>
            <Button style={ styles.loginButtonStyle }
            onPress={() => {
                if (onSignIn(this.state.userid, this.state.password)) {
                  this.props.navigation.navigate("SignedIn");
                } else {
                  Alert.alert(
                    'Invalid login information',
                    'Username / Password unmatched',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')}
                    ],
                    { cancelable: false }
                  )
                }
              }
            }>
              <Text style={{ color: 'white' }}>Login</Text>
            </Button>
          </View>
          <View style={ styles.loginButtonLayout }>
            <LoginButton
            readPermissions={["email", "user_friends", "public_profile"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      const infoRequest = new GraphRequest('/me', {
                        accessToken: data.accessToken,
                        parameters: {
                            fields: {
                               string: 'email,name,first_name,last_name,picture'
                            }
                        }
                      }, this._responseInfoCallback);
                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start();
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log("logout.")}/>
          </View>
        </Content>
        </ImageBackground>
      </Container>
    );
  }

  //Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      // Fetch user Facebook info - place static data as test
      this.setState({
        userid: 'yucheng8168',
        name: result.name,
        password: 'steven0824',
        email: result.email,
        profile_url: result.picture.data.url
      });
      if (onSignIn(this.state.userid, this.state.password)) {
        this.props.navigation.navigate("SignedIn");
      }
    }
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
