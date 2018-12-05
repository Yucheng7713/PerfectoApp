// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, AlertIOS, AsyncStorage, Share } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, Container, Header, Content, Body, Footer, Title, Left, Right, Segment, Card, CardItem, List, ListItem } from 'native-base';
import Collapsible from 'react-native-collapsible';

// Component configuration for customize screen -> layout, state...
export default class PreferenceScreen extends Component<Props> {

  // Header title and back button customization
  static navigationOptions = ({ navigation, screenProps}) => ({
    title: navigation.state.params.baseOptions.name,
  });

  // Props ( Parameters ) initialization
  constructor(props) {
     super(props);
     this.selectCupSize = this.selectCupSize.bind(this); // Coffee cup size segment tabs
     this.listItemCollapse = this.listItemCollapse.bind(this); // Listitem collapse function
     let recipe = this.props.navigation.state.params.baseOptions;
     this.state = {
       recipeName: recipe.name,
       price: recipe.price,
       nameEditable: false,
       cupSize: (typeof recipe.size != 'undefined')? recipe.size : "Small",
       sizeSmallSelected: true,
       sizeMediumSelected: false,
       sizeLargeSelected: false,
       toggleCupSize: false,
       milkAvailable: false,
       milkChoice: null,
       milkPortion: null,
       milkTemp: null,
       foamPortion: null,
       originalMilk: null,
       flavors: [],
       originalFlavors: [],
       sweetners: [],
       originalSweetners: [],
       extra: [],
       originalExtra: [],
       savedRecipe: (typeof recipe.cusID != 'undefined')
     }
  }

  // Component initialization
  componentDidMount() {
    let chosenBase = this.props.navigation.state.params.baseOptions;
    this.selectCupSize(this.state.cupSize);
    // Check if milk preferred option is available
    if(chosenBase.milk !== null) {
      this.setState({
        milkAvailable: true,
        milkChoice: chosenBase.milk.Type,
        milkPortion: chosenBase.milk.Portion,
        milkTemp: chosenBase.milk.Temp,
        foamPortion: chosenBase.milk.Cream,
        originalMilk: chosenBase.milk
      });
    }
    // If a user orders a customized recipe with pre-stored cup size preference
    if(chosenBase.cusName) {
      this.setState({
        recipeName: chosenBase.cusName
      });
    }
    // Set flavor options
    this.setState({
      flavors: chosenBase.flavors,
      originalFlavors: chosenBase.flavors,
    });
    // Set sweetner options
    this.setState({
      sweetners: chosenBase.sweetners,
      originalSweetners: chosenBase.sweetners,
    });
    // Set extra options
    this.setState({
      extra: chosenBase.extra,
      originalExtra: chosenBase.extra,
    });
  }

  // Rename recipe function
  recipeRename() {
    this.setState({
      recipeName: "",
      nameEditable: true,
    });
  }

  // Update preference states from MilkScreen, FlavorScreen, SugarScreen and ExtraScreen
  componentWillReceiveProps(nextProps) {
    let modifiedRecipe = nextProps.navigation.state.params;
    if(modifiedRecipe.prevScreen == "Milk") {
      this.setState({
        milkChoice: modifiedRecipe.milkChoice,
        milkPortion: modifiedRecipe.milkPortion,
        milkTemp: modifiedRecipe.milkTemp,
        foamPortion: modifiedRecipe.foamPortion,
      });
    } else if(modifiedRecipe.prevScreen == "Flavor") {
      this.setState({
        flavors: modifiedRecipe.flavors
      });
    } else if(modifiedRecipe.prevScreen == "Sugar") {
      this.setState({
        sweetners: modifiedRecipe.sweetners
      });
    } else if(modifiedRecipe.prevScreen == "Extra") {
      this.setState({
        extra: modifiedRecipe.extra
      });
    }
  }

  // Show & Update milk preferences in plain text under the Flavors title
  milkPreferenceContent() {
    return (
      <Body style={{ paddingTop: 5 }}>
        <Text>{ this.state.milkChoice } Milk { this.state.milkPortion } oz</Text>
        { this.state.milkTemp &&
          <Text>{ this.state.milkTemp }</Text>
        }
        <Text>Cream { this.state.foamPortion } oz</Text>
      </Body>
    );
  }

  // Show & Update flavor preferences in plain text under the Flavors title
  flavorPreferenceContent() {
    let flavorList = [];
    for(var i = 0; i < this.state.flavors.length; i++) {
      flavorList.push(
        <Text key={ 'flavor_' + i }>{ this.state.flavors[i].value } Pump(s) { this.state.flavors[i].name }</Text>
      );
    }
    return (
      <Body style={{ paddingTop: 5 }}>
      { flavorList }
      </Body>
    );
  }

  // Show & Update sweetners preferences in plain text under the Flavors title
  sweetnerPreferenceContent() {
    let sugarList = [];
    for(var i = 0; i < this.state.sweetners.length; i++) {
      sugarList.push(
        <Text key={ 'sugar_' + i }>{ this.state.sweetners[i].value } Packet(s) { this.state.sweetners[i].name }</Text>
      );
    }
    return (
      <Body style={{ paddingTop: 5 }}>
      { sugarList }
      </Body>
    );
  }

  // Show & Update extra preferences in plain text under the Flavors title
  extraPreferenceContent() {
    let extraList = [];
    for(var i = 0; i < this.state.extra.length; i++) {
      extraList.push(
        <Text key={ 'extra_' + i }>{ this.state.extra[i].value } Scoop(s) { this.state.extra[i].name }</Text>
      );
    }
    return (
      <Body style={{ paddingTop: 5 }}>
      { extraList }
      </Body>
    );
  }

  // Functions for setting cup size
  selectCupSize(size) {
    this.setState({
      cupSize: size,
      sizeSmallSelected: (size == "Small"),
      sizeMediumSelected: (size == "Medium"),
      sizeLargeSelected: (size == "Large"),
      toggleCupSize: false
    });
  }

  // List item collapse functions
  listItemCollapse(item) {
    this.setState({
      toggleCupSize: ((item == "cupSize") && !this.state.toggleCupSize)
    });
  }

  // Save function
  saveRecipe() {
    if(this.state.recipeName === "") {
      AlertIOS.alert(
        'The recipe needs a name!',
        null,
        [
          {
            text: 'OK',
            onPress: this.onPress,
          }
        ]
      );
    } else {
      let baseRecipe = this.props.navigation.state.params.baseOptions;
      // Form the customized recipe object
      const customRecipe = {
          name: this.state.recipeName,
          base: baseRecipe.name,
          price: baseRecipe.price,
          img: baseRecipe.img,
          size: this.state.cupSize,
          milkChoice: this.state.milkChoice,
          milkPortion: this.state.milkPortion,
          milkTemp: this.state.milkTemp,
          foam: this.state.foamPortion,
          flavors: this.state.flavors,
          sweetners: this.state.sweetners,
          extra: this.state.extra
      };
      // Store the customized recipe locally
      AsyncStorage.getItem("Recipes", (error,res) => {
        if (!error) {
            //handle result
            if (res !== null) {
              var recipesList = JSON.parse(res);
              var recipe_ID = recipesList.recipe_count++;
              recipesList.customList.push({
                recipeID: 'CUS_' + recipe_ID,
                name: this.state.recipeName,
                base: baseRecipe.name,
                price: baseRecipe.price,
                img: baseRecipe.img,
                size: this.state.cupSize,
                milkChoice: this.state.milkChoice,
                milkPortion: this.state.milkPortion,
                milkTemp: this.state.milkTemp,
                foam: this.state.foamPortion,
                flavors: this.state.flavors,
                sweetners: this.state.sweetners,
                extra: this.state.extra
              });
              AsyncStorage.setItem("Recipes", JSON.stringify(recipesList));
              this.props.navigation.navigate("RecipeList");
            }
        }
      });
    }
  }

  // Order function
  orderRecipe() {
    let baseRecipe = this.props.navigation.state.params.baseOptions;
    if(this.state.recipeName === "") {
      AlertIOS.alert(
        'The recipe needs a name!',
        null,
        [
          {
            text: 'OK',
            onPress: this.onPress,
          }
        ]
      );
    } else {
      this.props.navigation.navigate('Order',{
        // Form the customized recipe object
        order: {
          name: this.state.recipeName,
          base: baseRecipe.name,
          img: baseRecipe.img,
          price: this.state.price,
          size: this.state.cupSize,
          milkChoice: this.state.milkChoice,
          milkPortion: this.state.milkPortion,
          milkTemp: this.state.milkTemp,
          foam: this.state.foamPortion,
          flavors: this.state.flavors,
          sweetners: this.state.sweetners,
          extra: this.state.extra,
          saved: this.state.savedRecipe,
        }
      });
    }
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Image style={ styles.baseImgStyle } source={ { uri : this.props.navigation.state.params.baseOptions.img } } />
                <TextInput
                  style={{ height: 20, width: 220, paddingLeft: 10, fontSize: 20 }}
                  editable={ this.state.nameEditable }
                  maxLength={20}
                  onChangeText={(name) => this.setState({ recipeName : name })}
                  value={ this.state.recipeName }
                />
              </Left>
              <Right>
                { !this.state.savedRecipe &&
                  <TouchableOpacity onPress={()=>{ this.recipeRename() }}>
                    <Text style={{ color: '#017afe' }}>Rename</Text>
                  </TouchableOpacity>
                }
              </Right>
            </CardItem>
          </Card>
          <Card>
            <List style={{ alignSelf: 'stretch' }}>
              <ListItem itemDivider
              style={ styles.listItemStyle }
              onPress={ () => { this.listItemCollapse('cupSize') } }>
                <Left><Title>Cup Size</Title></Left>
                <Right><Text>{ this.state.cupSize }</Text></Right>
              </ListItem>
              <Collapsible collapsed={ !this.state.toggleCupSize }>
                <ListItem>
                  <Segment style= {styles.segmentStyle}>
                    <Button first
                    active={ this.state.sizeSmallSelected }
                    style={ styles.cupSizeTabStyle }
                    onPress= { () => { this.selectCupSize('Small')} }>
                      <Text>Small</Text>
                    </Button>
                    <Button
                    active={ this.state.sizeMediumSelected }
                    style={ styles.cupSizeTabStyle }
                    onPress= { () => { this.selectCupSize('Medium')} }>
                      <Text>Medium</Text>
                    </Button>
                    <Button last
                    active={ this.state.sizeLargeSelected }
                    style={ styles.cupSizeTabStyle }
                    onPress= { () => { this.selectCupSize('Large')} }>
                      <Text>Large</Text>
                    </Button>
                  </Segment>
                </ListItem>
              </Collapsible>
              { this.state.milkAvailable &&
                <ListItem itemDivider
                style={ styles.listItemStyle }
                onPress={ ()=>{ this.props.navigation.navigate('Milk',{
                  originalMilk: this.state.originalMilk,
                  milkChoice: this.state.milkChoice,
                  milkPortion: this.state.milkPortion,
                  milkTemp: this.state.milkTemp,
                  foamPortion: this.state.foamPortion,
                }) } }>
                  <Left style={{ flex: 1, flexDirection: 'column'}}>
                    <Title>Milk Preference</Title>
                    {
                      this.milkPreferenceContent()
                    }
                  </Left>
                  <Right><Icon name='ios-arrow-forward'/></Right>
                </ListItem>
              }
              <ListItem itemDivider
              style={ styles.listItemStyle }
              onPress={ ()=>{ this.props.navigation.navigate('Flavor',{
                flavors: this.state.flavors,
                originalFlavors: this.state.originalFlavors
              }) } }>
                <Left style={{ flex: 1, flexDirection: 'column'}}>
                  <Title>Flavors</Title>
                  {
                    this.flavorPreferenceContent()
                  }
                </Left>
                <Right><Icon name='ios-arrow-forward'/></Right>
              </ListItem>
              <ListItem itemDivider
              style={ styles.listItemStyle }
              onPress={ ()=>{ this.props.navigation.navigate('Sugar', {
                sweetners: this.state.sweetners
              }) } }>
                <Left style={{ flex: 1, flexDirection: 'column'}}>
                  <Title>Sweetners</Title>
                  {
                    this.sweetnerPreferenceContent()
                  }
                </Left>
                <Right><Icon name='ios-arrow-forward'/></Right>
              </ListItem>
              <ListItem itemDivider
              style={ styles.listItemStyle }
              onPress={ ()=>{ this.props.navigation.navigate('Extra', {
                extra: this.state.extra
              }) } }>
                <Left style={{ flex: 1, flexDirection: 'column'}}>
                  <Title>Extra Add-ins</Title>
                  {
                    this.extraPreferenceContent()
                  }
                </Left>
                <Right><Icon name='ios-arrow-forward'/></Right>
              </ListItem>
            </List>
          </Card>
        </Content>
        { !this.state.savedRecipe &&
          <View style={{
            flexDirection: "row",
            justifyContent: 'center',
            width: '100%'}}>
              <Button
                style={{ justifyContent: 'center', width: '100%', height: 50, backgroundColor: '#017afe'}}
                onPress={ () => { this.saveRecipe() }}>
                <Text style={{ color: '#ffffff'}}>Save to My Recipes</Text>
              </Button>
          </View>
        }
        <TouchableOpacity onPress={ () => { this.orderRecipe() }}>
          <Footer style={ styles.bottomTabStyle }>
              <Body style={ styles.bottomTabBodyStyle }>
                <Text style= { { color: '#f5fcff', fontSize: 20 } }>Check out  </Text>
                <Icon style={{ color: '#ffffff' }} name='ios-arrow-forward'/>
              </Body>
          </Footer>
        </TouchableOpacity>
      </Container>
    );
  }
}

// Styling components
const styles = StyleSheet.create({
  listItemStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  cupSizeTabStyle: {
    width: 110,
    flexDirection: 'column',
    justifyContent: "center"
  },
  baseImgStyle: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  bottomTabStyle: {
    backgroundColor: 'rgba(0,44,54,0.3)'
  },
  bottomTabBodyStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
