// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, Container, Header, Content, Body, Footer, Title, Left, Right, Segment, Card, CardItem, List, ListItem  } from 'native-base';
import Collapsible from 'react-native-collapsible';

// Component configuration for ordering screen -> layout, state...
export default class ConfirmScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.icons = {     //Step 2
      'up': require('../../../assets/Icons/arrowup_myrecipes_icon.png'),
      'down': require('../../../assets/Icons/arrowdown_myrecipes_icon.png')
    };
    let recipe = props.navigation.state.params.order;
    this.state = {
      orderRecipe: recipe,
      saleTax: 0,
      awaitTime: 7,
      pickupLocation: null,
      toggleTotal: false,
      togglePayment: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  // List item collapse functions
  listItemCollapse(item) {
    this.setState({
      toggleTotal: ((item == "total") && !this.state.toggleTotal),
      togglePayment: ((item == "payment") && !this.state.togglePayment),
    });
  }

  // Change arrow indicators when list items get collapsed
  toggleIndicator(toggle) {
    if(toggle) {
      return this.icons['up'];
    }
    return this.icons['down'];
  }

  choosePickUpLocation() {
    this.props.navigation.navigate('Map');
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={ () => { this.props.navigation.dispatch(NavigationActions.back()); } }>
              <Icon style={{ color: '#017afe' }} name='ios-arrow-back'/>
            </TouchableOpacity>
          </Left>
          <Body><Title style={ styles.titleStyle }>Confirm Order</Title></Body>
          <Right></Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Image style={ styles.baseImgStyle } source={ { uri : this.state.orderRecipe.img } } />
              </Left>
              <Title>{ this.state.orderRecipe.name }</Title>
              <Right></Right>
            </CardItem>
          </Card>
          <Card>
            <List style={{ alignSelf: 'stretch' }}>
              <ListItem itemDivider
              onPress={ () => { this.onPress } }
              style={ styles.listItemStyle }>
                <Left><Title>Await time</Title></Left>
                <Text>{ this.state.awaitTime } minutes</Text>
              </ListItem>
              <ListItem itemDivider
              onPress={ () => { this.listItemCollapse('total') } }
              style={ styles.listItemStyle }>
                <Left><Title>Grand total</Title></Left>
                <Text>$ { this.state.saleTax + this.state.orderRecipe.price }</Text>
              </ListItem>
              <Collapsible collapsed={ !this.state.toggleTotal }>
                <ListItem>
                  <Left><Title>Tax</Title></Left>
                  <Text>$ { this.state.saleTax.toFixed(2) }</Text>
                </ListItem>
                <ListItem>
                  <Left><Title>Total</Title></Left>
                  <Text>$ { this.state.orderRecipe.price }</Text>
                </ListItem>
              </Collapsible>
              <ListItem itemDivider
              onPress={ () => { this.listItemCollapse('payment') } }
              style={ styles.listItemStyle }>
                <Left><Title>Payment method</Title></Left>
                <Text>{}</Text>
              </ListItem>
              <Collapsible collapsed={ !this.state.togglePayment }>
                <ListItem>
                </ListItem>
              </Collapsible>
            </List>
          </Card>
        </Content>
        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          width: '100%'}}>
            <Button
              style={{ justifyContent: 'center', width: '100%', height: 50, backgroundColor: '#017afe'}}
              onPress={ () => { this.onPress }}>
              <Text style={{ color: '#ffffff'}}>Place Order</Text>
            </Button>
        </View>
        <Footer style={ styles.bottomTabStyle }>
          <TouchableOpacity onPress={ () => { this.choosePickUpLocation() }}>
            <Body style={ styles.bottomTabBodyStyle }>
              <Text style= { styles.instructions }>Choose a kiosk to pick up</Text>
            </Body>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 0,
    justifyContent: 'center',
  },
  instructions: {
    color: "#f5fcff",
    fontSize: 20,
  },
  titleStyle: {
    width: 150
  },
  baseImgStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
  },
  listItemStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  bottomOrderTabStyle: {
    backgroundColor: '#017afe'
  },
  bottomTabStyle: {
    backgroundColor: 'rgba(0,44,54,0.3)'
  },
  bottomTabBodyStyle: {
    justifyContent: 'center'
  }
});
