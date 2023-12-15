import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";

import { StyleSheet, View, StatusBar, Text } from "react-native";
import {
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export default function AppOld() {
  const [localizacao, setLocalizacao] = useState(null);
  const [loading, setLoading] = useState(false);

  async function requisitarLocal() {
    const { granted } = await requestBackgroundPermissionsAsync();
    if (granted) {
      const positionAtual = await getCurrentPositionAsync();
      setLocalizacao(positionAtual);
      setLoading(true);
    }
  }

  useEffect(() => {
    requisitarLocal();
  }, [localizacao]);

  if (loading === false) {
    return (
      <View>
        <Text>Aguarde...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#D9900F"
        barStyle="light-content"
        translucent={false}
      />
      <MapView
        style={styles.mapView}
        loadingEnable={true}
        initialRegion={{
          latitude: localizacao.coords.latitude,
          longitude: localizacao.coords.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
      ></MapView>
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
