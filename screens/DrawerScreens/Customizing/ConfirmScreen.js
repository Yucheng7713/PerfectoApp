// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, Container, Header, Content, Body, Footer, Title, Left, Right, Segment, Card, CardItem, List, ListItem  } from 'native-base';
import Collapsible from 'react-native-collapsible';

// Component configuration for ordering screen -> layout, state...
export default class ConfirmScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.cardIcons = {
      "visa": require('../../../assets/Icons/card_icons/stp_card_visa.png'),
      "master-card": require('../../../assets/Icons/card_icons/stp_card_mastercard.png'),
      "american-express": require('../../../assets/Icons/card_icons/stp_card_amex.png'),
      "diners-club": require('../../../assets/Icons/card_icons/stp_card_diners.png'),
      "discover": require('../../../assets/Icons/card_icons/stp_card_discover.png'),
      "jcb": require('../../../assets/Icons/card_icons/stp_card_jcb.png'),
      "unionpay": require('../../../assets/Icons/card_icons/stp_card_unknown.png'),
      "maestro": require('../../../assets/Icons/card_icons/stp_card_unknown.png')
    };
    let recipe = props.navigation.state.params.order;
    this.state = {
      orderRecipe: recipe,
      saleTax: 0,
      waitTime: 7,
      pickupLocation: null,
      cardNum: null,
      cardExpiry: "",
      cardCvc: "",
      cardType: null,
      toggleTotal: false,
      togglePayment: false
    }
  }
  componentDidMount() {
    // Set user payment info
    AsyncStorage.getItem("Card", (error,res) => {
      if (!error) {
          //handle result
          if (res !== null) {
            var cardInfo = JSON.parse(res);
            // console.log(cardInfo);
            this.setState({
              cardNum: cardInfo.cardNum,
              cardExpiry: cardInfo.cardExpiry,
              cardCvc: cardInfo.cardCvc,
              cardType: cardInfo.cardType
            });
          }
      }
    });
  }

  // Map screen callback -> set wait time and location.
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // Example : After getting the time and location value, sent it back to this screen
    // and update the state variables ( waitTime, pickupLocation )
    // let mapInfo = nextProps.navigation.state.params;
    // this.setState({
    //   waitTime: mapInfo.time,
    //   pickupLocation: mapInfo.location,
    // });
  }

  // List item collapse functions
  listItemCollapse(item) {
    this.setState({
      toggleTotal: ((item == "total") && !this.state.toggleTotal),
      togglePayment: ((item == "payment") && !this.state.togglePayment),
    });
  }

  // Function for calling map view
  choosePickUpLocation() {
    // way to pass parameters to another route ( view )
    // : this.props.navigation.navigate('Route_name', { ...params });
    this.props.navigation.navigate('Map');
  }

  placeOrder() {
    const orderRecipe = {
      recipe: this.state.orderRecipe,
      location: this.state.pickupLocation,
      placeTime: this.state.waitTime,
      price: this.state.saleTax + this.state.orderRecipe.price
    };
    // Store order to history
    // Store the customized recipe locally
    // AsyncStorage.getItem("Orders", (error,res) => {
    //   if (!error) {
    //       //handle result
    //       if (res !== null) {
    //         var history = JSON.parse(res);
    //         history.orderHistory.push(order);
    //         AsyncStorage.setItem("Orders", JSON.stringify(history));
    //         this.props.navigation.navigate("Done");
    //       }
    //   }
    // });
    // // Navigate to final confirm
    this.props.navigation.navigate("Done", {
      order: orderRecipe
    });
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
          <Body><Title style={ styles.titleStyle }>Check out</Title></Body>
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
                <Left><Title>Wait time</Title></Left>
                <Text>{ this.state.waitTime } minutes</Text>
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
              onPress={ () => {
                this.onPress
                //this.listItemCollapse('payment')
              }}
              style={ styles.listItemStyle }>
                <Left><Title>Payment</Title></Left>
                {  this.state.cardNum &&
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{ height: 21, width: 32 }} source={this.cardIcons[this.state.cardType]} />
                    <Text> { this.state.cardNum.replace(/\d{4}(?= \d{4})/g, "****") }</Text>
                  </View>
                }
              </ListItem>
              <Collapsible collapsed={ !this.state.togglePayment }>
                {  this.state.cardNum &&
                  <ListItem>
                    <Text>{ this.state.cardNum.replace(/\d{4}(?= \d{4})/g, "****") }</Text>
                  </ListItem>
                }
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
              onPress={ () => { this.placeOrder() }}>
              <Text style={{ color: '#ffffff'}}>Place Order</Text>
            </Button>
        </View>
        <Footer style={ styles.bottomTabStyle }>
          <TouchableOpacity onPress={ () => { this.choosePickUpLocation() }}>
            <Body style={ styles.bottomTabBodyStyle }>
              <Icon style={{ color: '#ffffff' }} name='ios-arrow-up'/>
              <Text style= { styles.instructions }>  Choose Pickup Location</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
