// Required components from React, React Navigation, and Native Base
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Container, Content, Header, Body, Icon} from 'native-base';
import {DrawerNavigator, DrawerItems} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen'

// Import all screens as classes
import CustomizeScreen from './screens/CustomizeScreen.js';
import RecipesScreen from './screens/RecipesScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';

type Props = {};

export default class App extends Component<Props> {
  componentDidMount() {
    	// do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  render() {
    return (
      <PerfectoNavigator />
    );
  }
}

// Side Drawer Navigator Layout Configuration
const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{height: 150, backgroundColor: 'white'}}>
      <Body>
        <Image
        style={styles.drawerProfileImg}
        source={require("./assets/Profile/default-profile.png")} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

// Side Drawer Navigator Content Configuration
const PerfectoNavigator = DrawerNavigator({
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

// Styling components
styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerProfileImg: {
    height: 100,
    width: 100,
    borderRadius: 50
  }
});
