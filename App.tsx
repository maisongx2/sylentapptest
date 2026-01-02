/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigator } from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { Theme } from './src/assets/globalTheme/themes/themeProvider';
import { Modal } from './src/routes/Generic/Modal';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Theme>
          <RootStackNavigator />
          <Modal />
        </Theme>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
