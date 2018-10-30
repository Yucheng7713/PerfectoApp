// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon, Container, Header, Content, Left, Right, Body, Title } from 'native-base';

// Component configuration for customize screen -> layout, state...
export default class CustomizeScreen extends Component<Props> {
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name='ios-menu' onPress={ () => { this.props.navigation.openDrawer(); } }/>
          </Left>
          <Body><Title style={ styles.titleStyle }>Customization</Title></Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={ styles.containerStyle }>
          <Text style={ styles.instructions }>Customize Screen</Text>
        </Content>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  instructions: {
    color: "#f5fcff",
    fontSize: 20,
  },
  titleStyle: {
    width: 150
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f6d7a'
  }
});
