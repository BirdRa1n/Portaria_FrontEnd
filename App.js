import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Historico from './screens/Historico';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const my_id = "12"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function NavScreens(){
  return (  
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chaves') {
            iconName = focused
            ? 'home'
            : 'home';
          } else if (route.name === 'Histórico') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Chaves" component={HomeScreen}  options={{headerShown: false, headerTitle:'Portaria'}}/>
      <Tab.Screen name="Histórico" component={Historico} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}
export default function App() {
  return (  
    <NavScreens></NavScreens>
  );
}