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
  Divider,
  Stack,
  Alert,
  ZStack,
  IconButton,
  Collapse,
  CloseIcon
} from "native-base";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ route, navigation }) {
  const [dataUser, setdataUser] = React.useState({});
  let [HomeKeyList, setHomeKeyList] = React.useState("");
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [ActionsheetHallInfo, setActionsheetHallInfo] = React.useState("");
  const [show, setShow] = React.useState(true);


  function getKeys() {
    axios
      .get("https://birdra1n.x10.bz/IFPI_PORTARIA/api/keys/list", {
        params: {
          filter: "all",
        },
      })
      .then(function (response) {
        setHomeKeyList(response.data);
        console.log(response.data[1]);
      });
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@data_user");
      setdataUser(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getKeys();
    getData();
  }, []);
  const onRefresh = () => {
    setIsRefreshing(true);
    getKeys();
    setIsRefreshing(false);
  };
  const { isOpen, onOpen, onClose } = useDisclose();

  function ActionSheetRequestKey(hall, description, status, conveyer) {
    onOpen();
    const info = {
      hall: hall,
      description: description,
      status: status,
      conveyer,
      conveyer,
    };
    setActionsheetHallInfo(info);
  }
  //console.log(dataUser.signature_digital)

  function RequestKey(signature_digital, hall) {
    axios
      .get("https://birdra1n.x10.bz/IFPI_PORTARIA/api/keys/request", {
        params: {
          signature_digital: signature_digital,
          hall: hall,
        },
      })
      .then(function (response) {
        console.log(response.data);
        let responseRequest = response.data;
        if (
          responseRequest.warning_error !== undefined &&
          responseRequest.warning_error == "Without permission"
        ) {
          alert("Voc?? n??o tem permiss??o para solicitar essa chave");
        }
        if (
          responseRequest.warning_error !== undefined &&
          responseRequest.warning_error == "room is busy"
        ) {
          alert("Algu??m j?? reservou essa chave!");
        }

        if (
          responseRequest.success !== undefined &&
          responseRequest.success == "successfully reserved key"
        ) {
          alert(
            "A chave " +
              hall +
              " foi reservada com sucesso\n" +
              "C??digo de reserva: " +
              responseRequest.code_request
          );
        }
      });
  }

  function Example() {
    const getTextColor = (variant) => {
      switch (variant) {
        case "left-accent":
        case "top-accent":
        case "subtle":
          return "coolGray.800";

        case "solid":
          return "warmGray.50";
      }
    };

    return (
      <Collapse isOpen={show}>
        <Stack space={3}>
          <Text bold fontSize="xl"  textAlign="center"></Text>
          <Alert
            w="100%"
            variant="left-accent"
            colorScheme="success"
            status="success"
          >
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon />
                  <Text color={"black"}>Selection successfully moved!</Text>
                </HStack>
                <IconButton variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => setShow(false)} />
              </HStack>
              
            </VStack>
          </Alert>
        </Stack>
        </Collapse>

    );
  }

  return (
    <NativeBaseProvider>
      <View w={"100%"} h={"100%"} bg={"light.100"}>
        <Box p={2} safeArea shadow={1}>
       <ZStack>
     
            <HStack>
              <Image
                source={{
                  uri: "https://pbs.twimg.com/profile_images/438771627854024704/Az4OY07a_400x400.png",
                }}
                alt="Alternate Text"
                size="sm"
              />
              <View marginLeft={"2%"}>
                <Heading size={"sm"}>{dataUser.name}</Heading>
                <Text fontSize={10}>{dataUser.description}</Text>
                <Text fontSize={10} top={2}>
                  INSTITUTO FEDERAL CAMPUS PEDRO II
                </Text>
              </View>
            </HStack>
            <Example/>
            </ZStack>
        </Box>
     

        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          w={"95%"}
          h={"80%"}
          numColumns={3}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-around",
            marginLeft: 10,
            marginBottom: 10,
          }}
          marginTop={2}
          showsVerticalScrollIndicator={false}
          data={HomeKeyList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                ActionSheetRequestKey(
                  item.hall,
                  item.description,
                  item.status,
                  item.conveyer
                )
              }
            >
              <Box
                marginBottom={1}
                alignItems={"center"}
                bg={"light.50"}
                borderRadius={5}
                w={16}
                h={59}
                p={1}
                shadow={1}
              >
                <HStack>
                  <VStack>
                    <Heading size={"sm"}>Sala</Heading>
                    <Heading>{item.hall}</Heading>
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
                <Heading fontSize={18}>
                  Deseja solicitar a chave da sala {ActionsheetHallInfo.hall}?
                </Heading>
                <Text marginBottom={21} fontSize={"md"}>
                  {ActionsheetHallInfo.description}
                </Text>
                <Center marginBottom={50}>
                  <HStack space={2}>
                    <Button
                      onPress={() =>
                        RequestKey(
                          dataUser.signature_digital,
                          ActionsheetHallInfo.hall
                        )
                      }
                      w={120}
                      bg={"green.700"}
                      colorScheme={"green"}
                    >
                      Sim
                    </Button>
                    <Button
                      onPress={() => onClose(false)}
                      w={120}
                      bg={"white"}
                      shadow={1}
                      _text={{ color: "black" }}
                      colorScheme={"red"}
                    >
                      N??o
                    </Button>
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
