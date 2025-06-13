
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
import ManageProduct from '../Screens/AdminScreen/ManageScreen/ManageProduct';
import ManageAccount from '../Screens/AdminScreen/ManageScreen/ManageAccount';
import ManageOrder from '../Screens/AdminScreen/ManageScreen/ManageOrder';
import BottomTabAdminNavigator from './BottomTabAdminNavigator';
import DetailAccount from '../Screens/AdminScreen/ManageScreen/DetailAccount';
import DetailOrder from '../Screens/AdminScreen/ManageScreen/DetailOrder';
import EditProduct from '../Screens/AdminScreen/ManageScreen/EditProduct';
import ProductDetails from '../Screens/ProductDetails/ProductDetails';
import PayScreen from '../Screens/PayScreen/PayScreen';
import EditProfileScreen from '../Screens/EditProfileScreen/EditProfileScreen';
import CategoriesScreen from '../Screens/CategoryScreen/CategoriesScreen';

type StackParamList = {
    Login: any;
    Register: any;
    Forget: any;
    Home: any;
    Main: any;
    Profile: any;
    Cart: any;
    DetailAccount: any;
    OrderDetail: any;
    DetailOrder: any;
    EditProduct: any;
    MainAdmin: any;
    Detail: any;
    Payment: any;
    EditProfile:any;
    Category: any;
}

const Stack = createNativeStackNavigator<StackParamList>();
const StackLayout = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Forget" component={ForgetPwScreen} />
                <Stack.Screen
                    options={{
                        animation: 'fade',
                    }}
                    name="Main"
                    component={BottomTabNavigator}
                />
                
                <Stack.Screen name="MainAdmin" component={BottomTabAdminNavigator} />
                <Stack.Screen name="DetailAccount" component={DetailAccount} />
                <Stack.Screen
                    options={{
                        animation: 'fade',
                    }}
                    name="DetailOrder"
                    component={DetailOrder}
                />
                <Stack.Screen name="Detail" component={ProductDetails} />
                <Stack.Screen name="EditProduct" component={EditProduct} />
                <Stack.Screen name="Payment" component={PayScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="Category" component={CategoriesScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default StackLayout;
