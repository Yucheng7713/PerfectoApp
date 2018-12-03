// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image , AsyncStorage, TouchableOpacity } from 'react-native';
import { Icon, Container, Header, Content, Body, Title, Left, Right, List, ListItem, Button  } from 'native-base'
import { LiteCreditCardInput } from "react-native-credit-card-input";
import Collapsible from 'react-native-collapsible';

// Component configuration for profile screen -> layout, state data
export default class ProfileScreen extends Component<Props> {
  // Facebook login data status
  constructor(props) {
    super(props);
    this.cardIcons = { // Credit card icons
      "visa": require('../../assets/Icons/card_icons/stp_card_visa.png'),
      "master-card": require('../../assets/Icons/card_icons/stp_card_mastercard.png'),
      "american-express": require('../../assets/Icons/card_icons/stp_card_amex.png'),
      "diners-club": require('../../assets/Icons/card_icons/stp_card_diners.png'),
      "discover": require('../../assets/Icons/card_icons/stp_card_discover.png'),
      "jcb": require('../../assets/Icons/card_icons/stp_card_jcb.png'),
      "unionpay": require('../../assets/Icons/card_icons/stp_card_unknown.png'),
      "maestro": require('../../assets/Icons/card_icons/stp_card_unknown.png')
    };
    this.state = {
      FBInfoExisted: false,
      FBName: "",
      FBEmail: "",
      FBProfileLink: "",
      toggleCard: false,
      cardNum: null,
      cardExpiry: null,
      cardCvc: null,
      cardType: null,
      editComplete: true,
    };
  }
  // Retrieve login info when loading this page
  componentDidMount() {
    var profileLink;
    // Set user profile info
    AsyncStorage.getItem('USER_FB_INFO', (error,value) => {
        if (!error) { //If there are no errors
            //handle result
            if (value !== null) {
              var json = JSON.parse(value);
              this.setState({
                FBInfoExisted: true,
                FBName: json.name,
                FBEmail: json.email,
                FBProfileLink : json.picture_url
              });
            }
        }
    });
    // Get user payment info
    AsyncStorage.getItem("Card", (error,res) => {
      if (!error) {
          //handle result
          if (res !== null) {
            var cardInfo = JSON.parse(res);
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

  // Save payment method ( credit card )
  saveCardInfo(item) {
    this.setState({
      toggleCard: !this.state.toggleCard,
    });
    if(!this.state.editComplete) {
      this.setState({
        cardNum: "",
        cardExpiry: "",
        cardCvc: "",
        cardType: ""
      });
    } else {
      // Save payment info locally
      AsyncStorage.setItem('Card', JSON.stringify({
        cardNum: this.state.cardNum,
        cardExpiry: this.state.cardExpiry,
        cardCvc: this.state.cardCvc,
        cardType: this.state.cardType
      }));
    }
  }

  // Called function when credit card input get changed
  _creditCardOnChange = (form) => {
    if(form.valid) {
      //console.log("Card info saved!");
      this.setState({
        cardNum: form.values.number,
        cardExpiry: form.values.expiry,
        cardCvc: form.values.cvc,
        cardType: form.values.type,
        editComplete: true,
      });
    } else {
      //console.log("Card info incomplete!");
      this.setState({
        editComplete: false,
      });
    }
  };

  // Change the content of payment method list item based on input interaction
  creditCardContent() {
    if(this.state.toggleCard) {
      return(
        <Text>Enter payment info ></Text>
      );
    } else {
      if(this.state.cardNum === null) {
        return(
          <Text>None</Text>
        );
      } else {
        // console.log(this.state.cardType);
        // console.log(this.cardIcons[this.state.cardType]);
        return(
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{ height: 21, width: 32 }} source={this.cardIcons[this.state.cardType]} />
            <Text> { this.state.cardNum.replace(/\d{4}(?= \d{4})/g, "****") }</Text>
          </View>
        );
      }
    }
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    // Check if Facebook profile is available -> if not, show default profile image
    var profileLink = require("../../assets/Profile/default-profile.png");
    if(this.state.FBInfoExisted) {
      profileLink = { url: this.state.FBProfileLink };
    }
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={ () => { this.props.navigation.openDrawer(); } }>
              <Image
              style={ { width: 25, height: 25} }
              source={require('../../assets/SideBarIcons/home-icon.png')} />
            </TouchableOpacity>
          </Left>
          <Body><Title style={ styles.titleStyle }>User Profile</Title></Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={ styles.containerStyle }>
          <Image
            style={ styles.profileImgStyle }
            source={ profileLink }
          />
          <List style={ styles.listStyle }>
            <ListItem itemDivider>
              <Text>Name</Text>
            </ListItem>
            <ListItem>
              <Text>{ this.state.FBName }</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>Email</Text>
            </ListItem>
            <ListItem>
              <Text>{ this.state.FBEmail }</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>Payment method</Text>
            </ListItem>
            <ListItem>
              <Left>
                {
                  this.creditCardContent()
                }
              </Left>
              <Right>
                <TouchableOpacity
                onPress={()=>{ this.saveCardInfo() }}>
                  { !this.state.toggleCard &&
                    <Text style={{ color: '#017afe'}}>Edit</Text>
                  }
                  { this.state.toggleCard &&
                    <Text style={{ color: '#017afe'}}>Save</Text>
                  }
                </TouchableOpacity>
              </Right>
            </ListItem>
            <Collapsible collapsed={ !this.state.toggleCard }>
              <ListItem>
                <LiteCreditCardInput
                setValues={{
                  number: this.state.cardNum,
                  expiry: this.state.cardExpiry,
                  cvc: this.state.cardCvc
                 }}
                onChange={ this._creditCardOnChange } />
              </ListItem>
            </Collapsible>
          </List>
        </Content>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  titleStyle: {
    width: 150
  },
  containerStyle: {
    paddingTop: 40,
    alignItems:'center',
    flex:1
  },
  profileImgStyle: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  listStyle: {
    alignSelf: 'stretch',
    paddingTop: 40
  }
});
