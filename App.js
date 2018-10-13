// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Import root navigator and the authenticator
import { createRootNavigator } from './src/router'
import { isSignedIn } from './src/auth';

type Props = {};

export default class App extends Component<Props> {
  state = {
    signedIn: false,
    checkedSignIn: false
  }

  componentDidMount() {
    	// do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
      // Check if user has already signed in
      isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    if(!checkedSignIn) {
      return null;
    }
    const RootLayout = createRootNavigator(signedIn);
    return (
      <RootLayout />
    );
  }
}
