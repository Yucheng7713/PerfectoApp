// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, Image, FlatList, AsyncStorage, View} from 'react-native';
import { Icon, Container, Header, Footer, Content, Left, Right, Body, Title, List, ListItem, Button } from 'native-base';
var mockupData = require("../../../sampleBaseData.json");

// Component configuration for ordering screen -> layout, state...
export default class OrderList extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("Recipes", (error,res) => {
          if (!error) {
              //handle result
              if (res !== null) {
                var recipesList = JSON.parse(res).customList;
                this.setState({data: recipesList});
              }
          }
    });
  }

  // postJSONRecall() {
    // console.log("Post json to backend!");
    // fetch("http://18.223.142.153:1337/api/v1/entrance/login", {
    //   method: 'PUT',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     emailAddress: "test4@usc.edu",
    //     password: "test4fae",
    //   }),
    // })
    // .then(function(res){
    //   console.log(res);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://18.223.142.153:1337/api/v1/entrance/signup", true);
    //
    // //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onreadystatechange = function() { // Call a function when the state changes.
    //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //         console.log("Request made!!!");
    //     }
    // }
    // xhr.send(JSON.stringify({
    //   "emailAddress": "test2@usc.edu",
    //   "password": "test"
    // }));
    // xhr.send(new Int8Array());
    // xhr.send(document);
  // }

  // getJSONRecall() {
  //   console.log("Get json from backend!");
  //   return fetch('http://18.223.142.153:1337/api/v1/entrance/signup')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log(responseJson);
  //     // return responseJson;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

  baseMenuGenerator() {
    // var bases = [];
    // for(var i = 0; i < mockupData.baseFlavors.length; i ++) {
    //   bases.push(
    //     <ListItem key={'base_' + i} style={{flexDirection: 'row'}}>
    //       <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={ {uri : base_JSON[i]['IMG_path']} } />
    //       <Title>   { base_JSON[i]['Title'] }</Title>
    //     </ListItem>
    //   );
    // }
    // return bases;
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={ () => { this.props.navigation.openDrawer(); } }>
              <Image
              style={ { width: 25, height: 25} }
              source={require('../../../assets/SideBarIcons/home-icon.png')} />
            </TouchableOpacity>
          </Left>
          <Body><Title style={ styles.titleStyle }>Order History</Title></Body>
          <Right></Right>
        </Header>
        <ScrollView>
          <List>
            { this.baseMenuGenerator() }
          </List>
        </ScrollView>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  instructions: {
    color: "#f5fcff",
    fontSize: 20,
  },
  titleStyle: {
    width: 150
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1675ba'
  },
  bottomTabStyle: {
    backgroundColor: 'rgba(0,44,54,0.3)'
  },
  bottomTabBodyStyle: {
    justifyContent: 'center'
  }
});
