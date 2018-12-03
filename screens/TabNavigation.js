import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
// Import signin / signup screens as components
import SignInScreen from './AuthScreens/SignIn';
import SignUpScreen from './AuthScreens/SignUp';

// Sign In/Up tab navigation screen
export const AuthenticateTabNavigation = createBottomTabNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
},{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'SignIn') {
          iconName = `ios-log-in`;
        } else if (routeName === 'SignUp') {
          iconName = `ios-person-add`;
        }
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
      initialRouteName: 'SignIn',
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'white',
      style : {
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        position: 'absolute',
        marginBottom: 10,
        left: 0,
        right: 0,
        bottom: 0,
      }
    },
});

// Main export component
export default class TabNavigation extends Component<Props> {
  static router = AuthenticateTabNavigation.router;
  render() {
    return (
      <AuthenticateTabNavigation navigation={this.props.navigation} />
    );
  }
}
