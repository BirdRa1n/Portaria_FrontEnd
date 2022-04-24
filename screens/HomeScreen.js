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
} from "native-base";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';



function jajjs() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Historico", {
            itemId: 86,
            otherParam: "anything you want here",
          });
        }}
      />
    </View>
  );
}
function ListKeys() {
  let [service, setService] = React.useState("");
  let [HomeKeyList, setHomeKeyList] = React.useState("");

  async function getChaves() {
    try {
      const response = await axios.get('http://192.168.1.15:10004/portaria/chaves');
      console.log(response.data);
      setHomeKeyList(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getChaves();
  }, []);

  function SolicitarChave(Sala) {
    alert(Sala)
  }



  return (
    <FlatList
      w={'95%'}
      h={'80%'}
      numColumns={3}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: "space-around",
        marginLeft: 10,
        marginBottom: 10
      }}
      marginTop={2}
      showsVerticalScrollIndicator={false}
      data={HomeKeyList}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => SolicitarChave(item.Sala)}>
          <View marginBottom={1} alignItems={'center'} bg={"light.50"} borderRadius={5} w={16} h={59} p={1} shadow={0.9}>
            <HStack>
              <VStack>
                <Heading size={"sm"}>
                  Sala
                </Heading>
                <Heading>
                  {item.Sala}
                </Heading>
              </VStack>
            </HStack>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default function HomeScreen({ navigation }) {

  return (
    <NativeBaseProvider>
      <View w={"100%"} h={"100%"} bg={'light.100'}>
        <Box p={2} safeArea>
          <Center>
            <Button w={75} bg={'green.500'} colorScheme={'green'} startIcon={<AntDesign name="qrcode" size={40} color="black" />}></Button>
            <Text>Checkar QRCode</Text>
          </Center>
        </Box>
        <Center>
          <Heading size={'sm'} marginBottom={2}>
            Salas disponíveis 
          </Heading>
        </Center>
        <ListKeys />
      </View>
    </NativeBaseProvider>
  );
}
