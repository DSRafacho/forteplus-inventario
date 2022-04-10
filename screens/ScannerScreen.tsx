import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, PermissionsAndroid, ActivityIndicator } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { insertProduct } from '../database/sql_runner';
import db, { openDatabase } from '../database/db'
import querys from '../database/querys';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const colorScheme = useColorScheme();

  const GRANTED = PermissionsAndroid.RESULTS.GRANTED

  const requestFolderPermission = async () => {
    const acessFolder = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (acessFolder.granted) {
      const folderChoosedUri = acessFolder.directoryUri;
      const folderFiles = await FileSystem.StorageAccessFramework.readDirectoryAsync(folderChoosedUri);
      const forteplusFileUri = folderFiles.find(file => file.match('forteplus.csv')) as string
      const productsCsvAsString = await FileSystem.readAsStringAsync(forteplusFileUri).then(csvStr => csvStr)

      if (typeof productsCsvAsString === 'string') {
        var formatedProductsString = productsCsvAsString.split('\n')
        const formatedProductsArray = formatedProductsString.filter((_, index) => index > 0)

        for (let i in formatedProductsArray) {
          const productInfosStr = formatedProductsArray[i]
          const productInfosArray = productInfosStr.split(',')

          await insertProduct(productInfosArray)
        }
      }
    }
  }

  const requestCameraPermission = async () => {
    const permissionCamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permissão para Acesso da Câmera',
        message: 'O acesso à câmera é necessário para utilizar o serviço do leitor de código de barras',
        buttonNeutral: 'Cancelar', buttonNegative: 'Não', buttonPositive: 'Sim',
      }
    )

    // @ts-ignore
    setHasPermission(permissionCamera === GRANTED);

    /* switch (permissionCamera) {
      case GRANTED:
        // @ts-ignore
        setHasPermission(GRANTED);
        break;

      case null:
        // @ts-ignore
        setHasPermission(null);
        break;

      // @ts-ignore
      case false:
        // @ts-ignore
        setHasPermission(false);
        break;

      default:
        break;
    } */
  }

  useEffect(
    () => {
      (
        async () => {

          /* Pedindo permissão da leitura das pastas do celular */
          await requestCameraPermission()

          /* Pedindo permissão da câmera */
          // await requestFolderPermission()
        }
      )()
    }, [])

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    alert(`Tipo: ${type}, dado: ${data}`);
  };

  const styles = StyleSheet.create(
    {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark.background,
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

      maintext: {
        fontSize: 16,
        margin: 20,
      },

      barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        width: 500,
        overflow: 'hidden',
        borderRadius: 30,
        
      },

      data: {
        marginTop: 32
      },

      dataPattern: {
        fontSize: 18,
        margin: 3,
      },

      inputPatter: {
        borderWidth: 5,
        borderColor: 'orange',
        borderStyle: 'solid',
        paddingStart: 12
      }
    }
  );

  if (hasPermission === null) return (
    <View style={styles.container}>
      <ActivityIndicator size={115} color={Colors[colorScheme].tint} />
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors[colorScheme].tint }} >Pedindo permissão da câmera...</Text>
    </View>
  )

  if (hasPermission === false) return (
    <View style={styles.container}>
      <Text>Para poder utilizar o leitor de código de barras é necessário dar acesso ao app para acessar a câmera</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barcodebox}
        // style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Clique para escanear de novo'} onPress={() => setScanned(false)} />}
    </View>
  );
}
