// Required components from React, React Navigation, and Native Base
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Icon, Button, Container, Header, Content, Body, Title, Left, Right} from 'native-base'

type Props = {};
export default class ProfileScreen extends Component<Props> {
  static navigationOptions = {
    drawerIcon: (
      <Image source={require("../assets/SideBarIcons/profile-icon.png")} style={{height: 24, width: 24}} />
    )
  }
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name='ios-menu' onPress={() => {this.props.navigation.openDrawer(); } }/>
          </Left>
          <Body><Title style={{width: 150}}>User Profile</Title></Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2c57a6'
        }}>
          <Text style={styles.instructions}>User Profile Screen</Text>
        </Content>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  instructions: {
    color: "#f5fcff"
  }
});
