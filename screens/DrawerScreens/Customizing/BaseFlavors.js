// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, Tab, Tabs, ScrollableTab } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
// Mocked Base Flavors JSON object
export const Test_Base_JSON = {
  baseFlavors: ["Americano", "Latte", "Cappuccino", "Mocha"],
  bases: {
    "Americano" : [
      {
        "Title": "Caffe Americano",
        "IMG_path": "americano_1"
      },
      {
        "Title": "Blonde Roast",
        "IMG_path": "americano_2"
      },
      {
        "Title": "Dark Roast",
        "IMG_path": "americano_3"
      },
      {
        "Title": "Special Roast",
        "IMG_path": "americano_4"
      }
    ],
    "Latte": [
      {
        "Title": "Vanilla Latte",
        "IMG_path": "latte_1"
      },
      {
        "Title": "Caramel Latte",
        "IMG_path": "latte_2"
      },
      {
        "Title": "Mocha Latte",
        "IMG_path": "latte_3"
      },
      {
        "Title": "Flat White",
        "IMG_path": "latte_4"
      },
      {
        "Title": "Cinnamon Latte",
        "IMG_path": "latte_5"
      },
      {
        "Title": "Signature Latte",
        "IMG_path": "latte_6"
      }
    ],
    "Cappuccino": [
      {
        "Title": "Vanilla Cappuccino",
        "IMG_path": "cappuccino_1"
      },
      {
        "Title": "Caramel Cappuccino",
        "IMG_path": "cappuccino_2"
      },
      {
        "Title": "Cinnamon Cappuccino",
        "IMG_path": "cappuccino_3"
      }
    ],
    "Mocha": [
      {
        "Title": "Dark Mocha",
        "IMG_path": "mocha_1"
      },
      {
        "Title": "Blonde Mocha",
        "IMG_path": "mocha_2"
      }
    ]
  }
};

// Component configuration for customize screen -> layout, state...
export default class BaseFlavors extends Component<Props> {
  // Props initialization
  constructor(props) {
    super(props);
    this.state = {
      bases: Test_Base_JSON['baseFlavors'],
      base_json: Test_Base_JSON['bases'],
      chosen_base: {
        name: "",
        img: ""
      }
    }
  }

  // Record the selected base and pass it to the next step
  chooseBase = (coffeebase) => {
    this.state.chosen_base.name = coffeebase['Title'];
    this.state.chosen_base.img = coffeebase['IMG_path'];
    this.props.navigation.navigate("Milk", {
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
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          { baseGenres }
        </Tabs>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
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
    paddingBottom: 60,
  }
});
