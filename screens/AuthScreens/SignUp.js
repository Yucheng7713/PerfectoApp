// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, AlertIOS } from 'react-native';
import { Icon, Button, Container, Header, Content, Form, Item as FormItem, Input, Left, Right, Body, Title } from 'native-base'

// Component configuration for sign up screen -> layout, state...
export default class SignUp extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      checkPassword: "",
      firstName: "",
      lastName: "",
    };
  }

  // Sign up function
  signUpMethod() {
    console.log("MAKE POST REQUEST TO BACKEND");
    if(this.validEmail(this.state.email) &&
       this.validPassword(this.state.password, this.state.checkPassword) &&
       this.validName(this.state.firstName, this.state.lastName)) {
      // Send request to Sails backend
      fetch("http://18.223.142.153:1337/api/v1/entrance/signup", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress: this.state.email,
          password: this.state.password,
          fullName: this.state.firstName + " " + this.state.lastName
        }),
      })
      .then(function(res){
        // Server backend callback status
        // If login success -> navigate to home page
        console.log(res);
        
      })
      .catch((error) => {
        // Error message
        console.error(error);
      });
      console.log("Sign up successfully!");
    } else {
      console.log("Info filled-in incomplete");
    }
  }

  // Email validation function
  validEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)) {
      AlertIOS.alert(
        'Invalid email format',
        null,
        [
          {
            text: 'OK',
            onPress: this.onPress,
          },
        ]
      );
    }
    return re.test(email);
  }

  // Password validation function -> contain at least one upper case
  validPassword(password, repassword) {
    var re = /^(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if(!re.test(password)) {
      AlertIOS.alert(
        'Invalid password format',
        'need to contain at least 1 upper case letter',
        [
          {
            text: 'OK',
            onPress: this.onPress,
          },
        ]
      );
    } else if(password !== repassword) {
      AlertIOS.alert(
        'Password unmatched',
        'Please check your re-entered password',
        [
          {
            text: 'OK',
            onPress: this.onPress,
          },
        ]
      );
    }
    return re.test(password) && (password === repassword);
  }

  // Check if first and last name are filled
  validName(first, last) {
    if(first === "") {
      AlertIOS.alert(
        'Please fill in your first name',
        null,
        [
          {
            text: 'OK',
            onPress: this.onPress,
          },
        ]
      );
    } else if(last === "") {
      AlertIOS.alert(
        'Please fill in your last name',
        null,
        [
          {
            text: 'OK',
            onPress: this.onPress,
          },
        ]
      );
    }
    return (first !== "") && (last !== "");
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <ImageBackground
        source={require('../../assets/Background/splash-background.png')}
        style={ styles.imgBackground }>
        <Content style={{ paddingTop: 70 }}>
          <Title style={ styles.signUpStyle }>Sign Up</Title>
          <Form style={ styles.inputField }>
            <FormItem>
              <Input placeholder="Email"
              style={{ color: '#ffffff' }}
              placeholderTextColor="#808080"
              onChangeText={ (textValue) => this.state.email = textValue }/>
            </FormItem>
            <FormItem>
              <Input placeholder="Password"
              style={{ color: '#ffffff' }}
              placeholderTextColor="#808080"
              secureTextEntry={true}
              onChangeText={ (textValue) => this.state.password = textValue }/>
            </FormItem>
            <FormItem>
              <Input placeholder="Re-Enter Password"
              style={{ color: '#ffffff' }}
              placeholderTextColor="#808080"
              secureTextEntry={true}
              onChangeText={ (textValue) => this.state.checkPassword = textValue }/>
            </FormItem>
            <FormItem>
              <Input placeholder="First Name"
              style={{ color: '#ffffff' }}
              placeholderTextColor="#808080"
              onChangeText={ (textValue) => this.state.firstName = textValue }/>
            </FormItem>
            <FormItem>
              <Input placeholder="Last Name"
              style={{ color: '#ffffff' }}
              placeholderTextColor="#808080"
              onChangeText={ (textValue) => this.state.lastName = textValue }/>
            </FormItem>
          </Form>
          <View style={ styles.signUpButtonLayout }>
            <Button style={ styles.signUpButtonStyle }
            onPress={()=>{ this.signUpMethod() }}>
              <Text style={{ color: 'white' }}>Signup</Text>
            </Button>
          </View>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  signUpStyle: {
    color: 'white',
    fontSize: 30
  },
  inputField: {
    paddingRight: 20,
    paddingTop: 20

  },
  signUpButtonLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  signUpButtonStyle: {
    width: '33%',
    backgroundColor: 'rgba(22, 22, 22, 0.3)',
    justifyContent: 'center'
  },
});
