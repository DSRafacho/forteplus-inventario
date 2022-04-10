import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Scanner: {
            screens: {
              ScannerScreen: 'one',
            },
          },
          LoadedProducts: {
            screens: {
              LoadedProductsScreen: 'two',
            },
          },
          EditProductData: {
            screens: {
              EditProductDataScreen: 'three',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
