// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, Tab, Tabs, ScrollableTab } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
// Mocked Base Flavors JSON object
// var mockupData = require("../../../sampleBaseData.json");
var mockupData = require("../../../mockupBaseData.json");

// Component configuration for customize screen -> layout, state...
export default class BaseScreen extends Component<Props> {
  // Props initialization
  constructor(props) {
    super(props);
    this.state = {
      bases: mockupData['baseFlavors'],
      base_json: mockupData['bases'],
      chosen_base: {
        name: "",
        img: "",
        price: 0,
        milk: null,
        flavors: null,
        sweetners: null,
        extra: null
      }
    }
  }

  // Record the selected base and pass it to the next step
  chooseBase = (coffeebase) => {
    this.state.chosen_base.name = coffeebase['Title'];
    this.state.chosen_base.img = coffeebase['IMG_path'];
    this.state.chosen_base.price = coffeebase['Price'];
    this.state.chosen_base.milk = coffeebase['Milk'];
    this.state.chosen_base.flavors = coffeebase['Flavors'];
    this.state.chosen_base.sweetners = coffeebase['Sweetners'];
    this.state.chosen_base.extra = coffeebase['Extra'];
    this.props.navigation.navigate('Preference', {
      baseOptions: this.state.chosen_base
    });
  }

  // Column of base flavor menu ( 2 columns per row )
  baseMenuColumnGenerator(index, remainNums, baseFlavor) {
    var baseColumn = [];
    var baseArray = this.state.base_json[baseFlavor];
    baseColumn.push(
      <Col key={'col_' + index} style={ styles.columnStyle }>
        <TouchableOpacity onPress={ (event) => { this.chooseBase(baseArray[index]) } }>
          <Image style={ styles.baseImgStyle } source={ { uri: baseArray[index]['IMG_path'] } } />
        </TouchableOpacity>
        <Text style={ styles.baseTextStyle }>{ baseArray[index]['Title'] }</Text>
      </Col>
    );

    if(remainNums > 1) {
      let r_index = index + 1;
      baseColumn.push(
        <Col key={'col_' + r_index} style={ styles.columnStyle }>
          <TouchableOpacity onPress={(event) => { this.chooseBase(baseArray[r_index]) } }>
            <Image style={ styles.baseImgStyle } source={ { uri : baseArray[r_index]['IMG_path'] } } />
          </TouchableOpacity>
          <Text style={ styles.baseTextStyle }>{ baseArray[r_index]['Title'] }</Text>
        </Col>
      );
    }
    return baseColumn;
  }

  // Row of base flavor menu
  baseMenuRowGenerator(baseFlavor) {
    var numOfFlavors = this.state.base_json[baseFlavor].length;
    var baseRow = [];
    for(var i = 0; i < numOfFlavors; i += 2) {
      baseRow.push(
        <Row key={'row_' + i}>
          { this.baseMenuColumnGenerator(i, numOfFlavors - i, baseFlavor) }
        </Row>
      );
    }
    return baseRow;
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    var baseGenres = [];
    for(var i = 0; i < this.state.bases.length; i++) {
      baseGenres.push(
        <Tab key={'base_' + i} heading={this.state.bases[i]}>
          <ScrollView>
            <Grid style={{ paddingTop: 20}}>
              { this.baseMenuRowGenerator(this.state.bases[i]) }
            </Grid>
          </ScrollView>
        </Tab>
      );
    }
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={ () => { this.props.navigation.openDrawer(); } }>
              <Image
              style={ styles.homeIconStyles }
              source={require('../../../assets/SideBarIcons/home-icon.png')} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Image
            style={{ height: 40, width: 120}}
            source={require('../../../assets/Background/home_title.png')}/>
          </Body>
          <Right></Right>
        </Header>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          { baseGenres }
        </Tabs>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  titleStyle: {
    width: 150
  },
  homeIconStyles: {
    width: 25,
    height: 25
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f6d7a'
  },
  columnStyle: {
    flex: 1,
    alignItems: "center"
  },
  baseImgStyle: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  baseTextStyle: {
    paddingTop: 10,
    paddingBottom: 40,
  }
});
