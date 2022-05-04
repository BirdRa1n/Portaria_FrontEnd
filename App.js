import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Solicitacoes from './screens/Solicitacoes';
import { Account } from './screens/Account';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './screens/Login';
import QR from './screens/QR';
import { SSRProvider } from '@react-aria/ssr'


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chaves') {
            iconName = focused
              ? 'ios-home-outline'
              : 'ios-home-sharp';
          } else if (route.name === 'Solicitações') {
            iconName = focused ? 'reorder-three-sharp' : 'reorder-three-sharp';
          } else if (route.name === 'Conta') {
            iconName = focused ? 'person-circle-outline' : 'person-circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Chaves" component={HomeScreen} options={{ headerShown: false, headerTitle: 'Portaria' }} />
      <Tab.Screen name="Solicitações" component={Solicitacoes} />
      <Tab.Screen name="Conta" component={Account} ></Tab.Screen>
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <SSRProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Login}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="Solicitações" component={Solicitacoes} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="QR" component={QR} />
        </Stack.Navigator>
      </NavigationContainer>
    </SSRProvider>
  );
}