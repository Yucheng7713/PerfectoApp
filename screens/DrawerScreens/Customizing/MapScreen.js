// Required components from React, React Navigation, and Native Base
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Navigator, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker }from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import geolib from 'geolib';
import KioskData from '../../../Kiosk.json';

//import distance from 'google-distance';
//distance.apiKey = 'AIzaSyAltHnnAydxQphvRkCVbzINhRr5G83JNrg';


// Component configuration for find kiosk screen -> layout, state data
export default class MapScreen extends Component<Props> {
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

  /*getDistanceGoogle(loc1,loc2){
    const Location1Str = loc1;
    const Location2Str = loc2;
    const GOOGLE_API_KEY = 'AIzaSyAltHnnAydxQphvRkCVbzINhRr5G83JNrg';

    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

    let params = 'origins=${Location1Str}&destinations=${Location2Str}&key=${GOOGLE_API_KEY}'; // you need to get a key
    let finalApiURL = '${ApiURL}${encodeURI(params)}';

    let fetchResult =  await fetch(finalApiURL); // call API
    let Result =  await fetchResult.json(); // extract json

    return Result.rows[0].elements[0].distance;
  }*/

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
        provider={ PROVIDER_GOOGLE  }
        style={ styles.mapContainer }
        region={this.state.focusedLocation}
        onRegionChange={this.onRegionChange}
        loadingEnabled = {true}
        showsUserLocation={true}
        showsCompass={true}
        showsPointsOfInterest = {false}
        ref={ref => this.map = ref}
        onLoad={() => this.forceUpdate()}
        >
        {marker}
        {KioskData.Kiosk.map((i) => 
          <Marker
          pinColor = '#0000FF'
          title={'Kiosk'+i.id} 
          coordinate={{latitude: i.coordinate.lat, longitude: i.coordinate.lon}}
          />
          )}
        
        </MapView>
        
        {/*
        <View>
          <Text>lat: {this.state.focusedLocation.latitude}</Text>
          <Text>lon: {this.state.focusedLocation.longitude}</Text>
        </View>
        */}
        <View style={styles.Kiosk}>
        { KioskData.Kiosk.map((index) => 
        <View 
        key={index} 
        style={styles.listItem}
        //onPress={() =>{alert("You seleted Kiosk:"+index.id);}}
        >
        <TouchableOpacity 
        onPress={() =>{this.props.navigation.navigate('Confirm',
        {
          TIMEW: geolib.convertUnit("km",geolib.getDistance(
            this.state.focusedLocation,
            index.coordinate)*12,1) + " min",
          //KioskID: index.id,
          location: index.Address,
        });}}
        >
        <View style={styles.KioskTitile}>
        <Text style={styles.KioskName}>Kiosk: {index.id}</Text>
        <Text style={styles.KioskName}>Status: {index.Status}</Text>
        </View>
        <Text style={styles.Auto}>Address: {index.Address}</Text>
        <Text style={styles.Auto}>Distance: { 
          //this.getDistanceGoogle(this.state,index.coordinate)
          geolib.convertUnit("km",geolib.getDistance(
            this.state.focusedLocation,
            index.coordinate),2)
            /*distance.get(
              {
                index: 1,
                origin: '37.772886,-122.423771',
                destination: '37.871601,-122.269104'
              },
              function(err, data) {
                if (err) return console.log(err);
                console.log(data);
              })*/
          } km
          </Text>
          <Text>Time: {geolib.convertUnit("km",geolib.getDistance(
            this.state.focusedLocation,
            index.coordinate)*12,1) } min</Text>
          </TouchableOpacity>
        </View>
        )}
        </View>
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
  Kiosk: {
    width: '100%'
  },
  listItem: {
    width: "100%",
    paddingTop: 0,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#eee",
  },
  KioskTitile: {
    width: "100%",
    flexDirection: "row",
  },
  KioskName: {
    width: "50%",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  }
});
