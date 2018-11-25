// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { Icon, Button, Container, Header, Content, Body, Title, Left, Right, List, ListItem, Toast} from 'native-base';
import { ShareDialog } from 'react-native-fbsdk';

export default class DetailScreen extends Component<Props> {

  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://greenbay.usc.edu/csci577/fall2018/projects/team05/",
      contentDescription: 'Check out my own coffee!',
    };
    this.state = {
      detail: this.props.navigation.state.params.detailInfo,
      active: false,
      shareLinkContent: shareLinkContent,
    }
  }

  componentDidMount() {
    // console.log(this.props);
  }

  // Share the link using the share dialog.
  shareLinkWithShareDialog() {
    // Share using the share API.
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
          Toast.show({
            text: 'Share cancelled!',
            buttonText: 'Okay'
          });
        } else {
          console.log('Share success with postId: '
            + result.postId);
          Toast.show({
            text: 'Share posted!',
            buttonText: 'Okay'
          });
        }
      },
      function(error) {
        console.log('Share fail with error: ' + error);
      }
    );
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
      <Container>
        <Content>
        </Content>
      </Container>
    );
  }
}
