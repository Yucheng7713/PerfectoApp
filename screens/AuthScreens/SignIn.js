// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Alert, AsyncStorage, Image } from 'react-native';
import { Button, Container, Content, Form, Item as FormItem, Input, Title } from 'native-base';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { onSignIn, FBSignIn, STATIC_USERID, STATIC_PASSWORD } from "../../src/auth";

export default class SignIn extends Component<Props> {
  // Login data state
  constructor(props) {
    super(props);
    let loginAPI = "http://18.223.142.153:1337/api/v1/entrance/login";
    this.state = {
      userid: 'NEED_TO_BE_PROVIDED',
      password: 'NEED_TO_BE_PROVIDED',
    };
  }

  nativeSignIn(username, password) {
    fetch("http://18.223.142.153:1337/api/v1/entrance/login", {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress: username,
        password: password
      })
    }).then(function (res){
      // Server backend callback status
      // If login success -> navigate to home page
      // console.log(res);
      if(res.status === 200) {
        AsyncStorage.setItem('loggedin-status', 'true');
        // Store recipes locally
        AsyncStorage.setItem('Card', JSON.stringify({
          "cardNum": null,
          "cardExpiry": null,
          "cardCvc": null,
          "cardType": null
        }));
        AsyncStorage.setItem('Recipes',JSON.stringify({
          "customList": []
        }));
        // Store order history locally
        AsyncStorage.setItem('Orders', JSON.stringify({
          "orderHistory": []
        }));
        this.props.navigation.navigate("SignedIn");
      } else {
        console.log("Login failed!!!");
        // Alert.alert(
        //   'Login failed',
        //   'Invalid login info',
        //   [
        //     { text: 'OK', onPress: () => this.onPress }
        //   ],
        //   { cancelable: false }
        // );
      }
    }.bind(this)).catch((error) => {
      // Error message
      console.error(error);
    });
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <ImageBackground
        source={ require('../../assets/Background/splash-background.png') }
        style={ styles.imgBackground }>
        <Content style={ styles.contentAdjust }>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Image
            style={{ height: 90, width: 250 }}
            source={ require('../../assets/Background/signin_title.png') } />
          </View>
          <Form style={ styles.inputField }>
            <FormItem>
              <Input placeholder="Email"
              style={{ color: '#ffffff' }}
              placeholderTextColor="#808080"
              onChangeText={ (textValue) => this.state.userid = textValue }/>
            </FormItem>
            <FormItem>
              <Input placeholder="Password"
              style={{ color: '#ffffff' }}
              placeholderTextColor="#808080"
              onChangeText={ (textValue) => this.state.password = textValue }
              secureTextEntry={ true } />
            </FormItem>
          </Form>
          <View style={ styles.loginButtonLayout }>
            <Button style={ styles.loginButtonStyle }
            onPress={() => { this.nativeSignIn(this.state.userid, this.state.password) }}>
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
      // Sign in function
      // if(FBSignIn(result)) {
      //   this.props.navigation.navigate("SignedIn");
      // }
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
      if (FBSignIn(this.state.userid, this.state.password)) {
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
    paddingTop: 70,
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
