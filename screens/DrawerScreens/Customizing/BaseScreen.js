// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, Tab, Tabs, ScrollableTab } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { baseGenres, baseRecipes } from '../../../src/module.js'

// Component configuration for customize screen -> layout, state...
export default class BaseScreen extends Component<Props> {
  // Props initialization
  constructor(props) {
    super(props);
    this.state = {
      bases: baseGenres,
      base_json: baseRecipes,
      chosen_base: {
        name: "Default_coffee",
        img: null,
        price: null,
        milk: null,
        flavors: [],
        sweetners: [],
        extra: []
      }
    }
  }

  // Click any base => keep the selected base recipe and pass it to the next step / screen
  chooseBase = (coffeebase) => {
    this.state.chosen_base.name = coffeebase['Name'];
    this.state.chosen_base.img = coffeebase['IMG'];
    this.state.chosen_base.price = coffeebase['Price'];
    this.state.chosen_base.milk = coffeebase['Milk'];
    this.state.chosen_base.flavors = coffeebase['Flavors'];
    this.state.chosen_base.sweetners = coffeebase['Sweetners'];
    this.state.chosen_base.extra = coffeebase['Extra'];
    this.props.navigation.navigate('Preference', {
      baseOptions: this.state.chosen_base
    });
  }

  // Generate the base recipe genre scroll tabs ( Cappuccino, Frappe, ... )
  baseMenuGenreTabGenerator() {
    // Generate the base recipe genre scroll tabs ( Cappuccino, Frappe, ... )
    var baseGenres = [];
    for(var i = 0; i < this.state.bases.length; i++) {
      baseGenres.push(
        <Tab key={ 'base_' + i } heading={ this.state.bases[i] }>
          <ScrollView>
            <Grid style={ { paddingTop: 20 } }>
              { this.baseMenuRowGenerator(this.state.bases[i]) }
            </Grid>
          </ScrollView>
        </Tab>
      );
    }
    return baseGenres;
  }

  // Generate base recipe menu by row
  baseMenuRowGenerator(baseFlavor) {
    var numOfFlavors = this.state.base_json[baseFlavor].length;
    var baseRow = [];
    for(var i = 0; i < numOfFlavors; i += 2) {
      baseRow.push(
        <Row key={ 'row_' + i }>
          { this.baseMenuColumnGenerator(i, numOfFlavors - i, baseFlavor) }
        </Row>
      );
    }
    return baseRow;
  }

  // Generate base recipe menu by column ( 2 items per row )
  baseMenuColumnGenerator(index, remainNums, baseFlavor) {
    var baseColumn = [];
    var baseArray = this.state.base_json[baseFlavor];
    baseColumn.push(
      <Col key={ 'col_' + index } style={ styles.columnStyle }>
        <TouchableOpacity onPress={ (event) => { this.chooseBase(baseArray[index]) } }>
          <Image style={ styles.baseImgStyle } source={ { uri: baseArray[index]['IMG'] } } />
        </TouchableOpacity>
        <Text style={ styles.baseTextStyle }>{ baseArray[index]['Name'] }</Text>
      </Col>
    );
    // Make sure that the case is handled if the number of recipes is odd ( the last one would be placed in the middle of the last row)
    if(remainNums > 1) {
      let r_index = index + 1;
      baseColumn.push(
        <Col key={ 'col_' + r_index } style={ styles.columnStyle }>
          <TouchableOpacity onPress={ (event) => { this.chooseBase(baseArray[r_index]) } }>
            <Image style={ styles.baseImgStyle } source={ { uri : baseArray[r_index]['IMG'] } } />
          </TouchableOpacity>
          <Text style={ styles.baseTextStyle }>{ baseArray[r_index]['Name'] }</Text>
        </Col>
      );
    }
    return baseColumn;
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity
            style={ styles.headerDrawerIconStyle }
            onPress={ () => { this.props.navigation.openDrawer(); } }>
              <Image
              style={ styles.homeIconStyles }
              source={ require('../../../assets/SideBarIcons/home-icon.png') } />
            </TouchableOpacity>
          </Left>
          <Body>
            <Image
            style={ styles.headerTitleImgStyle }
            source={ require('../../../assets/Background/home_title.png') }/>
          </Body>
          <Right></Right>
        </Header>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          { this.baseMenuGenreTabGenerator() }
        </Tabs>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  headerDrawerIconStyle: {
    paddingLeft: 10
  },
  headerTitleImgStyle: {
    height: 40,
    width: 120
  },
  homeIconStyles: {
    width: 25,
    height: 25
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
