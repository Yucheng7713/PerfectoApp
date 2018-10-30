// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
// Import all screens as classes
import DrawerMenu from '../screens/DrawerMenu';
import TabNavigation from '../screens/TabNavigation';

// Root navigator - for Home drawer screen and login / signin screen
export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      SignedIn: {
        screen: DrawerMenu,
        navigationOptions: {
          gesturesEnabled: false,
        }
      },
      SignedOut: {
        screen: TabNavigation,
      }
    },{
      initialRouteName: signedIn ? "SignedIn" : "SignedOut",
      mode: 'modal',
      headerMode: 'none'
    }
  );
}
