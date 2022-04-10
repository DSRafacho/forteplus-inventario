/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, } from '@react-navigation/native'; //DarkTheme
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Image } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ScannerScreen from '../screens/ScannerScreen';
import EditProductData from '../screens/ScannedDataScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { DarkTheme, LightTheme } from '../constants/Themes';
import LoadedProducts from '../screens/LoadedProducts';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Scanner"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint, // Cor do icon quando ativado
      }}>
      <BottomTab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={
          ( { navigation }: RootTabScreenProps<'Scanner'> ) => (
            {
              title: 'Scanner',
              tabBarIcon: ({ color }) => <TabBarIcon name='qrcode' color={color} />,
              headerRight: () => (
                <Pressable
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <Image
                    source={ require('../assets/images/android-icon-48x48.png') }
                    style={{ marginEnd: 15 }} />
                </Pressable>
              ),
            }
            )
          }
      />
      <BottomTab.Screen
        name="LoadedProducts"
        component={LoadedProducts}
        options={
          ( { navigation }: RootTabScreenProps<'LoadedProducts'> ) => (
            { 
              title: 'Produtos',
              tabBarIcon: ({ color }) => <TabBarIcon name='shopping-cart' color={color} />, 
              headerRight: () => (
                <Pressable
                  onPress={() => navigation.navigate('Modal')}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <FontAwesome
                    name='cart-plus'
                    size={25}
                    color={ colorScheme === 'dark' ? "#f1f1f3" : "#0c609c"}
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
              ),
            }
            )
          }
      />
      {/*<BottomTab.Screen
        name="EditProductData"
        component={EditProductData}
        options={
          ( { navigation }: RootTabScreenProps<'EditProductData'> ) => (
            { 
              title: 'Editar dados',
              tabBarIcon: ({ color }) => <TabBarIcon name='edit' color={color} />,
            }
            )
          }
      />*/}
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
