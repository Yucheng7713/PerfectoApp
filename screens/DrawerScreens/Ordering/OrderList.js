// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, Image, FlatList, AsyncStorage} from 'react-native';
import { Icon, Container, Header, Footer, Content, Left, Right, Body, Title, List, ListItem } from 'native-base';
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
            <Icon name='ios-menu' onPress={ () => { this.props.navigation.openDrawer(); } }/>
          </Left>
          <Body><Title style={ styles.titleStyle }>Order</Title></Body>
          <Right></Right>
        </Header>
        <ScrollView>
          <List>
            { this.baseMenuGenerator() }
          </List>
        </ScrollView>
        <Footer style={ styles.bottomTabStyle }>
          <TouchableOpacity onPress={ () => { this.props.navigation.navigate('KioskMap'); }}>
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
