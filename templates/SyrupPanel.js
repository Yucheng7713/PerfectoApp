import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import { Body, Title, Left, Right, Icon, CheckBox, ListItem } from 'native-base'

export default class SyrupPanel extends Component<Props>{

    constructor(props) {
        super(props);
        this.checkOption = this.checkOption.bind(this);
        this.state = {
            title    : props.title,
            expanded : props.expanded,
            optionSelected: false,
            animation   : new Animated.Value(),
        };
    }

    toggle() {
      let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
      let finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

      this.setState({
          expanded : !this.state.expanded
      });

      this.state.animation.setValue(initialValue);
      Animated.spring(
          this.state.animation,
          {
              toValue: finalValue
          }
      ).start();
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    checkOption() {
        this.setState({
            optionSelected: !this.state.optionSelected
        });
    }

    render(){
      return (
        <Animated.View style={ [ styles.container, { height: this.state.animation } ] } >
            <View style={ styles.titleContainer } onLayout={ this._setMinHeight.bind(this) } >
                <Left>
                  <ListItem onPress={ () => { this.checkOption() } }>
                    <CheckBox checked={ this.state.optionSelected } onPress={ () => { this.checkOption() } } color="green"/>
                  </ListItem>
                  <Title>   { this.state.title }</Title>
                </Left>
                <Right>
                  <TouchableHighlight
                    onPress={ this.toggle.bind(this) }
                    underlayColor="#f1f1f1" >
                    <Title style={ { fontSize: 20 } }>{ this.props.ratio + " oz "} <Icon name='ios-create' style={ styles.button }/></Title>
                  </TouchableHighlight>
                </Right>
            </View>
            <View style={ styles.body } onLayout={ this._setMaxHeight.bind(this) } >
                { this.props.children }
            </View>
        </Animated.View>
      );
    }
}

var styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      overflow:'hidden'
  },
  titleContainer: {
      flexDirection: 'row'
  },
  button: {
      color: '#3a7aff',
      fontSize: 25
  },
  body: {
      padding     : 10,
      paddingTop  : 0
  }
});
