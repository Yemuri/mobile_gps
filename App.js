import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

export default function App() {
  const [localizacao, setLocalizacao] = useState(null);

  const mapaRef = useRef(MapView);

  useEffect(() => {
    async function reqPerLoc() {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const posicaoAtual = await getCurrentPositionAsync();
        setLocalizacao(posicaoAtual);
      }
    }
    reqPerLoc();
  }, []);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#000000"} barStyle="light-content" />
      {localizacao && (
        <MapView
          style={styles.mapView}
          initialRegion={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          <Marker
            coordinate={{
              latitude: localizacao.coords.latitude,
              longitude: localizacao.coords.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    height: "100%",
    width: "100%",
  },
});
