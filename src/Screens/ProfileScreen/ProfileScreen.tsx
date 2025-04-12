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
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//   import LoadingComponenet from '../../Components/LoadingComponenet';
import * as ImagePicker from 'expo-image-picker'; // Thay đổi import
import { FontSizeText } from '../../Utils/Constants/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../Redux/Store/Store';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
const ProfileScreen = () => {
  // const [imageUri, setImageUri] = useState(null);
  // const [uploadedUrl, setUploadedUrl] = useState(null);

  // const pickImage = async () => {
  //   console.log("pickImage called");
  //   // Yêu cầu quyền truy cập thư viện ảnh
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (permissionResult.granted === false) {
  //     Alert.alert('Permission Denied', 'Permission to access photo library is required!');
  //     return;
  //   }

  //   // Mở thư viện ảnh
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   console.log("ImagePicker result:", result);
  //   if (!result.canceled && result.assets && result.assets.length > 0) {
  //     setImageUri(result.assets[0].uri);
  //     console.log('Image URI set:', result.assets[0].uri);
  //   } else {
  //     console.log('User cancelled or no image selected');
  //   }
  // };

  // const uploadImage = async () => {
  //   if (!imageUri) {
  //     Alert.alert('Error', 'Please select an image first');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri: imageUri,
  //     type: 'image/jpeg',
  //     name: 'photo.jpg',
  //   });
  //   const token = await AsyncStorage.getItem('authToken');
  //   console.log('Token:', token);
  //   if (!token) {
  //     Alert.alert('Error', 'No token found. Please login again.');
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(
  //       'http://192.168.0.104:8080/api/images/upload',
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //     setUploadedUrl(response.data.url);
  //     Alert.alert('Success', 'Image uploaded successfully!');
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     Alert.alert('Error', 'Failed to upload image');
  //   }
  // };
  const navigate = useNavigation<any>();
  const handleSignOut = () => {
    AsyncStorage.removeItem('authToken');
    navigate.replace('Login');
  };
  // const user = useSelector((state: RootState) => state.user.user);
  const user = {
    name: 'Nguyễn Văn A',
    avatar: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    verified: false,
  };

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
              <Text style={styles.badge}>
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
              <Text style={styles.badge}>
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
              <Text style={styles.badge_2}>
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
