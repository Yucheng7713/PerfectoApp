// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, Segment, Card, CardItem, ListItem, CheckBox } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';

import Panel from '../../../templates/Panel';

// Component configuration for customize screen -> layout, state...
export default class MilkPreference extends Component<Props> {
  // Parameters initialization
  constructor(props) {
     super(props);
     this.noneMilk = this.noneMilk.bind(this);
     this.wholeMilk = this.wholeMilk.bind(this);
     this.skimMilk = this.skimMilk.bind(this);
     this.soyMilk = this.soyMilk.bind(this);
     this.almondMilk = this.almondMilk.bind(this);
     this.selectSmallCup = this.selectSmallCup.bind(this);
     this.selectMediumCup = this.selectMediumCup.bind(this);
     this.selectLargeCup = this.selectLargeCup.bind(this);
     this.selectChoco = this.selectChoco.bind(this);
     this.selectCaramel = this.selectCaramel.bind(this);
     this.selectVanilla = this.selectVanilla.bind(this);
     this.state = {
       cupSize: "Small",
       sizeSmallSelected: true,
       sizeMediumSelected: false,
       sizeLargeSelected: false,
       milkType: null,
       milkPortionHidden: false,
       creamHidden: false,
       noneMilkSelected: true,
       wholeMilkSelected: false,
       skimMilkSelected: false,
       soyMilkSelected: false,
       almondMilkSelected: false,
       milkValue: null,
       creamValue: null,
       chocoSelected: false,
       caramelSelected: false,
       vanillaSelected: false,
       chocoValue: 0,
       caramelValue: 0,
       vanillaValue: 0,
     }
  }

  // Functions for setting milk type
  noneMilk() {
    this.setState({
      milkType: null,
      milkValue: null,
      creamValue: null,
      milkPortionHidden: false,
      creamHidden: false,
      noneMilkSelected: true,
      wholeMilkSelected: false,
      skimMilkSelected: false,
      soyMilkSelected: false,
      almondMilkSelected: false
    });
  }

  wholeMilk() {
    this.setState({
      milkType: 'Whole',
      milkValue: 1,
      creamValue: 1,
      milkPortionHidden: true,
      creamHidden: true,
      noneMilkSelected: false,
      wholeMilkSelected: true,
      skimMilkSelected: false,
      soyMilkSelected: false,
      almondMilkSelected: false
    });
  }

  skimMilk() {
    this.setState({
      milkType: 'Skimmy',
      milkValue: 1,
      creamValue: 1,
      milkPortionHidden: true,
      creamHidden: true,
      noneMilkSelected: false,
      wholeMilkSelected: false,
      skimMilkSelected: true,
      soyMilkSelected: false,
      almondMilkSelected: false
    });
  }

  soyMilk() {
    this.setState({
      milkType: 'Soy Milk',
      milkValue: 1,
      creamValue: null,
      milkPortionHidden: true,
      creamHidden: false,
      noneMilkSelected: false,
      wholeMilkSelected: false,
      skimMilkSelected: false,
      soyMilkSelected: true,
      almondMilkSelected: false
    });
  }

  almondMilk() {
    this.setState({
      milkType: 'Almond Milk',
      milkValue: 1,
      creamValue: null,
      milkPortionHidden: true,
      creamHidden: false,
      noneMilkSelected: false,
      wholeMilkSelected: false,
      skimMilkSelected: false,
      soyMilkSelected: false,
      almondMilkSelected: true
    });
  }

  // Functions for setting cup size
  selectSmallCup() {
    this.setState({
      cupSize: 'Small',
      sizeSmallSelected: true,
      sizeMediumSelected: false,
      sizeLargeSelected: false,
    });
  }

  selectMediumCup() {
    this.setState({
      cupSize: 'Medium',
      sizeSmallSelected: false,
      sizeMediumSelected: true,
      sizeLargeSelected: false,
    });
  }

  selectLargeCup() {
    this.setState({
      cupSize: 'Large',
      sizeSmallSelected: false,
      sizeMediumSelected: false,
      sizeLargeSelected: true,
    });
  }

  // Functions for setting syrup options
  selectChoco() {
      this.setState({
          chocoSelected: !this.state.chocoSelected,
          chocoValue: 0
      });
  }

  selectCaramel() {
      this.setState({
          caramelSelected: !this.state.caramelSelected,
          caramelValue: 0
      });
  }

  selectVanilla() {
      this.setState({
          vanillaSelected: !this.state.vanillaSelected,
          vanillaValue: 0
      });
  }

  setPreferences() {
    let syrups = [];
    if(this.state.chocoSelected) {
      syrups.push({
        name: "Chocolate",
        ratio: this.state.chocoValue
      })
    }
    if(this.state.caramelSelected) {
      syrups.push({
        name: "Caramel",
        ratio: this.state.caramelValue
      })
    }
    if(this.state.vanillaSelected) {
      syrups.push({
        name: "Vanilla",
        ratio: this.state.vanillaValue
      })
    }

    this.props.navigation.navigate("Extra", {
      baseOptions: this.props.navigation.state.params.baseOptions,
      size: this.state.cupSize,
      milkType: this.state.milkType,
      milkRatio: this.state.milkValue,
      creamRatio: this.state.creamValue,
      syrup: syrups
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
              <Title>  { this.props.navigation.state.params.baseOptions.name }</Title>
              <Right>
                <TouchableOpacity onPress={ () => { this.props.navigation.navigate("BaseFlavor"); }}>
                  <Text style={ { color: '#3a7aff'} }>Change</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Title>Cup Size</Title>
            </CardItem>
            <CardItem>
              <Segment>
                <Button first
                active={ this.state.sizeSmallSelected }
                style={ styles.cupSizeTabStyle }
                onPress= { this.selectSmallCup }>
                  <Text>Small</Text>
                </Button>
                <Button
                active={ this.state.sizeMediumSelected }
                style={ styles.cupSizeTabStyle }
                onPress= { this.selectMediumCup }>
                  <Text>Medium</Text>
                </Button>
                <Button last
                active={ this.state.sizeLargeSelected }
                onPress= { this.selectLargeCup }
                style={ styles.cupSizeTabStyle }>
                  <Text>Large</Text>
                </Button>
              </Segment>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Title>Milk Preferences</Title>
            </CardItem>
            <CardItem>
              <Segment>
                <Button first
                active={this.state.noneMilkSelected}
                style={ styles.milkTypeTabStyle }
                onPress= {this.noneMilk}>
                  <Text>None</Text>
                </Button>
                <Button
                active={this.state.wholeMilkSelected}
                style={ styles.milkTypeTabStyle }
                onPress= {this.wholeMilk}>
                  <Text>Whole</Text>
                </Button>
                <Button
                active={this.state.skimMilkSelected}
                style={ styles.milkTypeTabStyle }
                onPress= {this.skimMilk}>
                  <Text>Skim</Text>
                </Button>
                <Button
                active={this.state.soyMilkSelected}
                onPress= {this.soyMilk}
                style={ styles.milkTypeTabStyle }>
                  <Text>Soy</Text>
                </Button>
                <Button last
                active={this.state.almondMilkSelected}
                onPress= {this.almondMilk}
                style={ styles.milkTypeTabStyle }>
                  <Text>Almond</Text>
                </Button>
              </Segment>
            </CardItem>
            { this.state.milkPortionHidden &&
              <CardItem>
                <Panel title="Portion" ratio={ this.state.milkValue } expanded={ true } >
                  <Body>
                    <Slider
                     style={{ width: 320 }}
                     step={0.5}
                     minimumValue={0}
                     maximumValue={2}
                     value={this.state.milkValue}
                     onValueChange={val => this.setState({ milkValue: val })}
                    />
                  </Body>
                </Panel>
              </CardItem>
            }
            { this.state.creamHidden &&
              <CardItem>
                <Panel title="Cream Level" ratio={ this.state.creamValue } expanded={ true } >
                  <Body>
                    <Slider
                     style={{ width: 320 }}
                     step={0.5}
                     minimumValue={0}
                     maximumValue={2}
                     value={this.state.creamValue}
                     onValueChange={val => this.setState({ creamValue: val })}
                    />
                  </Body>
                </Panel>
              </CardItem>
            }
          </Card>
          <Card>
            <CardItem>
              <Title>Syrups</Title>
            </CardItem>
            <CardItem>
              <Left>
                <ListItem onPress={ () => { this.selectChoco() } }>
                  <CheckBox checked={ this.state.chocoSelected } onPress={ () => { this.selectChoco() } } color="brown"/>
                </ListItem>
                <Title>   Chocolate</Title>
              </Left>
              <Right>
              { this.state.chocoSelected &&
                <Title style={ { fontSize: 20 } }>{ this.state.chocoValue + " oz "} </Title>
              }
              </Right>
            </CardItem>
            { this.state.chocoSelected &&
              <CardItem>
                  <Left><Title style={{fontSize: 15}}>Amount</Title></Left>
                  <Slider
                   style={{ width: 250 }}
                   step={0.5}
                   minimumValue={0}
                   maximumValue={2}
                   value={this.state.chocoValue}
                   onValueChange={val => this.setState({ chocoValue: val })}
                  />
              </CardItem>
            }
            <CardItem>
              <Left>
                <ListItem onPress={ () => { this.selectCaramel() } }>
                  <CheckBox checked={ this.state.caramelSelected } onPress={ () => { this.selectCaramel() } } color="green"/>
                </ListItem>
                <Title>   Caramel</Title>
              </Left>
              <Right>
                { this.state.caramelSelected &&
                  <Title style={ { fontSize: 20 } }>{ this.state.caramelValue + " oz "} </Title>
                }
              </Right>
            </CardItem>
            { this.state.caramelSelected &&
              <CardItem>
                  <Left><Title style={{fontSize: 15}}>Amount</Title></Left>
                  <Slider
                   style={{ width: 250 }}
                   step={0.5}
                   minimumValue={0}
                   maximumValue={2}
                   value={this.state.caramelValue}
                   onValueChange={val => this.setState({ caramelValue: val })}
                  />
              </CardItem>
            }
            <CardItem>
              <Left>
                <ListItem onPress={ () => { this.selectVanilla() } }>
                  <CheckBox checked={ this.state.vanillaSelected } onPress={ () => { this.selectVanilla() } } color='#F3E5AB'/>
                </ListItem>
                <Title>   Vanilla</Title>
              </Left>
              <Right>
                { this.state.vanillaSelected &&
                  <Title style={ { fontSize: 20 } }>{ this.state.vanillaValue + " oz "} </Title>
                }
              </Right>
            </CardItem>
            { this.state.vanillaSelected &&
              <CardItem>
                  <Left><Title style={{fontSize: 15}}>Amount</Title></Left>
                  <Slider
                   style={{ width: 250 }}
                   step={0.5}
                   minimumValue={0}
                   maximumValue={2}
                   value={this.state.vanillaValue}
                   onValueChange={val => this.setState({ vanillaValue: val })}
                  />
              </CardItem>
            }
          </Card>
          <Card>
            <Body style={{ justifyContent: 'center', width: '100%'}}>
              <Button
                style={{ justifyContent: 'center', width: '100%', backgroundColor: '#3a7aff'}}
                onPress={ () => { this.setPreferences() }}>
                <Text style={{ color: '#ffffff'}}>Next Step</Text>
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
  milkTypeTabStyle: {
    width: 66,
    justifyContent: "center"
  },
  cupSizeTabStyle: {
    width: 110,
    justifyContent: "center"
  },
  baseImgStyle: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  text: {
    fontSize: 50,
  }
});
