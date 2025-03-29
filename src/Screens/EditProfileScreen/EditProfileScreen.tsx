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
  import React, {useEffect, useState} from 'react';
  import {Colors} from '../../Utils/Constants/Colors';
  import Feather from 'react-native-vector-icons/Feather';
  import * as ImagePicker from 'react-native-image-picker';
  import Toast from 'react-native-root-toast';
  import {styles} from './style';
  
  import {useNavigation} from '@react-navigation/native';
  
  const EditProfileScreen = () => {
    
    return (
      <>
        <ScrollView style={{flex: 1}}>
          <View style={styles.containAvatar}>
            <Pressable>
              <Image  />
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
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View>
              <View style={styles.containInput}>
                <Text style={styles.txt}>Họ và tên</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholder="Nhập tên ở đây"
                  // value={name}
                  // onChangeText={text => setName(text)}
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
                  // value={address}
                  // onChangeText={text => setAddress(text)}
                />
              </View>
              <Text style={styles.indicator} />
            </View>
            <View>
              <View style={styles.containInput}>
                <Text style={styles.txt}>Số điện thoại</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholder="Nhập số điện thoại ở đây"
                  // value={phoneNumber}
                  // onChangeText={text => setPhoneNumber(text)}
                />
              </View>
              <Text style={styles.indicator} />
            </View>
            <Pressable
            //   style={[styles.btn, !hasChanges && {backgroundColor: 'gray'}]
            // }
              // onPress={handleSave}
              // disabled={!hasChanges} // Vô hiệu hóa nút khi không có thay đổi
            >
              <Text style={styles.txtBtn}>Lưu</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </ScrollView>
        <Modal
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
        </Modal>
        {/* <Loading visible={isLoading} /> */}
      </>
    );
  };
  
  export default EditProfileScreen;
  