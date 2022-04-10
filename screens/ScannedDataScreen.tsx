import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';

export default function EditProductData() {
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: "25%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


/*
<Text style={styles.title}>Tab Two</Text>
<View style={styles.separator} lightColor="#eee" darkColor="#f2f3f4" />
<EditScreenInfo path="/screens/TabTwoScreen.tsx" />
*/