// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, AsyncStorage, AlertIOS } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, List, ListItem } from 'native-base';
import Swipeout from 'react-native-swipeout';

// Customzed list item with swiping function -> swipe to delete
class FlatListItem extends Component<Props> {
  // Props initialization
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null
    }
  }
  // Render customized list item component
  render() {
    const swipeSettings = {
      autoClose: false,
      onClose: (secId, rowId, direction) => {
        if(this.state.activeRowKey != null) {
          this.setState({
            activeRowKey: null
          });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({
          activeRowKey: this.props.item.key
        });
      },
      right: [
        {
          onPress: () => {
            AlertIOS.alert(
              'Delete the customized Recipe',
              'Are you sure to delete the recipe ?',
              [
                {
                  text: 'Cancel',
                  onPress: this.onPress,
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => { // Remove the swiped list item from the list
                    console.log("Delete " + this.props.item.recipeID);
                    // Modified the local recipes storage
                    if(this.props.data.length === 1) {
                      this.props.data.pop();
                    } else {
                      this.props.data.splice(this.props.index, 1);
                    }
                    AsyncStorage.getItem("Recipes", (error,res) => {
                      if (!error) {
                          //handle result
                          if (res !== null) {
                            let deletedID = this.props.item.recipeID;
                            var recipesList = JSON.parse(res);
                            recipesList.customList = recipesList.customList.filter(function(obj){
                              return obj.recipeID !== deletedID;
                            });
                            AsyncStorage.setItem("Recipes", JSON.stringify(recipesList));
                          }
                      }
                    });
                    this.props.parentFlatList.refreshFlatList();
                  }
                }
              ]
            );
          },
          text: 'Delete',
          type: 'delete'
        }
      ],
      rowId: this.props.index,
      secId: 1
    };
    return(
      <Swipeout style={{ backgroundColor: '#ffffff' }} {...swipeSettings}>
        <ListItem
        onPress={ this.props.onPress }
        style={{flexDirection: 'row' }}>
          <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={ {uri : this.props.item.img } } />
          <Title>   { this.props.item.name }</Title>
          <Left></Left>
          <Right><Icon name='ios-arrow-forward'/></Right>
        </ListItem>
      </Swipeout>
    );
  }
}

export default class ListScreen extends Component<Props> {
  // Props initialization
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deletedRowKey: null
    }
  }

  componentDidMount() {
    // Retrieve locally stored user customized reciped list
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

  // Click function : Navigate to the detail of the chosen recipe
  goToDetail = (recipeDetial) => {
    this.props.navigation.navigate("RecipeDetail", {
      detailInfo: recipeDetial
    });
  }

  // List refresh function : refresh after deletion -> refresh and update the list
  refreshFlatList = (deletedKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: deletedKey
      };
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
              onPress={ () => { this.props.navigation.openDrawer(); } }>
                <Image
                style={ { width: 25, height: 25} }
                source={require('../../../assets/SideBarIcons/home-icon.png')} />
              </TouchableOpacity>
            </Left>
            <Body><Title style={{width: 150}}>My Recipes</Title></Body>
            <Right></Right>
          </Header>
          <FlatList
          data={ this.state.data }
          keyExtractor={ item => item.recipeID }
          renderItem={ ({item, index}) => (
            <FlatListItem
            item={item}
            index={index}
            data={this.state.data}
            button
            parentFlatList={this}
            onPress={() => this.goToDetail(item) }>
            </FlatListItem>
          ) }
          />
      </Container>
    );
  }

}
