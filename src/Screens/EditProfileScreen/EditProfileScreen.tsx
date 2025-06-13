import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../Utils/Constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
// import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
import { styles } from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserProfileMutation } from '../../Redux/RTKQuery/Slice/UserSlice';
import { updateProfile } from '../../Redux/Slice/User';
import * as Location from 'expo-location';
import { Button } from 'react-native';

const EditProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<any>();
  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [updateUserProfile, { isLoading, isSuccess, isError, error }] =
    useUpdateUserProfileMutation();
  useEffect(() => {
    if (
      name !== user.name ||
      address !== user.address ||
      phoneNumber !== user.phoneNumber
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [name, address, phoneNumber, user]);
  const dispatch = useDispatch();
  const handleSave = async () => {
    const newProfile = {
      name,
      address,
      phone: phoneNumber,
    };
    dispatch(updateProfile(newProfile));
    console.log('newProfile', newProfile);
    await updateUserProfile({ userId: user?.id, profileData: newProfile });
  };
  useEffect(() => {
    if (isSuccess) {
      let toast = Toast.show('Thay đổi thông tin thành công', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      const time = setTimeout(() => {
        toast.hide;
        navigation.goBack();
      }, 700);
      return () => clearTimeout(time);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      Alert.alert('Thông báo', 'Thay đổi thông tin thất bại');
      console.error('Error updating profile:', error);
    }
  }, [isError]);
  const handleGetLocation = () => {
    // Logic khi bấm icon (VD: mở bản đồ hoặc lấy vị trí)
    console.log('Location icon pressed!');
    // Ví dụ: Sử dụng @react-native-community/geolocation để lấy vị trí
    // navigator.geolocation.getCurrentPosition(
    //   position => console.log(position.coords),
    //   error => console.log(error)
    // );
  };
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      console.log('Location:', location.coords, 'lat:', location.coords.latitude, 'lng:', location.coords.longitude);
      if (location) {
        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log('Address:', address);
      }
    })();
  }, []);
  
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.containBtnBack}>
          <Ionicons name={'arrow-back'} color={Colors.black} size={28} />
        </TouchableOpacity>
        <View style={styles.containAvatar}>
          <Pressable>
            <Image />
            <Feather
              name="camera"
              size={12}
              color={'white'}
              style={styles.btnEdit}
            />
          </Pressable>
          <Pressable
            style={styles.containChangePw}
          // onPress={}
          >
            <Text style={styles.txtChangePw}>Đổi mật khẩu</Text>
          </Pressable>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View>
            <View style={styles.containInput}>
              <Text style={styles.txt}>Họ và tên</Text>
              <TextInput
                style={styles.txtInput}
                placeholder="Nhập tên ở đây"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>
            <Text style={styles.indicator} />
          </View>
          <View>
            <View style={styles.containInput}>
              <Text style={styles.txt}>Địa chỉ</Text>
              <TextInput
                style={styles.txtInput}
                placeholder="Nhập địa chỉ ở đây"
                value={address}
                onChangeText={text => setAddress(text)}
              />
              <Pressable onPress={handleGetLocation} style={styles.icon}>
                <Ionicons name="location-outline" size={24} color="#666" />
              </Pressable>
            </View>
            <Text style={styles.indicator} />
          </View>
          <View>
            <View style={styles.containInput}>
              <Text style={styles.txt}>Số điện thoại</Text>
              <TextInput
                style={styles.txtInput}
                placeholder="Nhập số điện thoại ở đây"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              />
            </View>
            <Text style={styles.indicator} />
          </View>
          <Pressable
            style={[styles.btn,
            !hasChanges &&
            { backgroundColor: 'gray' }]}
            onPress={handleSave}
            disabled={!hasChanges} // Vô hiệu hóa nút khi không có thay đổi
          >
            <Text style={styles.txtBtn}>Lưu</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
      {/* <Modal
          // visible={visible}
          transparent={true}
          animationType="slide"
          // onRequestClose={() => setVisible(false)}
          >
          <Pressable
            style={styles.containModal}
            // onPressIn={() => setVisible(false)}
            >
            <TouchableWithoutFeedback>
              <View style={styles.OpModal}>
                <Text style={styles.txtTitleModal}>Chọn ảnh hồ sơ</Text>
                <View style={styles.btnModal}>
                  <Pressable
                    style={styles.containIcon}
                    // onPress={() => uploadImage('Camera')}
                    >
                    <Feather name={'camera'} color={Colors.tint} size={24} />
                    <Text style={styles.txtIcon}>Camera</Text>
                  </Pressable>
                  <Pressable
                    style={styles.containIcon}
                    // onPress={() => uploadImage('Gallery')}
                    >
                    <Feather name={'image'} color={Colors.tint} size={24} />
                    <Text style={styles.txtIcon}>Album</Text>
                  </Pressable>
                  <Pressable
                    style={styles.containIcon}
                    // onPress={() => uploadImage('Remove')}
                    >
                    <Feather name={'trash-2'} color={Colors.black} size={24} />
                    <Text style={styles.txtIcon}>Xóa</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal> */}
      {/* <Loading visible={isLoading} /> */}
    </>
  );
};

export default EditProfileScreen;
