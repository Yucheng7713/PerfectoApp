// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import MapView, { Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Component configuration for find kiosk screen -> layout, state data
export default class FindKioskScreen extends Component<Props> {
  state = {
    placeName: 'Current Location',
    places: [],
    focusedLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 
        Dimensions.get("window").width / 
        Dimensions.get("window").height * 
        0.01
    },
    locationChosen: true
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        focusedLocation: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 
          Dimensions.get("window").width / 
          Dimensions.get("window").height * 
          0.01
        }
      });
    },
    err => {
      console.log(err);
      alert("Fetching the Position failed, please pick one manually");
    })
  }

  // Layout rendering : note that do not include any comment in return(...), it will be interpreted as layout component
  render() {
    let marker = null;
    let placeInfo = "";

    if(this.state.locationChosen){
      //marker = <MapView.Marker />
      marker = <Marker 
        title='My Location'
        coordinate={this.state.focusedLocation}
      ></Marker>
    }
    return (
      <View style={styles.containerStyle}>
      <View style={styles.inputContainer}>
      <GooglePlacesAutocomplete
      style={styles.placeAuto}
      minLength={2} // minimum length of text to search
      autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='false'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);  
            this.setState({
                placeName: data.description, //selected address
                focusedLocation: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 
                  Dimensions.get("window").width / 
                  Dimensions.get("window").height * 
                  0.01
                }
              });
            }}
      
            getDefaultValue={() => ''}
      
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAltHnnAydxQphvRkCVbzINhRr5G83JNrg',
              language: 'en', // language of the results
              types: ['establishment','geocode'] // default: 'geocode'
            }}
      
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        //types: 'food'
      }}

      filterReverseGeocodingByTypes={['locality', 'sublocality', 'postal_code', 'country', 'administrative_area_level_1','administrative_area_level_2']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      //predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      >

      </GooglePlacesAutocomplete>
      </View>
      
        <MapView
        //provider={ PROVIDER_GOOGLE  }
        style={ styles.mapContainer }
        region={this.state.focusedLocation}
        ref={ref => this.map = ref}
        >
        {marker}
        </MapView>
      </View>

      
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
    justifyContent: 'flex-start',
    //flexDirection: "row"
  },
  inputContainer: {
    //flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  mapContainer: {
    height: '40%',
    width: '100%'
  },
  placeAuto: {
    width: '100%',
    //height: '10%'
  },
});
