// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider, AlertIOS } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Footer, Title, Left, Right, List, ListItem } from 'native-base';
import Collapsible from 'react-native-collapsible';

// Component configuration for settings screen -> layout, state data
export default class FlavorScreen extends Component<Props> {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'FLAVORS',
    headerLeft: (
      <TouchableOpacity onPress={navigation.getParam('checkEdit')}>
        <Title style={{ color: '#017afe', marginLeft: 10 }}>Cancel</Title>
      </TouchableOpacity>
    ),
  });

  // Props Initialization
  constructor(props) {
    super(props);
    this.listItemCollapse = this.listItemCollapse.bind(this);
    this.resetDefaultFlavors = this.resetDefaultFlavors.bind(this);
    this.saveFlavorPreferences = this.saveFlavorPreferences.bind(this);
    // Parameters state
    let params = props.navigation.state.params;
    this.state = {
      prevScreen: props.navigation.state.routeName,
      caramelValue: 0,
      vanillaValue: 0,
      chocoValue: 0,
      pepperValue: 0,
      prevCaramelValue: 0,
      prevVanillaValue: 0,
      prevChocoValue: 0,
      prevPepperValue: 0,
      originalFlavors: params.originalFlavors,
      toggleCaramel: false,
      toggleVanilla: false,
      toggleChocolate: false,
      togglePeppermint: false,
    };
  }

  componentDidMount() {
    // Load default flavor preferences
    let flavorList = this.props.navigation.state.params.flavors;
    console.log(flavorList);
    this.props.navigation.setParams({ checkEdit: this._didEditCheck });

    for(var i = 0; i < flavorList.length; i++) {
      if(flavorList[i].name === "Caramel") {
        this.setState({
          caramelValue: flavorList[i].value,
          prevCaramelValue: flavorList[i].value,
        });
      } else if(flavorList[i].name === "Vanilla") {
        this.setState({
          vanillaValue: flavorList[i].value,
          prevVanillaValue: flavorList[i].value
        });
      } else if(flavorList[i].name === "Chocolate") {
        this.setState({
          chocoValue: flavorList[i].value,
          prevChocoValue: flavorList[i].value
        });
      } else if(flavorList[i].name === "Peppermint"){
        this.setState({
          pepperValue: flavorList[i].value,
          prevPepperValue: flavorList[i].value
        });
      }
    }
  }

  // List item collapse functions
  listItemCollapse(item) {
    this.setState({
      toggleCaramel: ((item == "Caramel") && !this.state.toggleCaramel),
      toggleVanilla: ((item == "Vanilla") && !this.state.toggleVanilla),
      toggleChocolate: ((item == "Chocolate") && !this.state.toggleChocolate),
      togglePeppermint: ((item == "Peppermint") && !this.state.togglePeppermint),
    });
  }

  // Change text to "Add" when there is no pump added
  addPumpIndicator(value) {
    if(value == 0) {
      return(
        <Text style={{ color: '#017afe' }}>Add</Text>
      );
    }
    return(
        <Text>{ value } pump(s)</Text>
    );

  }

  // Reset flavor preferences back to default
  resetDefaultFlavors() {
    AlertIOS.alert(
      'Reset to default preference',
      null,
      [
        {
          text: 'Cancel',
          onPress: this.onPress,
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: () => {
            this.setState({
              caramelValue: 0,
              vanillaValue: 0,
              chocoValue: 0,
              pepperValue: 0,
            });

            let flavorList = this.state.originalFlavors;
            for(var i = 0; i < flavorList.length; i++) {
              if(flavorList[i].name === "Caramel") {
                this.setState({
                  caramelValue: flavorList[i].value
                });
              } else if(flavorList[i].name === "Vanilla") {
                this.setState({
                  vanillaValue: flavorList[i].value
                });
              } else if(flavorList[i].name === "Chocolate") {
                this.setState({
                  chocoValue: flavorList[i].value
                });
              } else if(flavorList[i].name === "Peppermint"){
                this.setState({
                  pepperValue: flavorList[i].value
                });
              }
            }
          },
        },
      ]
    );
  }

  // Save flavor and go back to PreferenceScreen
  saveFlavorPreferences() {
    let flavorList = [];
    if(this.state.caramelValue !== 0) {
      flavorList.push({
        name: "Caramel",
        value: this.state.caramelValue
      });
    }
    if(this.state.vanillaValue !== 0) {
      flavorList.push({
        name: "Vanilla",
        value: this.state.vanillaValue
      });
    }
    if(this.state.chocoValue !== 0) {
      flavorList.push({
        name: "Chocolate",
        value: this.state.chocoValue
      });
    }
    if(this.state.pepperValue !== 0) {
      flavorList.push({
        name: "Peppermint",
        value: this.state.pepperValue
      });
    }

    this.props.navigation.navigate("Preference", {
      prevScreen: this.state.prevScreen,
      flavors: flavorList,
    });
  }

  // Check if any preference is changed or modified
  changeDidMake() {
    if(this.state.prevCaramelValue !== this.state.caramelValue ||
       this.state.prevVanillaValue !== this.state.vanillaValue ||
       this.state.prevChocoValue !== this.state.chocoValue ||
       this.state.prevPepperValue !== this.state.pepperValue) {
         return true;
       }
    return false;
  }

  _didEditCheck = () => {
    if(this.changeDidMake()) {
      AlertIOS.alert(
        'Discard Change',
        null,
        [
          {
            text: 'Cancel',
            onPress: this.onPress,
            style: 'cancel',
          },
          {
            text: 'Discard',
            onPress: () => this.props.navigation.goBack(),
          },
        ]
      );
    } else {
      this.props.navigation.goBack();
    }
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Content>
          <List style={{ alignSelf: 'stretch' }}>
            <ListItem itemDivider
            style={ styles.listItemStyle }>
              <Left><Title>Syrups</Title></Left>
              <Right></Right>
            </ListItem>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Caramel') } }>
              <Left><Title>Caramel Syrup</Title></Left>
              <Right>
                {
                  this.addPumpIndicator(this.state.caramelValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleCaramel }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.caramelValue}
                 onValueChange={val => this.setState({ caramelValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Vanilla') } }>
              <Left><Title>Vanilla Syrup</Title></Left>
              <Right>
                {
                  this.addPumpIndicator(this.state.vanillaValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleVanilla }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.vanillaValue}
                 onValueChange={val => this.setState({ vanillaValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Chocolate') } }>
              <Left><Title>Chocolate Syrup</Title></Left>
              <Right>
                {
                  this.addPumpIndicator(this.state.chocoValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleChocolate }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.chocoValue}
                 onValueChange={val => this.setState({ chocoValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Peppermint') } }>
              <Left><Title>Peppermint Syrup</Title></Left>
              <Right>
                {
                  this.addPumpIndicator(this.state.pepperValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.togglePeppermint }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.pepperValue}
                 onValueChange={val => this.setState({ pepperValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem itemDivider
            onPress={() => { this.resetDefaultFlavors() }}
            style={ styles.resetButtonStyle }>
              <Body>
                <Title>RESET PREFERENCE</Title>
              </Body>
            </ListItem>
          </List>
        </Content>
        <TouchableOpacity onPress={ () => { this.saveFlavorPreferences() }}>
          <Footer style={ styles.bottomTabStyle }>
              <Body style={ styles.bottomTabBodyStyle }>
                <Title>Save</Title>
              </Body>
          </Footer>
        </TouchableOpacity>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0,
  },
  resetButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0,
  },
  bottomTabStyle: {
    height: 40,
    backgroundColor: 'rgba(0,44,54,0.3)'
  },
  bottomTabBodyStyle: {
    justifyContent: 'center'
  }
});
