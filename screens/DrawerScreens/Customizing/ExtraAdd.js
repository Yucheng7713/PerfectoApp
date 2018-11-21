// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider, Switch, AsyncStorage } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Input, Title, Left, Right, Segment, Card, CardItem, ListItem, CheckBox, Toast } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';

// Component configuration for customize screen -> layout, state...
export default class ExtraAdd extends Component<Props> {

  constructor(props) {
     super(props);
     this.selectNoneSugar = this.selectNoneSugar.bind(this);
     this.selectWhiteSugar = this.selectWhiteSugar.bind(this);
     this.selectBrownSugar = this.selectBrownSugar.bind(this);
     this.selectSubSugar = this.selectSubSugar.bind(this);
     this.selectCocoa = this.selectCocoa.bind(this);
     this.selectCinnamon = this.selectCinnamon.bind(this);
     this.state = {
       recipeName: this.props.navigation.state.params.baseOptions.name,
       sugarType: null,
       sugarValue: null,
       cocoaValue: null,
       cinnamonValue: null,
       noneSugarSelected: true,
       whiteSugarSelected: false,
       brownSugarSelected: false,
       sugarAvailable: false,
       granulatedAvail: false,
       subSugarSelected: false,
       grundedSelected: false,
       cocoaSelected: false,
       cinnamonSelected: false
     };
  }

  selectNoneSugar() {
    this.setState({
      sugarType: null,
      sugarValue: 0,
      sugarAvailable: false,
      granulatedAvail: false,
      noneSugarSelected: true,
      whiteSugarSelected: false,
      brownSugarSelected: false,
      subSugarSelected: false,
    });
  }

  selectWhiteSugar() {
    this.setState({
      sugarType: "White",
      sugarValue: this.state.sugarValue,
      granulatedAvail: true,
      sugarAvailable: true,
      noneSugarSelected: false,
      whiteSugarSelected: true,
      brownSugarSelected: false,
      subSugarSelected: false,
    });
  }

  selectBrownSugar() {
    this.setState({
      sugarType: "Brown",
      sugarValue: this.state.sugarValue,
      granulatedAvail: true,
      sugarAvailable: true,
      noneSugarSelected: false,
      whiteSugarSelected: false,
      brownSugarSelected: true,
      subSugarSelected: false,
    });
  }

  selectSubSugar() {
    this.setState({
      sugarType: "Sub",
      sugarValue: this.state.sugarValue,
      sugarAvailable: true,
      granulatedAvail: false,
      noneSugarSelected: false,
      whiteSugarSelected: false,
      brownSugarSelected: false,
      subSugarSelected: true,
    });
  }

  selectCocoa() {
      this.setState({
          cocoaSelected: !this.state.cocoaSelected,
          cocoaValue: 0
      });
  }

  selectCinnamon() {
      this.setState({
          cinnamonSelected: !this.state.cinnamonSelected,
          cinnamonValue: 0
      });
  }

  saveRecipe() {
    // Save powder preferences
    let powder = [];
    if(this.state.cocoaSelected) {
      powder.push({
        name: "Cocoa Powder",
        ratio: this.state.cocoaValue
      })
    }
    if(this.state.cinnamonSelected) {
      powder.push({
        name: "Cinnamon Powder",
        ratio: this.state.cinnamonValue
      })
    }

    // Form the customized recipe object
    const customRecipe = {
        name: this.state.recipeName,
        base: this.props.navigation.state.params.baseOptions.name,
        img: this.props.navigation.state.params.baseOptions.img,
        size: this.props.navigation.state.params.size,
        milkType: this.props.navigation.state.params.milkType,
        milkRatio: this.props.navigation.state.params.milkRatio,
        creamRatio: this.props.navigation.state.params.creamRatio,
        syrupGenre: this.props.navigation.state.params.syrup,
        sugarType: this.state.sugarType,
        sugarRatio: this.state.sugarValue,
        sugarGrunted: this.state.grundedSelected,
        powderGenre: powder
    };
    // Store the customized recipe locally
    AsyncStorage.getItem("Recipes", (error,res) => {
          if (!error) {
              //handle result
              if (res !== null) {
                var recipesList = JSON.parse(res);
                recipesList.customList.push(customRecipe);
                console.log(recipesList);
                AsyncStorage.setItem("Recipes", JSON.stringify(recipesList));
                this.props.navigation.navigate("BaseFlavor");
              }
          }
    });
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Image style={ styles.baseImgStyle } source={ { uri : this.props.navigation.state.params.baseOptions.img } } />
              <Input
              style={{ width: 200 }}
              placeholder={ this.state.recipeName }
              placeholderTextColor="#808080"
              onChangeText={(textValue) => this.state.recipeName = textValue}/>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Title>Sugar</Title>
            </CardItem>
            <CardItem>
              <Segment>
                <Button first
                active={ this.state.noneSugarSelected }
                style={ styles.sugarTabStyle }
                onPress= { this.selectNoneSugar }>
                  <Text>None</Text>
                </Button>
                <Button
                active={ this.state.whiteSugarSelected }
                style={ styles.sugarTabStyle }
                onPress= { this.selectWhiteSugar }>
                  <Text>White</Text>
                </Button>
                <Button
                active={ this.state.brownSugarSelected }
                style={ styles.sugarTabStyle }
                onPress= { this.selectBrownSugar }>
                  <Text>Brown</Text>
                </Button>
                <Button last
                active={ this.state.subSugarSelected }
                onPress= { this.selectSubSugar }
                style={ styles.sugarTabStyle }>
                  <Text>Substitute</Text>
                </Button>
              </Segment>
            </CardItem>
            { this.state.sugarAvailable &&
            <CardItem>
              <Left><Title style={{fontSize: 15}}>Amount</Title></Left>
              <Slider
               style={{ width: 200 }}
               step={0.5}
               minimumValue={0}
               maximumValue={2}
               value={this.state.sugarValue}
               onValueChange={val => this.setState({ sugarValue: val })}
              />
              <Right><Title style={{fontSize: 15}}>{this.state.sugarValue} oz</Title></Right>
            </CardItem>
            }
            { this.state.granulatedAvail &&
            <CardItem>
              <Left><Title style={{fontSize: 15}}>Granulated</Title></Left>
              <Right>
                <Switch
                onValueChange={(value) => this.setState({grundedSelected: value})}
                value={this.state.grundedSelected} />
              </Right>
            </CardItem>
            }
          </Card>
          <Card>
            <CardItem>
              <Title>Extra Adds</Title>
            </CardItem>
            <CardItem>
              <Left>
                <ListItem onPress={ () => { this.selectCocoa() } }>
                  <CheckBox checked={ this.state.cocoaSelected } onPress={ () => { this.selectCocoa() } } color="brown"/>
                </ListItem>
                <Title>   Cocoa Powder</Title>
              </Left>
              <Right>
              { this.state.cocoaSelected &&
                <Title style={ { fontSize: 20 } }>{ this.state.cocoaValue + " oz "} </Title>
              }
              </Right>
            </CardItem>
            { this.state.cocoaSelected &&
              <CardItem>
                <Left><Title style={{fontSize: 15}}>Amount</Title></Left>
                <Slider
                 style={{ width: 250 }}
                 step={0.5}
                 minimumValue={0}
                 maximumValue={2}
                 value={this.state.cocoaValue}
                 onValueChange={val => this.setState({ cocoaValue: val })}
                />
              </CardItem>
            }
            <CardItem>
              <Left>
                <ListItem onPress={ () => { this.selectCinnamon() } }>
                  <CheckBox checked={ this.state.cinnamonSelected } onPress={ () => { this.selectCinnamon() } } color="green"/>
                </ListItem>
                <Title>   Cinnamon Powder</Title>
              </Left>
              <Right>
              { this.state.cinnamonSelected &&
                <Title style={ { fontSize: 20 } }>{ this.state.cinnamonValue + " oz "} </Title>
              }
              </Right>
            </CardItem>
            { this.state.cinnamonSelected &&
              <CardItem>
                <Left><Title style={{fontSize: 15}}>Amount</Title></Left>
                <Slider
                 style={{ width: 250 }}
                 step={0.5}
                 minimumValue={0}
                 maximumValue={2}
                 value={this.state.cinnamonValue}
                 onValueChange={val => this.setState({ cinnamonValue: val })}
                />
              </CardItem>
            }
          </Card>
          <Card>
            <Body style={{ flexDirection: "row", justifyContent: 'center', width: '100%'}}>
              <Button
                style={{ justifyContent: 'center', width: '50%', backgroundColor: 'rgba(22, 22, 22, 0.3)'}}
                onPress={ () => { this.props.navigation.navigate("Milk"); }}>
                <Text style={{ color: '#ffffff'}}>Back</Text>
              </Button>
              <Button
                style={{ justifyContent: 'center', width: '50%', backgroundColor: '#3a7aff'}}
                onPress={ () => {
                  this.saveRecipe();
                  Toast.show({
                    text: 'Recipe saved ! Check out in Recipes',
                    buttonText: 'Okay'
                  });
                } }>
                <Text style={{ color: '#ffffff'}}>Save</Text>
              </Button>
            </Body>
          </Card>
        </Content>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  baseImgStyle: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  sugarTabStyle: {
    width: 82,
    justifyContent: "center"
  },
});
