import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function App() {
  const [state, setState] = useState({
    latitude: 37.485118,
    longitude: -122.149495,
    error: null,
  });

  const getMapRegion = () => ({
    latitude: state.latitude,
    longitude: state.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  useEffect(() => {
    Geolocation.watchPosition(
      position => {
        console.log(position);
        const data = {
          ...state,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        };
        setState(data);
      },
      error => {
        console.log(error);
        const data = {
          ...state,
          error: error.message,
        };
        setState(data);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>kkkkk</Text>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={getMapRegion()}>
        <Marker coordinate={getMapRegion()} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 784,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
