// Required components from React, React Navigation, and Native Base
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Icon, Button, Container, Header, Content, Left, Right, Body, Title} from 'native-base'

type Props = {};

export default class CustomizeScreen extends Component<Props> {
  static navigationOptions = {
    drawerIcon: (
      <Image source={require("../assets/SideBarIcons/customize-icon.png")} style={{height: 24, width: 24}} />
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
          <Body><Title style={{width: 150}}>Customization</Title></Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4f6d7a'
        }}>
          <Text style={styles.instructions}>Customize Screen</Text>
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
