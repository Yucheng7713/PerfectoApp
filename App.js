// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native'
// Import root navigator and the authenticator
import { createRootNavigator } from './src/router'
import { isSignedIn } from './src/auth';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }
  // When the app is initiate -> Show welcome splash screen and check sign in state
  componentDidMount() {
    	// do stuff while splash screen is shown
      SplashScreen.hide();
      // Check if user has already signed in
      isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  // Rendering root navigator and views
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
