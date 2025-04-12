import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../Utils/Constants/Colors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Screens/HomeScreen/HomeScreens';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CartScreen from '../Screens/CartScreen/CartScreen';

import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import {useSelector} from 'react-redux';

import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
 
  const navigation = useNavigation<any>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: Colors.darkGrey,
        tabBarHideOnKeyboard: true, // Ẩn tab bar khi bàn phím hiện
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <AntDesignIcon name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tôi"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tôi',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="user-circle" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Thông báo"
        component={Notification}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          tabBarLabel: 'Thông báo',
          headerStyle: {
            elevation: 4, // Thêm bóng cho Android
            shadowColor: '#000', // Thêm bóng cho iOS
            shadowOffset: {width: 0, height: 2}, // Định hướng bóng
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
          headerRight: () => {
            return (
              <Pressable
                style={{marginRight: 10}}
                onPress={() =>
                  navigation.navigate('Chat', {
                    // chatroomId: user.id + 'admin',
                    // userId: user.id,
                  })
                }>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  color={Colors.tint}
                  size={24}
                />
              </Pressable>
            );
          },
          tabBarBadge: data?.length,
        }}
      /> */}
      <Tab.Screen
        name="Giỏ hàng"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 4, // Thêm bóng cho Android
            shadowColor: '#000', // Thêm bóng cho iOS
            shadowOffset: {width: 0, height: 2}, // Định hướng bóng
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({color, size}) => (
            <AntDesignIcon name="shoppingcart" color={color} size={size} />
          ),
        //   tabBarBadge: cart?.length,
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;
