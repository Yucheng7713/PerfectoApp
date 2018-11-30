// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider, AlertIOS } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Input, Title, Left, Right, List, ListItem, Footer } from 'native-base'
import Collapsible from 'react-native-collapsible';

// Component configuration for customize screen -> layout, state...
export default class ExtraScreen extends Component<Props> {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'EXTRA ADD-INS',
    headerLeft: (
      <TouchableOpacity onPress={navigation.getParam('checkEdit')}>
        <Title style={{ color: '#017afe', marginLeft: 10 }}>Cancel</Title>
      </TouchableOpacity>
    ),
  });

  constructor(props) {
     super(props);
     this.listItemCollapse = this.listItemCollapse.bind(this);
     this.resetDefaultExtra = this.resetDefaultExtra.bind(this);
     this.saveExtraPreferences = this.saveExtraPreferences.bind(this);
     this.state = {
       prevScreen: props.navigation.state.routeName,
       cocoaValue: 0,
       cinnamonValue: 0,
       vanillaValue: 0,
       prevCocoaValue: 0,
       prevCinnamonValue: 0,
       prevVanillaValue: 0,
       originalAdds: [],
       toggleCocoa: false,
       toggleCinnamon: false,
       toggleVanilla: false,
     };
  }

  componentDidMount() {
    let extraList = this.props.navigation.state.params.extra;
    this.props.navigation.setParams({ checkEdit: this._didEditCheck });
    for(var i = 0; i < extraList.length; i++) {
      if(extraList[i].name === "Cocoa") {
        this.setState({
          cocoaValue: extraList[i].value,
          prevCocoaValue: extraList[i].value
        });
      } else if(extraList[i].name === "Cinnamon") {
        this.setState({
          cinnamonValue: extraList[i].value,
          prevCinnamonValue: extraList[i].value
        });
      } else if(extraList[i].name === "Vanilla") {
        this.setState({
          vanillaValue: extraList[i].value,
          prevVanillaValue: extraList[i].value
        });
      }
    }
  }

  // List item collapse functions
  listItemCollapse(item) {
    this.setState({
      toggleCocoa: ((item == "Cocoa") && !this.state.toggleCocoa),
      toggleCinnamon: ((item == "Cinnamon") && !this.state.toggleCinnamon),
      toggleVanilla: ((item == "Vanilla") && !this.state.toggleVanilla),
    });
  }

  // Change text to "Add" when there is no scoop added
  addScoopIndicator(value) {
    if(value == 0) {
      return(
        <Text style={{ color: '#017afe' }}>Add</Text>
      );
    }
    return(
        <Text>{ value } scoop(s)</Text>
    );
  }

  // Reset extra preferences back to default
  resetDefaultExtra() {
    this.setState({
      cocoaValue: 0,
      cinnamonValue: 0,
      vanillaValue: 0,
    });
  }

  // Save extra and go back to PreferenceScreen
  saveExtraPreferences() {
    let extraList = [];
    if(this.state.cocoaValue !== 0) {
      extraList.push({
        name: "Cocoa",
        value: this.state.cocoaValue
      });
    }
    if(this.state.cinnamonValue !== 0) {
      extraList.push({
        name: "Cinnamon",
        value: this.state.cinnamonValue
      });
    }
    if(this.state.vanillaValue !== 0) {
      extraList.push({
        name: "Vanilla",
        value: this.state.vanillaValue
      });
    }
    this.props.navigation.navigate("Preference", {
      prevScreen: this.state.prevScreen,
      extra: extraList,
    });
  }

  // Check if any preference is changed or modified
  changeDidMake() {
    if(this.state.prevCocoaValue !== this.state.cocoaValue ||
       this.state.prevCinnamonValue !== this.state.cinnamonValue ||
       this.state.prevVanillaValue !== this.state.vanillaValue) {
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
              <Left><Title>Powders</Title></Left>
              <Right></Right>
            </ListItem>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Cocoa') } }>
              <Left><Title>Cocoa Powder</Title></Left>
              <Right>
                {
                  this.addScoopIndicator(this.state.cocoaValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleCocoa }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 thumbImage={ require('../../../assets/Icons/slider-thumb.png') }
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.cocoaValue}
                 onValueChange={val => this.setState({ cocoaValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Cinnamon') } }>
              <Left><Title>Cinnamon Powder</Title></Left>
              <Right>
                {
                  this.addScoopIndicator(this.state.cinnamonValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleCinnamon }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 thumbImage={ require('../../../assets/Icons/slider-thumb.png') }
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.cinnamonValue}
                 onValueChange={val => this.setState({ cinnamonValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Vanilla') } }>
              <Left><Title>Vanilla Powder</Title></Left>
              <Right>
                {
                  this.addScoopIndicator(this.state.vanillaValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleVanilla }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 thumbImage={ require('../../../assets/Icons/slider-thumb.png') }
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.vanillaValue}
                 onValueChange={val => this.setState({ vanillaValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem itemDivider
            onPress={() => { this.resetDefaultExtra() }}
            style={ styles.resetButtonStyle }>
              <Body>
                <Title>RESET PREFERENCE</Title>
              </Body>
            </ListItem>
          </List>
        </Content>
        <TouchableOpacity onPress={ () => { this.saveExtraPreferences() }}>
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
