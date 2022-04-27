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
  let [ActionsheetHallInfo, setActionsheetHallInfo] = React.useState("");




  function getKeys() {
    axios
      .get("http://192.168.1.15:10004/portaria/keys", {
        params: {
          filter: "free"
        },
      })
      .then(function (response) {
        setHomeKeyList(response.data);
        console.log(response.data[1])
      });

  }
  useEffect(() => {
    getKeys();
  }, []);
  const onRefresh = () => {
    setIsRefreshing(true)
    getKeys()
    setIsRefreshing(false)
  }
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();


  function ActionSheetRequestKey(hall, description, status, conveyer) {
    onOpen()
    const info = {
      hall: hall,
      description: description,
      status: status,
      conveyer, conveyer
    }
    setActionsheetHallInfo(info)
  }


  return (
    <NativeBaseProvider>
      <View w={"100%"} h={"100%"} bg={'light.100'}>
        <Box p={2} safeArea shadow={1}>
          <HStack>
            <Image source={{
              uri: "https://pbs.twimg.com/profile_images/438771627854024704/Az4OY07a_400x400.png"
            }} alt="Alternate Text" size="sm" />
            <Center marginLeft={'18%'}>
              <Button onPress={() => alert('Leitura de QRCode ainda não está disponível')} w={75} h={51} bg={'green.500'} colorScheme={'green'} startIcon={<AntDesign name="qrcode" size={40} color="black" />}></Button>
              <Text>Checkar QRCode</Text>
            </Center>
          </HStack>

        </Box>




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
            <TouchableOpacity onPress={() => ActionSheetRequestKey(item.hall, item.description, item.status, item.conveyer)}>
              <Box marginBottom={1} alignItems={'center'} bg={"light.50"} borderRadius={5} w={16} h={59} p={1} shadow={1}>
                <HStack>
                  <VStack>
                    <Heading size={"sm"}>
                      Sala
                    </Heading>
                    <Heading>
                      {item.hall}
                    </Heading>
                  </VStack>
                </HStack>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />



        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Box w="100%" px={4} justifyContent="center">
                <Heading fontSize={18}>Deseja solicitar a chave da sala {ActionsheetHallInfo.hall}?</Heading>
                <Text marginBottom={21} fontSize={'md'}>{ActionsheetHallInfo.description}</Text>
                <Center marginBottom={50}>
                  <HStack space={2}>
                    <Button onPress={() => alert('Você não tem permissão para solicitar chaves OK?')} w={120} bg={'green.700'} colorScheme={'green'}>Sim</Button>
                    <Button onPress={() => onClose(false)} w={120} bg={'white'} shadow={1} _text={{ color: 'black' }} colorScheme={'red'}>Não</Button>
                  </HStack>
                </Center>
              </Box>

            </Actionsheet.Content>
          </Actionsheet>
        </Center>

      </View>
    </NativeBaseProvider>
  );
}
