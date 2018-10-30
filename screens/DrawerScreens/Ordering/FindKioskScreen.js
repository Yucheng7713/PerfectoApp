// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Content } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// Component configuration for find kiosk screen -> layout, state data
export default class FindKioskScreen extends Component<Props> {
  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    return (
        <MapView
          provider={ PROVIDER_GOOGLE  }
          style={ styles.mapContainer }
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    );
  }
}
// Styling components
const styles = StyleSheet.create({
  instructions: {
    color: "#f5fcff",
    fontSize: 20,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContainer: {
    height: '100%',
    width: '100%'
  },
});
