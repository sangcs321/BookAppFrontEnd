import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/Screens/Login/LoginScreens';
import RegisterScreen from './src/Screens/Register/RegisterScreen';
import StackLayout from './src/Navigation/StackNavigator';

export default function App() {
  return (
    <StackLayout />
  );
}


