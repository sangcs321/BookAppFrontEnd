import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../Utils/Constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//   import LoadingComponenet from '../../Components/LoadingComponenet';
import * as ImagePicker from 'expo-image-picker'; // Thay đổi import
import { FontSizeText } from '../../Utils/Constants/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../Redux/Store/Store';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearCart } from '../../Redux/Slice/Cart';
import { clearUser } from '../../Redux/Slice/User';
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation<any>();
  const handleSignOut = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            dispatch(clearCart());
            dispatch(clearUser());
            AsyncStorage.removeItem('authToken');
            navigate.replace('Login');
          },
        },
      ],
      { cancelable: true } // Cho phép hủy bằng cách nhấn ra ngoài
    );
  };
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <SafeAreaView>
        <View>
          <Pressable
            style={styles.containAvatar}
            onPress={() => {
              navigate.navigate('EditProfile');
            }}>
            <View>
              <Image
                source={{
                  uri: user.avatar,
                }}
                style={styles.avatarImage}
              />
              <FontAwesome5
                name="pen"
                size={12}
                color={'white'}
                style={styles.btnEdit}
              />
            </View>
            <View style={styles.containInfor}>
              <Text style={styles.txtHello}>Xin chào!</Text>
              <Text style={styles.txtName}>{user?.name}</Text>
            </View>
            <Pressable style={styles.btnChat}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                color={'white'}
                size={24}
              />
            </Pressable>
          </Pressable>

          {!user.verified ? (
            <View style={styles.containConfirm}>
              <MaterialCommunityIcons
                name={'email-outline'}
                size={18}
                color={'#000080'}
                style={{ paddingTop: 7 }}
              />
              <Text style={styles.txtConfirm}>
                Vui lòng xác nhận tài khoản của bạn trong email để xác nhận
                tài khoản và bắt đầu mua hàng.
              </Text>
            </View>
          ) : (
            <></>
          )}

          <View style={styles.containOrder}>
            <Pressable
              style={styles.headerOrder}
              onPress={() => {
                // ForwardOrderPage('Đã giao');
              }}>
              <Text style={styles.txtOrder}>Đơn mua</Text>
              <Text style={styles.txtHistory}>Xem lịch sử mua hàng</Text>
            </Pressable>
            <View style={styles.containStatusOrder}>
              <Pressable
                style={styles.btnStatusOrder}
                onPress={() => {
                  // ForwardOrderPage('Chờ xác nhận');
                }}>
                <AntDesign name="wallet" size={22} color={Colors.black} />
                <Text style={styles.badge}>0
                  {/* {ordersWaiting?.orders.length} */}
                </Text>
                <Text style={styles.txtStatusOrder}>Chờ xác nhận</Text>
              </Pressable>
              <Pressable
                style={styles.btnStatusOrder}
                onPress={() => {
                  // ForwardOrderPage('Chờ lấy hàng');
                }}>
                <AntDesign name="gift" size={22} color={Colors.black} />
                <Text style={styles.badge}>0
                  {/* {orderConfirmed?.orders.length} */}
                </Text>
                <Text style={styles.txtStatusOrder}>Chờ lấy hàng</Text>
              </Pressable>
              <Pressable
                style={styles.btnStatusOrder}
                onPress={() => {
                  // ForwardOrderPage('Đã giao');
                }}>
                <Feather name="truck" size={22} color={Colors.black} />
                <Text style={styles.badge}>0</Text>
                <Text style={styles.txtStatusOrder}>Chờ giao hàng</Text>
              </Pressable>
              <Pressable
                style={styles.btnStatusOrder}
                onPress={() => navigate.navigate('ReviewScreen')}>
                <MaterialCommunityIcons
                  name="star-circle-outline"
                  size={22}
                  color={Colors.black}
                />
                <Text style={styles.badge_2}>0
                  {/* {orderNotRate?.ordersWithoutReviews.length} */}
                </Text>
                <Text style={styles.txtStatusOrder}>Đánh giá</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Pressable style={styles.btnSignOut} onPress={handleSignOut}>
        <Text style={styles.txtSignOut}>Đăng xuất</Text>
      </Pressable>

    </>
  );
};


export default ProfileScreen;
