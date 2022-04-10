import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
     <View
        style={
          {
            display: 'flex',
            marginTop: 15
          }
        }
      >

        <Text style={styles.title}>Código</Text>
      <TextInput keyboardType='number-pad'
        style={
          {
            borderColor: "#f1f2f3",
            borderStyle: "solid",
            borderWidth: 3,

            width: 290,
            color: "#f1f2f3",
            paddingStart: 7,
            
          }
        }
      />

      </View>

      <View
        style={
          {
            display: 'flex',
            marginTop: 15
          }
        }
      >

        <Text style={styles.title}>Código de Barras</Text>
      <TextInput keyboardType='number-pad'
        style={
          {
            borderColor: "#f1f2f3",
            borderStyle: "solid",
            borderWidth: 3,

            width: 290,
            color: "#f1f2f3",
            paddingStart: 7,
          }
        }
      />

      </View>

      <View
        style={
          {
            display: 'flex',
            marginTop: 15
          }
        }
      >

        <Text style={styles.title}>Descrição</Text>
      <TextInput keyboardType='number-pad'
        style={
          {
            borderColor: "#f1f2f3",
            borderStyle: "solid",
            borderWidth: 3,

            width: 290,
            color: "#f1f2f3",
            paddingStart: 7,
          }
        }
      />

      </View>

      <View
        style={
          {
            display: 'flex',
            marginTop: 15
          }
        }
      >

        <Text style={styles.title}>Descrição Unidade</Text>
      <TextInput keyboardType='number-pad'
        style={
          {
            borderColor: "#f1f2f3",
            borderStyle: "solid",
            borderWidth: 3,

            width: 290,
            color: "#f1f2f3",
            paddingStart: 7,
          }
        }
      />

      </View>

        <TouchableOpacity
          style={
            {
              backgroundColor: "#0b5488",
              height: 60,
              width: 190,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
              marginTop: 40
            }
          }
        >
          <Text>Cadastrar Novo Produto</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


/*

 <Text style={styles.title}>Modal</Text>



      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />

      Use a light status bar on iOS to account for the black space above the modal 
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> }
*/