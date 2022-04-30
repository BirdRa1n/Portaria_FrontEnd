import * as React from "react";
import {
  Box,
  Center,
  Heading,
  HStack,
  NativeBaseProvider,
  View,
  VStack,
  Image,
  FlatList,
  Text,
  Spacer,
  Avatar,
  Button,
  Select,
  CheckIcon,
  useDisclose,
  Actionsheet,
  Divider
} from "native-base";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function Account({ navigation }) {
  const [dataUser, setDataUser] = React.useState({});
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@data_user')
      setDataUser(JSON.parse(jsonValue))
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <NativeBaseProvider>
      <Box w={'100%'} h={'31%'} maxH={180} >
        <Center top={2}>
          <Image source={{
            uri: dataUser.photo
          }} alt="Alternate Text" size="xl" borderRadius={10} />
          <Text top={1}>{dataUser.name}</Text>
        </Center>
      </Box>
      <Box top={2}>
        <TouchableOpacity>
          <Box w={'100%'} h={'65%'} bg={'light.50'}></Box>
        </TouchableOpacity>
      </Box>
    </NativeBaseProvider>
  );
}