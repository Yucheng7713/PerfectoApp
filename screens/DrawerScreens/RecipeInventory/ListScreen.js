// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, FlatList, AsyncStorage } from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, List, ListItem } from 'native-base';

export default class ListScreen extends Component<Props> {
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

  goToDetial = (recipeDetial) => {
    this.props.navigation.navigate("RecipeDetail", {
      detailInfo: recipeDetial
    });
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
          <FlatList
          data={ this.state.data }
          keyExtractor={item => item.base }
          renderItem={ ({item}) => (
            <ListItem
            style={{flexDirection: 'row'}}
            button
            onPress={() => this.goToDetial(item)}>
              <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={ {uri : item.img } } />
              <Title>   { item.name }</Title>
              <Left></Left>
              <Right><Icon name='ios-arrow-forward'/></Right>
            </ListItem>
          ) }
          />
      </Container>
    );
  }

}
