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
    AsyncStorage.getItem("Orders", (error,res) => {
          if (!error) {
              //handle result
              if (res !== null) {
                var orderHistory = JSON.parse(res).orderHistory;
                this.setState({data: orderHistory});
              }
          }
    });
  }

  // Navigate to the detail of the chosen recipe
  goToOrderDetail = (orderDetail) => {
    this.props.navigation.navigate("OrderDetail", {
      detailInfo: orderDetail
    });
  }

  // baseMenuGenerator() {
  //   var orders = [];
  //   for(var i = 0; i < this.state.data.length; i ++) {
  //     orders.push(
  //       <ListItem key={'oh_' + i}
  //       onPress={() => { this.goToOrderDetail(this.state.data[]) } }
  //       style={{flexDirection: 'row'}}>
  //         <Image style={{ width: 40, height: 40, borderRadius: 20 }}
  //         source={ { uri : this.state.data[i].recipe.img } } />
  //         <Title>   { this.state.data[i].recipe.name }</Title>
  //         <Text style={{ paddingLeft: 70, paddingRight: 20 }}> { this.state.data[i].date }</Text>
  //         <Icon name='ios-arrow-forward'/>
  //       </ListItem>
  //     );
  //   }
  //   return orders;
  // }

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
        <FlatList
        data={ this.state.data }
        keyExtractor={item => item.recipe.base }
        renderItem={ ({item}) => (
          <ListItem
          style={{flexDirection: 'row'}}
          button
          onPress={() => this.goToOrderDetail(item) }>
            <Left>
              <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={ {uri : item.recipe.img } } />
              <Title style={{ paddingTop: 10}}>   { item.recipe.name }</Title>
            </Left>
            <Text style={{ paddingLeft: 70, paddingRight: 20 }}> { item.date }</Text>
            <Icon name='ios-arrow-forward'/>
          </ListItem>
        ) }
        />
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
