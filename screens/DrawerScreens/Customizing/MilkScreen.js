// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider, AlertIOS } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Footer, Title, Left, Right, Segment, Card, CardItem, List, ListItem } from 'native-base';
import Collapsible from 'react-native-collapsible';

// Component configuration for settings screen -> layout, state data
export default class MilkScreen extends Component<Props> {
  // Header title and back button customization
  static navigationOptions = ({ navigation, screenProps}) => ({
    title: "MILK",
    headerLeft: (
      <TouchableOpacity onPress={() => {
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
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }}>
          <Title style={{ color: '#017afe', marginLeft: 10 }}>Cancel</Title>
      </TouchableOpacity>
    ),
  });

  // Props Initialization
  constructor(props) {
    super(props);
    this.setMilkSegment = this.setMilkSegment.bind(this); // Milk choice segment tabs
    this.setTempSegment = this.setTempSegment.bind(this); // Milk temp segment tabs
    this.listItemCollapse = this.listItemCollapse.bind(this); // Listitem collapse function
    // Parameters state
    let params = props.navigation.state.params;
    this.state = {
      prevScreen: props.navigation.state.routeName,
      milkType: params.milkChoice,
      wholeMilkSelected: (params.milkChoice == 'Whole'),
      skimMilkSelected: (params.milkChoice == 'Skim'),
      soyMilkSelected: (params.milkChoice == 'Soy'),
      almondMilkSelected: (params.milkChoice == 'Almond'),
      milkValue: params.milkPortion,
      tempLevel: params.milkTemp,
      warmSelected: (params.milkTemp == 'Warm'),
      extraHotSelected: (params.milkTemp == 'Extra Hot'),
      steamedSelected: (params.milkTemp == 'Steamed'),
      foamValue: params.foamPortion,
      originalMilk: params.originalMilk,
      toggleMilkChoice: false,
      toggleMilkPortion: false,
      toggleFoamPortion: false,
      toggleTempLevel: false,
      didEdit: false,
    };
  }

  // Function for setting milk choice
  setMilkSegment(type) {
    this.setState({
      milkType: type,
      milkValue: this.state.milkValue,
      foamValue: this.state.foamValue,
      wholeMilkSelected: (type == "Whole"),
      skimMilkSelected: (type == "Skim"),
      soyMilkSelected: (type == "Soy"),
      almondMilkSelected: (type == "Almond"),
      toggleMilkChoice: false,
      didEdit: true,
    });
  }

  // Functions for setting temperature
  setTempSegment(temp) {
    this.setState({
      tempLevel: temp,
      warmSelected: (temp == "Warm"),
      extraHotSelected: (temp == "Extra Hot"),
      steamedSelected: (temp == "Steamed"),
      toggleTempLevel: false,
      didEdit: true,
    });
  }

  // List item collapse functions
  listItemCollapse(item) {
    this.setState({
      toggleMilkChoice: ((item == "milkChoice") && !this.state.toggleMilkChoice),
      toggleMilkPortion: ((item == "milkPortion") && !this.state.toggleMilkPortion),
      toggleTempLevel: ((item == "milkTemp") && !this.state.toggleTempLevel),
      toggleFoamPortion: ((item == "milkFoam") && !this.state.toggleFoamPortion),
    });
  }

  // Reset milk preferences back to default
  resetDefaultMilk() {
    let origin = this.state.originalMilk;
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
              milkType: origin['Type'],
              wholeMilkSelected: (origin['Type'] == 'Whole'),
              skimMilkSelected: (origin['Type'] == 'Skim'),
              soyMilkSelected: (origin['Type'] == 'Soy'),
              almondMilkSelected: (origin['Type'] == 'Almond'),
              milkValue: origin['Portion'],
              tempLevel: origin['Temp'],
              warmSelected: (origin['Temp'] == 'Warm'),
              extraHotSelected: (origin['Temp'] == 'Extra Hot'),
              steamedSelected: (origin['Temp'] == 'Steamed'),
              foamValue: origin['Cream'],
            });
          },
        },
      ]
    );
  }

  // Save milk PreferenceScreen
  saveMilkPreferences() {
      this.props.navigation.navigate("Preference", {
        prevScreen: this.state.prevScreen,
        milkChoice: this.state.milkType,
        milkPortion: this.state.milkValue,
        milkTemp: this.state.tempLevel,
        foamPortion: this.state.foamValue
      });
  }

  // Check if any preference is modified
  // changeDidMake() {
  //   if(this.state.previousMilk.milkType !== this.state.milkType ||
  //      this.state.previousMilk.milkValue !== this.state.milkValue ||
  //      this.state.previousMilk.tempLevel !== this.state.tempLevel ||
  //      this.state.previousMilk.foamValue !== this.state.foamValue) {
  //        return true;
  //      }
  //   return false;
  // }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Content>
          <List style={{ alignSelf: 'stretch' }}>
            <ListItem itemDivider
            style={ styles.listItemStyle }>
              <Left><Title>Milk</Title></Left>
              <Right></Right>
            </ListItem>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('milkChoice') } }>
              <Left><Title>Choices</Title></Left>
              <Right><Text>{ this.state.milkType }</Text></Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleMilkChoice }>
              <ListItem>
                <Segment>
                  <Button first
                  active={ this.state.wholeMilkSelected }
                  style={ styles.milkTypeTabStyle }
                  onPress={ () => { this.setMilkSegment('Whole') } }>
                    <Text>Whole</Text>
                  </Button>
                  <Button
                  active={ this.state.skimMilkSelected }
                  style={ styles.milkTypeTabStyle }
                  onPress={ () => { this.setMilkSegment('Skim') } }>
                    <Text>Skim</Text>
                  </Button>
                  <Button
                  active={ this.state.soyMilkSelected }
                  onPress= { () => { this.setMilkSegment('Soy') } }
                  style={ styles.milkTypeTabStyle }>
                    <Text>Soy</Text>
                  </Button>
                  <Button last
                  active={this.state.almondMilkSelected}
                  onPress= { () => { this.setMilkSegment('Almond') } }
                  style={ styles.milkTypeTabStyle }>
                    <Text>Almond</Text>
                  </Button>
                </Segment>
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('milkPortion') } }>
              <Left><Title>Portions</Title></Left>
              <Right><Text>{ this.state.milkValue } oz</Text></Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleMilkPortion }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={0.5}
                 minimumValue={0.5}
                 maximumValue={2.5}
                 value={this.state.milkValue}
                 onValueChange={val => this.setState({ milkValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('milkTemp') } }>
              <Left><Title>Temp</Title></Left>
              <Right><Text>{ this.state.tempLevel }</Text></Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleTempLevel }>
              <ListItem>
                <Segment>
                  <Button first
                  active={ this.state.warmSelected }
                  style={ styles.tempLevelTabStyle }
                  onPress= { () => { this.setTempSegment('Warm') } }>
                    <Text>Warm</Text>
                  </Button>
                  <Button
                  active={ this.state.extraHotSelected }
                  style={ styles.tempLevelTabStyle }
                  onPress= { () => { this.setTempSegment('Extra Hot') } }>
                    <Text>Extra Hot</Text>
                  </Button>
                  <Button last
                  active={ this.state.steamedSelected }
                  style={ styles.tempLevelTabStyle }
                  onPress= { () => { this.setTempSegment('Steamed') } }>
                    <Text>Steamed</Text>
                  </Button>
                </Segment>
              </ListItem>
            </Collapsible>
            <ListItem itemDivider
            style={ styles.listItemStyle }>
              <Left><Title>Foam</Title></Left>
              <Right><Text></Text></Right>
            </ListItem>
            <ListItem
            style={ styles.listItemStyle }
            onPress={ () => { this.listItemCollapse('milkFoam') } }>
              <Left><Title>Volume</Title></Left>
              <Right><Text>{ this.state.foamValue } oz</Text></Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleFoamPortion }>
              <ListItem>
                <Slider
                 style={{ width: 340 }}
                 step={0.5}
                 minimumValue={0.5}
                 maximumValue={2.5}
                 value={this.state.foamValue}
                 onValueChange={val => this.setState({ foamValue: val, didEdit: true })}
                />
              </ListItem>
            </Collapsible>
            <ListItem itemDivider
            onPress={() => { this.resetDefaultMilk() }}
            style={ styles.resetButtonStyle }>
              <Body>
                <Title>RESET PREFERENCE</Title>
              </Body>
            </ListItem>
          </List>
        </Content>
        <TouchableOpacity onPress={ () => { this.saveMilkPreferences() }}>
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
  milkTypeTabStyle: {
    width: 87,
    justifyContent: "center"
  },
  tempLevelTabStyle: {
    width: 116,
    justifyContent: "center"
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
  },
});
