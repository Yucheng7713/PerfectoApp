// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image , AsyncStorage, TouchableOpacity } from 'react-native';
import { Icon, Container, Header, Content, Body, Title, Left, Right, List, ListItem  } from 'native-base'

// Component configuration for profile screen -> layout, state data
export default class ProfileScreen extends Component<Props> {
  // Facebook login data status
  state = {
    FBInfoExisted: false,
    FBName: "",
    FBEmail: "",
    FBProfileLink: ""
  }
  // Retrieve login info when loading this page
  componentDidMount() {
    var profileLink;
    AsyncStorage.getItem('USER_FB_INFO', (error,value) => {
        if (!error) { //If there are no errors
            //handle result
            // console.log(value);
            if (value !== null) {
              var json = JSON.parse(value);
              this.setState({
                FBInfoExisted: true,
                FBName: json.name,
                FBEmail: json.email,
                FBProfileLink : json.picture_url
              });
            }
        }
    });
  }
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    // Check if Facebook profile is available
    var profileLink = require("../../assets/Profile/default-profile.png");
    if(this.state.FBInfoExisted) {
      profileLink = { url: this.state.FBProfileLink };
    }
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
          <Body><Title style={ styles.titleStyle }>User Profile</Title></Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={ styles.containerStyle }>
          <Image
            style={ styles.profileImgStyle }
            source={ profileLink }
          />
          <List style={ styles.listStyle }>
            <ListItem itemDivider>
              <Text>Name</Text>
            </ListItem>
            <ListItem>
              <Text>{ this.state.FBName }</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>Email</Text>
            </ListItem>
            <ListItem>
              <Text>{ this.state.FBEmail }</Text>
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
    paddingTop: 40,
    alignItems:'center',
    flex:1
  },
  profileImgStyle: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  listStyle: {
    alignSelf: 'stretch',
    paddingTop: 40
  }
});
