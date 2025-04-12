
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../Screens/Login/LoginScreens';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../Screens/Register/RegisterScreen';
import ForgetPwScreen from '../Screens/Forget/ForgetScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreens';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import CartScreen from '../Screens/CartScreen/CartScreen';
type StackParamList = {
    Login: any;
    Register: any;
    Forget: any;
    Home: any;
    Main: any;
    Profile: any;
    Cart: any;
}

const Stack = createNativeStackNavigator<StackParamList>();
const StackLayout = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Forget" component={ForgetPwScreen} /> */}
                {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
                <Stack.Screen
                    options={{
                        animation: 'fade',
                    }}
                    name="Main"
                    component={BottomTabNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default StackLayout;
