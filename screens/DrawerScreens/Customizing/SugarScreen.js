// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider, AlertIOS } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Footer, Title, Left, Right, List, ListItem } from 'native-base';
import Collapsible from 'react-native-collapsible';

// Component configuration for settings screen -> layout, state data
export default class SugarScreen extends Component<Props> {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'SWEETNERS',
    headerLeft: (
      <TouchableOpacity onPress={navigation.getParam('checkEdit')}>
        <Title style={{ color: '#017afe', marginLeft: 10 }}>Cancel</Title>
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.listItemCollapse = this.listItemCollapse.bind(this);
    this.resetDefaultSweeteners = this.resetDefaultSweeteners.bind(this);
    this.saveSweetnerPreferences = this.saveSweetnerPreferences.bind(this);
    this.state = {
      prevScreen: props.navigation.state.routeName,
      sugarValue: 0,
      honeyValue: 0,
      rawValue: 0,
      equalValue: 0,
      prevSugarValue: 0,
      prevHoneyValue: 0,
      prevRawValue: 0,
      prevEqualValue: 0,
      toggleSugar: false,
      toggleHoney: false,
      toggleRaw: false,
      toggleEqual: false,
    };
  }

  componentDidMount() {
    let sugarList = this.props.navigation.state.params.sweetners;
    this.props.navigation.setParams({ checkEdit: this._didEditCheck });
    for(var i = 0; i < sugarList.length; i++) {
      if(sugarList[i].name === "Sugar") {
        this.setState({
          sugarValue: sugarList[i].value,
          prevSugarValue: sugarList[i].value
        });
      } else if(sugarList[i].name === "Equal") {
        this.setState({
          equalValue: sugarList[i].value,
          prevEqualValue: sugarList[i].value
        });
      } else if(sugarList[i].name === "Raw") {
        this.setState({
          rawValue: sugarList[i].value,
          prevRawValue: sugarList[i].value
        });
      } else if(sugarList[i].name === "Honey"){
        this.setState({
          honeyValue: sugarList[i].value,
          prevHoneyValue: sugarList[i].value
        });
      }
    }
  }

  // Change text to "Add" when there is no pump added
  addPackIndicator(value) {
    if(value == 0) {
      return(
        <Text style={{ color: '#017afe' }}>Add</Text>
      );
    }
    return(
        <Text>{ value } packet(s)</Text>
    );
  }

  // List item collapse functions
  listItemCollapse(item) {
    this.setState({
      toggleSugar: ((item == "Sugar") && !this.state.toggleSugar),
      toggleHoney: ((item == "Honey") && !this.state.toggleHoney),
      toggleRaw: ((item == "Raw") && !this.state.toggleRaw),
      toggleEqual: ((item == "Equal") && !this.state.toggleEqual),
    });
  }

  // Reset sweetner preferences back to default
  resetDefaultSweeteners() {
    this.setState({
      sugarValue: 0,
      honeyValue: 0,
      rawValue: 0,
      equalValue: 0,
    });
  }

  // Save sweetners and back to PreferenceScreen
  saveSweetnerPreferences() {
    let sugarList = [];
    if(this.state.sugarValue !== 0) {
      sugarList.push({
        name: "Sugar",
        value: this.state.sugarValue
      });
    }
    if(this.state.equalValue !== 0) {
      sugarList.push({
        name: "Equal",
        value: this.state.equalValue
      });
    }
    if(this.state.rawValue !== 0) {
      sugarList.push({
        name: "Raw",
        value: this.state.rawValue
      });
    }
    if(this.state.honeyValue !== 0) {
      sugarList.push({
        name: "Honey",
        value: this.state.honeyValue
      });
    }

    this.props.navigation.navigate("Preference", {
      prevScreen: this.state.prevScreen,
      sweetners: sugarList,
    });
  }

  // Check if any preference is changed or modified
  changeDidMake() {
    if(this.state.prevSugarValue !== this.state.sugarValue ||
       this.state.prevEqualValue !== this.state.equalValue ||
       this.state.prevRawValue !== this.state.rawValue ||
       this.state.prevHoneyValue !== this.state.honeyValue) {
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
              <Left><Title>Sweeteners</Title></Left>
              <Right></Right>
            </ListItem>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Sugar') } }>
              <Left><Title>Sugar</Title></Left>
              <Right>
                {
                  this.addPackIndicator(this.state.sugarValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleSugar }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.sugarValue}
                 onValueChange={val => this.setState({ sugarValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Equal') } }>
              <Left><Title>Equal®</Title></Left>
              <Right>
                {
                  this.addPackIndicator(this.state.equalValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleEqual }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.equalValue}
                 onValueChange={val => this.setState({ equalValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Raw') } }>
              <Left><Title>Sugar in the Raw®</Title></Left>
              <Right>
                {
                  this.addPackIndicator(this.state.rawValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleRaw }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.rawValue}
                 onValueChange={val => this.setState({ rawValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('Honey') } }>
              <Left><Title>Honey</Title></Left>
              <Right>
                {
                  this.addPackIndicator(this.state.honeyValue)
                }
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleHoney }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={1}
                 minimumValue={0}
                 maximumValue={4}
                 value={this.state.honeyValue}
                 onValueChange={val => this.setState({ honeyValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem itemDivider
            onPress={() => { this.resetDefaultSweeteners() }}
            style={ styles.resetButtonStyle }>
              <Body>
                <Title>RESET PREFERENCE</Title>
              </Body>
            </ListItem>
          </List>
        </Content>
        <TouchableOpacity onPress={ () => { this.saveSweetnerPreferences() }}>
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
