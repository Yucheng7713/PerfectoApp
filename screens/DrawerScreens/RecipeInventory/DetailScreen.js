// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, List, ListItem, Fab, Toast} from 'native-base';
import { ShareDialog } from 'react-native-fbsdk';

export default class DetailScreen extends Component<Props> {

  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://greenbay.usc.edu/csci577/fall2018/projects/team05/",
      contentDescription: 'Check out my own coffee!',
    };
    this.state = {
      detail: this.props.navigation.state.params.detailInfo,
      active: false,
      shareLinkContent: shareLinkContent,
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  syrupPreGenerator(syrupArray) {
    let syrups = [];
    let syrupLength = syrupArray.length;
    if( syrupLength > 0 ) {
        for(var i = 0; i < syrupLength; i++ ) {
          syrups.push(
            <ListItem>
              <Left><Text>{ syrupArray[i].name }</Text></Left>
              <Right><Text>{ syrupArray[i].ratio } oz.</Text></Right>
            </ListItem>
          );
        }
        return syrups;
    }
  }

  powderPreGenerator(powderArray) {
    let powders = [];
    let powderLength = powderArray.length;
    if( powderLength > 0 ) {
        for(var i = 0; i < powderLength; i++ ) {
          powders.push(
            <ListItem>
              <Left><Text>{ powderArray[i].name }</Text></Left>
              <Right><Text>{ powderArray[i].ratio } oz.</Text></Right>
            </ListItem>
          );
        }
        return powders;
    }
  }

  ifGranulated(granulated) {
      if(granulated) {
        return 'Yes';
      }
      return 'No';
  }

  // Share the link using the share dialog.
  shareLinkWithShareDialog() {
    // Share using the share API.
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
          Toast.show({
            text: 'Share cancelled!',
            buttonText: 'Okay'
          });
        } else {
          console.log('Share success with postId: '
            + result.postId);
          Toast.show({
            text: 'Share posted!',
            buttonText: 'Okay'
          });
        }
      },
      function(error) {
        console.log('Share fail with error: ' + error);
      }
    );
  }
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "transparent" }}
        iosBarStyle={"light-content"}
        transparent
        >
          <Left>
            <Icon name='ios-arrow-back' onPress={ () => { this.props.navigation.navigate("RecipeList"); } }/>
          </Left>
          <Body><Title style={ { width: 300 } }>{ this.state.detail.name }</Title></Body>
          <Right>
          </Right>
        </Header>
        <ScrollView>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
        }}>
          <List style={{ alignSelf: 'stretch' }}>
            <ListItem itemDivider>
              <Left><Title>Milk Preferences</Title></Left>
            </ListItem>
            { this.state.detail.milkType &&
            <ListItem>
              <Left><Text>Type of Milk</Text></Left>
              <Right><Text>{ this.state.detail.milkType }</Text></Right>
            </ListItem>
            }
            { this.state.detail.milkType &&
              <ListItem>
                <Left><Text>Portion</Text></Left>
                <Right><Text>{ this.state.detail.milkRatio } oz.</Text></Right>
              </ListItem>
            }
            { this.state.detail.milkType &&
              <ListItem>
                <Left><Text>Cream</Text></Left>
                <Right><Text>{ this.state.detail.creamRatio } oz.</Text></Right>
              </ListItem>
            }
            <ListItem itemDivider>
              <Left><Title>Syrup Preferences</Title></Left>
            </ListItem>
            {
              this.syrupPreGenerator( this.props.navigation.state.params.detailInfo.syrupGenre )
            }
            <ListItem itemDivider>
              <Left><Title>Sugar Preferences</Title></Left>
            </ListItem>
            { this.state.detail.sugarType &&
              <ListItem>
                <Left><Text>Type of Sugar</Text></Left>
                <Right><Text>{ this.state.detail.sugarType }</Text></Right>
              </ListItem>
            }
            { this.state.detail.sugarType &&
              <ListItem>
                <Left><Text>Portion</Text></Left>
                <Right><Text>{ this.state.detail.sugarRatio } oz.</Text></Right>
              </ListItem>
            }
            { this.state.detail.sugarType &&
              <ListItem>
                <Left><Text>Granulated?</Text></Left>
                <Right><Text>{ this.ifGranulated(this.state.detail.sugarGrunted) }</Text></Right>
              </ListItem>
            }
            <ListItem itemDivider>
              <Left><Title>Extra Adds-on</Title></Left>
            </ListItem>
            {
              this.powderPreGenerator( this.props.navigation.state.params.detailInfo.powderGenre )
            }
          </List>
          </Content>
        </ScrollView>
        <Fab
          active={this.state.active}
          direction="down"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="topRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="ios-share-alt" />
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}
          onPress={() => this.shareLinkWithShareDialog() }
          >
            <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <Icon name="mail" />
          </Button>
        </Fab>
      </Container>
    );
  }
}
