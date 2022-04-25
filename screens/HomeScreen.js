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


export default function HomeScreen({ navigation }) {
  let [HomeKeyList, setHomeKeyList] = React.useState("");
  let [isRefreshing, setIsRefreshing] = React.useState(false);




  function getChaves() {
    axios
      .get("http://192.168.1.15:10004/portaria/chaves", {
        params: {
          validas: "true"
        },
      })
      .then(function (response) {
        setHomeKeyList(response.data);
        console.log(response.data[1])
      });

  }
  useEffect(() => {
    getChaves();
  }, []);
  const onRefresh = () => {
    setIsRefreshing(true)
    getChaves()
    setIsRefreshing(false)
}

  function SolicitarChave(Sala) {
    alert(Sala)
  }


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



        <FlatList
         onRefresh={onRefresh}
         refreshing={isRefreshing}


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



      </View>
    </NativeBaseProvider>
  );
}
