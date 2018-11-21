// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider, Switch } from 'react-native';
import { Icon, Button, Container, Content, Body, Title, Input, Left, Right, Segment, Card, CardItem, ListItem, CheckBox } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';

// Component configuration for customize screen -> layout, state...
export default class Review extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.navigation.state.params.baseOptions.name,
      size: this.props.navigation.state.params.size,
      milkType: this.props.navigation.state.params.milkType,
      milkRatio: this.props.navigation.state.params.milkRatio,
      creamRatio: this.props.navigation.state.params.creamRatio,
      syrupGenre: this.props.navigation.state.params.syrup,
      sugarType: this.props.navigation.state.params.sugarType,
      sugarRatio: this.props.navigation.state.params.sugarValue,
      sugarGrunted: this.props.navigation.state.params.grundedSelected,
      powderGenre: this.props.navigation.state.params.powder,
      hasSyrup: false,
      hasPowder: false
    };
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params);
    if(this.state.syrupGenre === undefined || this.state.syrupGenre.length == 0) {
      this.setState({
        hasSyrup: false
      });
    } else {
      this.setState({
        hasSyrup: true
      });
    }
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
              placeholder={ "Name your recipe here ! " }
              placeholderTextColor="#808080"
              onChangeText={(textValue) => this.state.recipeName = textValue}/>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left><Title>Size</Title></Left>
              <Right><Title>{ this.state.size }</Title></Right>
            </CardItem>
          </Card>
          { this.state.milkType &&
            <Card>
              <CardItem>
                <Left><Title>Type of Milk</Title></Left>
                <Right><Title>{ this.state.milkType }</Title></Right>
              </CardItem>
            </Card>
          }
          { this.state.hasSyrup &&
            <Card>
              <CardItem>
                <Left><Title>Syrup(s)</Title></Left>
              </CardItem>
            </Card>
          }
          { this.state.sugarType &&
            <Card>
              <CardItem>
                <Left><Title>Type of Sugar</Title></Left>
                <Right><Title>{ this.state.sugarType }</Title></Right>
              </CardItem>
            </Card>
          }
          <Card>
            <Body style={{ flexDirection: "row", justifyContent: 'center', width: '100%'}}>
              <Button
                style={{ justifyContent: 'center', width: '50%', backgroundColor: 'rgba(22, 22, 22, 0.3)'}}
                onPress={ () => { this.props.navigation.navigate("Extra"); }}>
                <Text style={{ color: '#ffffff'}}>Back</Text>
              </Button>
              <Button
                style={{ justifyContent: 'center', width: '50%', backgroundColor: '#3a7aff'}}
                onPress={ () => { this.onPress } }>
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
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
