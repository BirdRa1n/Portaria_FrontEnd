import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function QR({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const dataqr = JSON.parse(data)
    if (dataqr.QRtoken !== undefined) {
      Login(dataqr.QRtoken)
    } else {
      alert("QRCode inválido")
    }

  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@data_user', jsonValue)
    } catch (e) {
      console.log('erro ao efetuar o estado ' + e)
    }
  }

  function Login(value) {

    axios
      .get("https://birdra1n.x10.bz/IFPI_PORTARIA/api/user/login/", {
        params: {
          method: 'QRCode',
          QRData: value,
        },
      })
      .then(function (response) {
        storeData(response.data)

        if (response.data.token_session !== undefined) {
          navigation.navigate('HomeScreen');
        }


      });

  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  box:{
    width: '60%',
    height: '80%'
  }
});
