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
    Link,
    KeyboardAvoidingView,
    Input,
    FormControl,
    Stack,
    WarningOutlineIcon


} from "native-base";

import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';




export default function Login({ navigation }) {
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const [id_code, setid_code] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [statusLogin, setstatusLogin] = React.useState("");
    var userError = false
    var pwsError = false
    if(statusLogin.warning_error == "incorrect password"){
        var pwsError = true
    }else{
        var pwsError = false
    }
    if(statusLogin.warning_error == "user does not exist"){
        var userError = true
    }else{
        var userError = false
    }
  



    function Login() {
        axios
        .get("http://192.168.1.15:10004/portaria/user/login/", {
          params: {
            id_code: id_code,
            password: password
          },
        })
        .then(function (response) {
          setstatusLogin(response.data);
          if(response.data.session_token !== undefined){
           
                navigation.navigate("HomeScreen")
          }
        });


    }


    return (
        <NativeBaseProvider>
            <Actionsheet isOpen={isOpen} onClose={onClose} >
                <Actionsheet.Content>

                    <KeyboardAvoidingView h={{
                        base: "362px",
                        lg: "auto",

                    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <Center marginBottom={95}>
                            <VStack flex="1" justifyContent="flex-end" w="100%" maxW="300">
                                <Heading mb="3">Entrar</Heading>
                                <FormControl isInvalid={userError}>
                                    <Stack >
                                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                            Usuário não encontrado
                                        </FormControl.ErrorMessage>
                                        <Input w={300} mt="1" mb="5" type="username" placeholder="Identificação"
                                            onChangeText={(value) => setid_code(value)}
                                        ></Input>
                                    </Stack>
                                </FormControl>
                                <FormControl isInvalid={pwsError}>
                                    <Stack >
                                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                            Senha incorreta
                                        </FormControl.ErrorMessage>
                                        <Input mt="1" mb="5" type="password" placeholder="Senha"
                                            onChangeText={(value) => setPassword(value)}
                                        ></Input>
                                    </Stack>
                                </FormControl>

                                <Button mb="4" bg={'green.500'} colorScheme={'green'} shadow={1} onPress={()=> Login()}>Entrar</Button>

                            </VStack>
                        </Center>
                    </KeyboardAvoidingView>
                    <Center>
                        <Text>Alternativas</Text>
                    </Center>
                    <Center marginTop={1}>
                        <HStack space={3}>
                            <Center>
                                <Button shadow={1} onPress={() => alert('Login por QRCode ainda não está disponível')} w={75} h={51} bg={'green.500'} colorScheme={'green'} startIcon={<AntDesign name="qrcode" size={40} color="black" />}></Button>
                                <Text> QRCode</Text>
                            </Center>
                            <Center>
                                <Button shadow={1} onPress={() => alert('Login por assinatura digital está desabilitado')} w={75} h={51} bg={'green.500'} colorScheme={'green'} startIcon={<AntDesign name="user" size={40} color="black" />}></Button>
                                <Text>AD</Text>
                            </Center>
                        </HStack>
                    </Center>


                </Actionsheet.Content>
            </Actionsheet>
            <Box w={'100%'} h={'100%'} safeArea justifyContent="space-between">
                <Box marginTop={'20%'} p={7}>
                    <Image source={{
                        uri: "https://www.ifpi.edu.br/topo_ifpi_pedroii.png"
                    }} alt="Alternate Text" size={83} />
                    <Center marginTop={10}>
                        <Heading>SISTEMA DE PORTARIA IFPI</Heading>
                    </Center>
                </Box>





                <Box w={'100%'}>
                    <Center marginBottom={21}>
                        <Button shadow={2} onPress={() => onOpen()} w={210} h={51} bg={'green.500'} colorScheme={'green'} >Entrar</Button>
                    </Center>
                    <Center>
                        <Link href="https://github.com/birdra1n">Desenvolvido por BirdRa1n</Link>
                    </Center>
                </Box>
            </Box>
        </NativeBaseProvider>
    )
}