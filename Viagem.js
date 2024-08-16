import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      try {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
      } catch (error) {
        console.error("Erro ao obter a localização:", error);
      }
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    const watchPosition = async () => {
      await watchPositionAsync({
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1
      }, (newLocation) => {
        console.log("NOVA LOCALIZAÇÃO!", newLocation);
        setLocation(newLocation);
      });
    };

    watchPosition();
  }, []);

  return (
    <View style={styles.container}>
      {
        location &&
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%'
  }
});
