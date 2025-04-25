import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../Utils/Constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/Store/Store';
import MananageScreen from '../Screens/AdminScreen/ManageScreen/ManageScreen';
import DashboardScreen from '../Screens/AdminScreen/DashboardScreen/DashboardScreen';
import {Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopTabViewDashBoardAdmin from './TopTabViewDashBoardAdmin';
// import {closeSocketConnection} from '../../WebSocket';
const Tab = createBottomTabNavigator();

function BottomTabAdminNavigator() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: Colors.darkGrey,
        tabBarHideOnKeyboard: true, // Ẩn tab bar khi bàn phím hiện
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        name="Quản lý"
        component={MananageScreen}
        options={{
          tabBarLabel: 'Quản lý',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name={'manage-accounts'} color={color} size={size} />
          ),
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('ChatRoom');
                }}
                style={{marginLeft: 10}}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  color={Colors.tint}
                  size={24}
                />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  AsyncStorage.removeItem('authToken');
                //   closeSocketConnection();
                  navigation.replace('Login');
                }}
                style={{marginRight: 10}}>
                <MaterialIcons name={'logout'} size={27} color={'red'} />
              </Pressable>
            );
          },
        }}
      />
      <Tab.Screen
        name="Thống kê"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Thống kê',
          tabBarIcon: ({color, size}) => (
            <AntDesign name={'barschart'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabAdminNavigator;