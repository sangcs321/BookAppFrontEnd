import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/Screens/Login/LoginScreens';
import RegisterScreen from './src/Screens/Register/RegisterScreen';
import StackLayout from './src/Navigation/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store/Store';

export default function App() {
  return (
  
    <GestureHandlerRootView>
      <Provider store={store}>
        <StackLayout />
      </Provider>
    </GestureHandlerRootView>
  );
}


