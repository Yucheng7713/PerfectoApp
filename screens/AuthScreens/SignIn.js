// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Alert, AsyncStorage } from 'react-native';
import { Button, Container, Content, Form, Item as FormItem, Input, Title } from 'native-base';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { onSignIn, STATIC_USERID, STATIC_PASSWORD } from "../../src/auth";

export default class SignIn extends Component<Props> {
  // Login data state
  state = {
    userid: 'NEED_TO_BE_PROVIDED',
    password: 'NEED_TO_BE_PROVIDED',
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <ImageBackground
        source={ require('../../assets/Background/splash-background.png') }
        style={ styles.imgBackground }>
        <Content style={ styles.contentAdjust }>
          <Title style={ styles.welcomeBackStyle}> Welcome Back ! </Title>
          <Form style={ styles.inputField }>
            <FormItem>
              <Input placeholder="Username"
              placeholderTextColor="#808080"
              onChangeText={ (textValue) => this.state.userid = textValue }/>
            </FormItem>
            <FormItem>
              <Input placeholder="Password"
              placeholderTextColor="#808080"
              onChangeText={ (textValue) => this.state.password = textValue }
              secureTextEntry={ true } />
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
                    'Username & Password unmatched',
                    [
                      { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                  )
                }
              }
            }>
              <Text style={ styles.buttonTextStyle }>Login</Text>
            </Button>
          </View>
          <View style={ styles.loginButtonLayout }>
            <LoginButton
            readPermissions={ ["email", "user_friends", "public_profile"] }
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("Facebook login error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("Facebook login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      const infoRequest = new GraphRequest('/me', {
                        accessToken: data.accessToken,
                        parameters: {
                            fields: {
                               string: 'email,name,first_name,last_name,picture.type(large)'
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
  //Create Facebook profile data fetching response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Fetching Facebook profile data error: ' + error.toString());
    } else {
      // Fetch user Facebook info - place static data as test
      this.setState({
        userid: STATIC_USERID,
        password: STATIC_PASSWORD,
      });
      // AsyncStorage.setItem('USER_PROFILE', result.picture.data.url);
      AsyncStorage.setItem('USER_FB_INFO', JSON.stringify({
        name: result.name,
        email: result.email,
        picture_url: result.picture.data.url
      }));
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
  contentAdjust: {
    paddingTop: 70
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
  buttonTextStyle: {
    color: 'white'
  }
});
