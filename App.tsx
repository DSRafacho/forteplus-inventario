import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store from './store/setup';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) return null;
  else return (
    <SafeAreaProvider>
      <Provider store={store}>  
        <Navigation colorScheme={colorScheme} />
        <StatusBar
          backgroundColor={colorScheme === 'dark' ? "#012a4a" : "#f1f1f3"}
          style={colorScheme === 'dark' ? 'light' : 'dark'}
          animated={true}
        />
      </Provider>
    </SafeAreaProvider>
  );

}
