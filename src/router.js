// Required components from React, React Navigation, and Native Base
import React, {Component} from 'react';
import { Platform, Image, Text } from 'react-native';
import {Container, Content, Header, Body, Icon, Footer, Button } from 'native-base';
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator, DrawerItems, DrawerActions, StackActions, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { onSignOut } from "./auth";

// Import all screens as classes
import CustomizeScreen from '../screens/CustomizeScreen';
import RecipesScreen from '../screens/RecipesScreen';
import OrderScreen from '../screens/OrderScreen';
import FindKioskScreen from '../screens/FindKioskScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';

// Sign In/Up tab navigation screen
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

export const OrderCoffeeNavigation = createStackNavigator({
  Menu: {
    screen: OrderScreen,
    navigationOptions: {
      header: null
    }
  },
  KioskMap: {
    screen: FindKioskScreen,
  },
},{
  initialRouteName: 'Menu',
  mode: 'modal',
  headerMode: 'screen',
  gesturesEnabled: false,
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
        props.navigation.dispatch(DrawerActions.closeDrawer());
        props.onItemPress(route);
      }} />
    </Content>
    <Footer style={ { height: 150, backgroundColor: 'white' } }>
      <Body style={ { justifyContent: 'center' } }>
        <Button style={ { width: '33%',backgroundColor: 'rgba(22, 22, 22, 0.3)', justifyContent: 'center'} }
          onPress={() => { onSignOut().then(() => {
            props.navigation.dispatch(resetAction);
            // props.navigation.dispatch(logoutAction);
          });
        }}>
          <Text style={{ color: 'white' }}>Logout</Text>
        </Button>
      </Body>
    </Footer>
  </Container>
);

const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [
    NavigationActions.navigate({ routeName: 'SignedOut' })
  ],
});

const logoutAction = NavigationActions.navigate({
  routeName: 'SignedOut',
  params: {}
});


// Home page with drawer navgation menu
export const DrawerMenuNavigation = createDrawerNavigator({
  Customize: {
    screen: CustomizeScreen,
    navigationOptions: {
      drawerIcon: (
        <Image source={require("../assets/SideBarIcons/customize-icon.png")} style={{height: 24, width: 24}} />
      )
    }
  },
  Recipes: {
    screen: RecipesScreen,
    navigationOptions: {
      drawerIcon: (
        <Image source={require("../assets/SideBarIcons/recipe-icon.png")} style={{height: 24, width: 24}} />
      )
    }
  },
  Order: {
    screen: OrderCoffeeNavigation,
    navigationOptions: {
      drawerIcon: (
        <Image source={require("../assets/SideBarIcons/order-icon.png")} style={{height: 24, width: 24}} />
      )
    }
  },
  Profile : {
    screen: ProfileScreen,
    navigationOptions: {
      drawerIcon: (
        <Image source={require("../assets/SideBarIcons/profile-icon.png")} style={{height: 24, width: 24}} />
      )
    }
  },
  Settings : {
    screen: SettingsScreen,
    navigationOptions: {
      drawerIcon: (
        <Image source={require("../assets/SideBarIcons/settings-icon.png")} style={{height: 24, width: 24}} />
      )
    }
  }
},{
  initialRouteName: 'Customize',
  contentComponent: CustomDrawerContentComponent,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});

// Root navigator - for Home drawer screen and login / signin screen
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
      gesturesEnabled: false
    }
  );
}
