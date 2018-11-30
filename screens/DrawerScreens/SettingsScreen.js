// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, List, ListItem } from 'native-base'

// Component configuration for settings screen -> layout, state data
export default class SettingsScreen extends Component<Props> {
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={ () => { this.props.navigation.openDrawer(); } }>
              <Image
              style={ { width: 25, height: 25} }
              source={require('../../assets/SideBarIcons/home-icon.png')} />
            </TouchableOpacity>
          </Left>
          <Body><Title style={ styles.titleStyle }>Settings</Title></Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={ styles.containerStyle }>
          <List style={ styles.listStyle }>
            <ListItem itemDivider>
              <Text>Invite</Text>
            </ListItem>
            <ListItem>
              <Image source={ require("../../assets/Icons/social_icons/facebook_setting_icon.png") }/>
              <Text> Facebook</Text>
            </ListItem>
            <ListItem>
              <Image source={ require("../../assets/Icons/social_icons/twitter_setting_icon.png") }/>
              <Text> Twitter</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>Account</Text>
            </ListItem>
            <ListItem>
              <Text>Password</Text>
            </ListItem>
            <ListItem>
              <Text>Email</Text>
            </ListItem>
            <ListItem>
              <Text>Payments</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  titleStyle: {
    width: 150
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  listStyle: {
    alignSelf: 'stretch'
  }
});
