import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {

  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [location, setLocation] = useState(null);
  const [mess, setMessage] = useState(null);

  useEffect(() => {
    _getLocationAsync();
  })

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setMessage('Permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation({ location });
  };

  let text = 'Waiting..';
  if (mess) {
    text = {mess};
  } else if (location) {
    text = JSON.stringify({location});
    parseJsonAsyncFunc(text).then(jsonData => setLong(jsonData.location.location.coords.longitude));
  }

  function parseJsonAsyncFunc(jsonString){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(jsonString));
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text>{mess}</Text>
      <Button title='Get GPS' onPress={() => {
        alert(long);
      }} />
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
    textAlign: 'center',
  },
});
