// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { Container, Content, Header, Body, Icon, Footer, Button } from 'native-base';
import { createStackNavigator, createDrawerNavigator, DrawerItems, DrawerActions, StackActions, NavigationActions } from 'react-navigation';
import { onSignOut } from "../src/auth";

// Import all screens as classes
import CustomizeScreen from './DrawerScreens/CustomizeScreen';
import RecipesScreen from './DrawerScreens/RecipesScreen';
import OrderScreen from './DrawerScreens/OrderScreen';
import ProfileScreen from './DrawerScreens/ProfileScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';

// Side Drawer Navigator Layout Customization
const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={ customDrawerStyles.sectionBackground }>
    </Header>
    <Content>
      <DrawerItems { ...props }
      onItemPress={ (route, focused) => {
        props.navigation.dispatch(DrawerActions.closeDrawer());
        props.onItemPress(route);
      }} />
    </Content>
    <Footer style={ customDrawerStyles.sectionBackground  }>
      <Body style={ customDrawerStyles.bodyStyle }>
        <Button style={ customDrawerStyles.logoutButtonStyle }
          onPress={() => { onSignOut().then(() => {
            props.navigation.dispatch(resetAction);
          });
        }}>
          <Text style={ customDrawerStyles.buttonTextColor }>Logout</Text>
        </Button>
      </Body>
    </Footer>
  </Container>
);

// Side Drawer Navigator Layout Styling
const customDrawerStyles = StyleSheet.create({
  sectionBackground: {
    height: 50,
    backgroundColor: 'white'
  },
  profileStyle: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  bodyStyle: {
    justifyContent: 'center'
  },
  logoutButtonStyle: {
    width: '33%',
    backgroundColor: 'rgba(22, 22, 22, 0.3)',
    justifyContent: 'center'
  },
  buttonTextColor: {
    color: 'white'
  }
});

// Action that reset the navigation flow after log out
const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [
    NavigationActions.navigate({ routeName: 'SignedOut' })
  ],
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
    screen: OrderScreen,
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

// Main export component
export default class DrawerMenu extends Component<Props> {
  static router = DrawerMenuNavigation.router;
  render() {
    return (
      <DrawerMenuNavigation navigation={ this.props.navigation } />
    );
  }
}
