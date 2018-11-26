// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Footer, Title, Left, Right, Segment, Card, CardItem, List, ListItem } from 'native-base';
import Collapsible from 'react-native-collapsible';
import { ShareDialog } from 'react-native-fbsdk';

export default class DetailScreen extends Component<Props> {

  // Header title and back button customization
  static navigationOptions = ({ navigation, screenProps}) => ({
    title: navigation.state.params.detailInfo.name,
  });

  constructor(props) {
    super(props);
    this.icons = {     //Step 2
      'up': require('../../../assets/Icons/arrowup_myrecipes_icon.png'),
      'down': require('../../../assets/Icons/arrowdown_myrecipes_icon.png')
    };
    // const shareLinkContent = {
    //   contentType: 'link',
    //   contentUrl: "https://greenbay.usc.edu/csci577/fall2018/projects/team05/",
    //   contentDescription: 'Check out my own coffee!',
    // };
    let recipe = props.navigation.state.params.detailInfo;
    this.state = {
      chosenRecipe: recipe,
      milkAvailable: (recipe.milkChoice !== null),
      flavorsAvailable: (recipe.flavors.length !== 0),
      sweetnersAvailable: (recipe.sweetners.length !== 0),
      extraAvailable: (recipe.extra.length !== 0),
      toggleMilk: false,
      toggleFlavors: false,
      toggleSweetners: false,
      toggleExtra: false,
    }
  }

  componentDidMount() {
    console.log(this.state.extraAvailable);
  }

  // Share the link using the share dialog.
  // shareLinkWithShareDialog() {
  //   // Share using the share API.
  //   var tmp = this;
  //   ShareDialog.canShow(this.state.shareLinkContent).then(
  //     function(canShow) {
  //       if (canShow) {
  //         return ShareDialog.show(tmp.state.shareLinkContent);
  //       }
  //     }
  //   ).then(
  //     function(result) {
  //       if (result.isCancelled) {
  //         console.log('Share cancelled');
  //         Toast.show({
  //           text: 'Share cancelled!',
  //           buttonText: 'Okay'
  //         });
  //       } else {
  //         console.log('Share success with postId: '
  //           + result.postId);
  //         Toast.show({
  //           text: 'Share posted!',
  //           buttonText: 'Okay'
  //         });
  //       }
  //     },
  //     function(error) {
  //       console.log('Share fail with error: ' + error);
  //     }
  //   );
  // }

  // List item collapse functions
  listItemCollapse(item) {
    this.setState({
      toggleMilk: ((item == "milk") && !this.state.toggleMilk),
      toggleFlavors: ((item == "flavors") && !this.state.toggleFlavors),
      toggleSweetners: ((item == "sweetners") && !this.state.toggleSweetners),
      toggleExtra: ((item == "extra") && !this.state.toggleExtra),
    });
  }
  // Change arrow indicators when list items get collapsed
  toggleIndicator(toggle) {
    if(toggle) {
      return this.icons['up'];
    }
    return this.icons['down'];
  }

  // Generate collapsed content dynamically
  generateFlavorContent() {
    let flavorList = [];
    let recipeFlavors = this.state.chosenRecipe.flavors;
    for(var i = 0; i < recipeFlavors.length ; i++){
      flavorList.push(
        <ListItem key={ 'flavor_' + i }>
          <Left><Title>{ recipeFlavors[i].name }</Title></Left>
          <Text>{ recipeFlavors[i].value } pump(s)</Text>
        </ListItem>
      );
    }
    return(flavorList);
  }

  generateSweetnerContent() {
    let sweetnerList = [];
    let sweetners = this.state.chosenRecipe.sweetners;
    for(var i = 0; i < sweetners.length ; i++){
      sweetnerList.push(
        <ListItem key={ 'sweetner_' + i }>
          <Left><Title>{ sweetners[i].name }</Title></Left>
          <Text>{ sweetners[i].value } packet(s)</Text>
        </ListItem>
      );
    }
    return(sweetnerList);
  }

  generateExtraContent() {
    let extraList = [];
    let extras = this.state.chosenRecipe.extra;
    for(var i = 0; i < extras.length ; i++){
      extraList.push(
        <ListItem key={ 'extra_' + i }>
          <Left><Title>{ extras[i].name }</Title></Left>
          <Text>{ extras[i].value } scoop(s)</Text>
        </ListItem>
      );
    }
    return(extraList);
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Image style={ styles.baseImgStyle } source={ { uri : this.state.chosenRecipe.img } } />
                <Title>{ this.state.chosenRecipe.name }</Title>
              </Left>
              <Right></Right>
            </CardItem>
          </Card>
          <Card>
            <List style={{ alignSelf: 'stretch' }}>
              <ListItem itemDivider
              style={ styles.listItemStyle }>
                <Left><Title>Base Flavor</Title></Left>
                <Text>{ this.state.chosenRecipe.base }</Text>
              </ListItem>
              <ListItem itemDivider
              style={ styles.listItemStyle }>
                <Left><Title>Size</Title></Left>
                <Text>{ this.state.chosenRecipe.size }</Text>
              </ListItem>
              { this.state.milkAvailable &&
                <ListItem itemDivider
                style={ styles.listItemStyle }
                onPress={ () => { this.listItemCollapse('milk') } }>
                  <Left><Title>Milk Preferences</Title></Left>
                  <Right><Image style={{ height: 30, width: 30 }} source={ this.toggleIndicator(this.state.toggleMilk) }/></Right>
                </ListItem>
              }
              <Collapsible collapsed={ !this.state.toggleMilk }>
                <ListItem>
                  <Left><Title>Milk Choice</Title></Left>
                  <Text>{ this.state.chosenRecipe.milkChoice }</Text>
                </ListItem>
                <ListItem>
                  <Left><Title>Portion</Title></Left>
                  <Text>{ this.state.chosenRecipe.milkPortion } oz</Text>
                </ListItem>
                <ListItem>
                  <Left><Title>Temp</Title></Left>
                  <Text>{ this.state.chosenRecipe.milkTemp }</Text>
                </ListItem>
                <ListItem>
                  <Left><Title>Cream</Title></Left>
                  <Text>{ this.state.chosenRecipe.foam }</Text>
                </ListItem>
              </Collapsible>
              { this.state.flavorsAvailable &&
              <ListItem itemDivider
              style={ styles.listItemStyle }
              onPress={() => { this.listItemCollapse('flavors') } }>
                <Left><Title>Flavors</Title></Left>
                <Right><Image style={{ height: 30, width: 30 }} source={ this.toggleIndicator(this.state.toggleFlavors) }/></Right>
              </ListItem>
              }
              <Collapsible collapsed={ !this.state.toggleFlavors }>
              {
                this.generateFlavorContent()
              }
              </Collapsible>
              { this.state.sweetnersAvailable &&
                <ListItem itemDivider
                style={ styles.listItemStyle }
                onPress={() => { this.listItemCollapse('sweetners') } }>
                  <Left><Title>Sweetners</Title></Left>
                  <Right><Image style={{ height: 30, width: 30 }} source={ this.toggleIndicator(this.state.toggleSweetners) }/></Right>
                </ListItem>
              }
              <Collapsible collapsed={ !this.state.toggleSweetners }>
              {
                this.generateSweetnerContent()
              }
              </Collapsible>
              { this.state.extraAvailable &&
                <ListItem itemDivider
                style={ styles.listItemStyle }
                onPress={() => { this.listItemCollapse('extra') } }>
                  <Left><Title>Extra Add-ins</Title></Left>
                  <Right><Image style={{ height: 30, width: 30 }} source={ this.toggleIndicator(this.state.toggleExtra) }/></Right>
                </ListItem>
              }
              <Collapsible collapsed={ !this.state.toggleExtra }>
              {
                this.generateExtraContent()
              }
              </Collapsible>
            </List>
          </Card>
        </Content>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  listItemStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  cupSizeTabStyle: {
    width: 110,
    flexDirection: 'column',
    justifyContent: "center"
  },
  baseImgStyle: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  text: {
    fontSize: 50,
  },
  bottomTabStyle: {
    height: 40,
    backgroundColor: 'rgba(0,44,54,0.3)'
  },
  bottomTabBodyStyle: {
    justifyContent: 'center'
  },
});
