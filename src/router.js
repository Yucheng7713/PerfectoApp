// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
// Import root navigators : Drawer navigator ( holding all screens after login)
// and tab navigator ( holding all screens before login )
import DrawerMenu from '../screens/DrawerMenu';
import TabNavigation from '../screens/TabNavigation';

// Root navigator consisting drawer navigator (side drawer menu) and signin/signup tab navigator
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
