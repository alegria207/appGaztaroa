import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
        }}
      />
    </Stack.Navigator>
  );
}

function HomeNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Campo Base"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
      >
      <Stack.Screen
        name="Campo Base"
        component={Home}
        options={{
          title: 'Campo Base',
        }}
      />
    </Stack.Navigator>
  );
}

function ContactoNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
      >
      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
  );
}

function QuienesSomosNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Quiénes somos"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
      >
      <Stack.Screen
        name="Quiénes somos"
        component={QuienesSomos}
        options={{
          title: 'Quiénes somos',
        }}
      />
    </Stack.Navigator>
  );
}



function DrawerNavegador() {
  return (
      <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#c2d3da',
      }}
      initialRouteName="Campo Base"
      >
        <Drawer.Screen name="Campo Base" component={HomeNavegador} />
        <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador} />
        <Drawer.Screen name="Calendario" component={CalendarioNavegador} />
        <Drawer.Screen name="Contacto" component={ContactoNavegador} />
      </Drawer.Navigator>
  );
}


class Campobase extends Component {

  render() {

    return (
      <NavigationContainer>
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <DrawerNavegador />
        </View>      
      </NavigationContainer>
    );
}
}

export default Campobase;