// Required components from React, React Navigation, and Native Base
import React, {Component} from 'react';
import { Platform, Image } from 'react-native';
import {Container, Content, Header, Body, Icon } from 'native-base';
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import all screens as classes
import CustomizeScreen from '../screens/CustomizeScreen';
import RecipesScreen from '../screens/RecipesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';

// Sign In/Up tab page
export const SignInTabNavigation = createBottomTabNavigator({
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

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
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

// Side Drawer Navigator Layout Customization
const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{height: 150, backgroundColor: 'white'}}>
      <Body>
        <Image
        style={{height: 100, width: 100, borderRadius: 50}}
        source={require("../assets/Profile/default-profile.png")} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props}
      onItemPress={(route, focused)=>{
        console.log(route);
        props.navigation.dispatch(DrawerActions.closeDrawer());
        props.onItemPress(route);
      }} />
    </Content>
  </Container>
);

// Home page with drawer navgation menu
export const DrawerMenuNavigation = createDrawerNavigator({
  Customize: {
    screen: CustomizeScreen
  },
  Recipes: {
    screen: RecipesScreen
  },
  Profile : {
    screen: ProfileScreen
  },
  Settings : {
    screen: SettingsScreen
  }
},{
  initialRouteName: 'Customize',
  contentComponent: CustomDrawerContentComponent,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});



export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      SignedIn: {
        screen: DrawerMenuNavigation,
      },
      SignedOut: {
        screen: SignInTabNavigation,
      }
    },{
      initialRouteName: signedIn ? "SignedIn" : "SignedOut",
      mode: 'modal',
      headerMode: 'none',
    }
  );
}
