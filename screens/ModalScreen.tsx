import { RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabParamList, RootTabScreenProps } from '../types';

export default function ModalScreen(
  navigateConfig: { route: { params: { codigo: string, codigo_barras: string, descricao: string, desc_unidade: string } } }
) {
  console.log(navigateConfig.route.params.codigo);
  console.log(navigateConfig.route.params.codigo_barras);


  const [codigo, setCodigo] = useState()
  const [codigoBarras, setCodigoBarras] = useState()
  const [descricao, setDescricao] = useState()
  const [descUnidade, setDescUnidade] = useState()

  useEffect(
    () => {

      //@ts-ignore
      setCodigo(String(navigateConfig.route.params.codigo))
      //@ts-ignore
      setCodigoBarras(String(navigateConfig.route.params.codigo_barras))
      //@ts-ignore
      setDescricao(navigateConfig.route.params.descricao)
      //@ts-ignore
      setDescUnidade(navigateConfig.route.params.desc_unidade)
    }
  )

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
        <TextInput keyboardType="default"
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
          value={codigo}
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
        <TextInput keyboardType='default'
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
          value={codigoBarras}
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
        <TextInput keyboardType='default'
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
          value={descricao}
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
        <TextInput keyboardType='default'
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
          value={descUnidade}
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