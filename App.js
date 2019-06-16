import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';

export default function App() {

  const [mapRegion, setMapRegion] = useState({coords: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  }});
  const [hasLocationPermissions, setPermissions] = useState(false);
  const [locationResult, setLocation] = useState(null);
  const [LatLng, setLatLng] = useState({
    coordinate:{
      latitude: 0,
      longitude: 0
    }
  });

  useEffect(() => {
    _getLocationAsync();
  })

  _onMapRegionChange = mapRegion => {
    setMapRegion({mapRegion});
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setLocation('Permission to access location was denied');
    } else {
      setPermissions(true);
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(JSON.stringify({ location }));
    setMapRegion({ 
      coords: { 
        latitude: location.coords.latitude, 
        longitude: location.coords.longitude, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421 
      } 
    });

    setLatLng({
      coordinate: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Pan, zoom, and tap on the map!</Text>
      {
        locationResult === null ? 
        <Text>Finding your current location ...</Text> :
        hasLocationPermissions === false ?
        <Text>Location permissions are not granted !</Text> :
        mapRegion === null ?
        <Text>Map region doesnt exist !</Text> :
        <MapView
          liteMode={true}
          mapType='satellite'
          showsUserLocation={true}
          followsUserLocation={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          style={{ alignSelf: 'stretch', height: 400 }}
          initialRegion={mapRegion.coords}
          onRegionChange={this._onMapRegionChange}>
          <MapView.Marker
            draggable
            coordinate={LatLng.coordinate}
            title = 'My Location'
            description = "FPT Polytechnic"
          />
        </MapView>
      }
      <Text style={styles.position}>Location: {locationResult}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  position: {
    marginTop: 12,
  }
});
