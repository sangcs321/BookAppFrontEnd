import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, Pressable} from 'react-native';
import {Colors} from '../../../Utils/Constants/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles/StyleAddProduct';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'; // Thêm thư viện
import {SafeAreaView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Loading from '../../../Components/Common/Loading';
import {
  useAddUserMutation,
  useGetUsersQuery,
} from '../../../Redux/RTKQuery/Slice/UserSlice';
import Toast from 'react-native-root-toast';
const AddAccountScreen = ({setVisible}: any) => {
  const [addUser, {isLoading, isSuccess, isError, error}] =
    useAddUserMutation();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false); // Trạng thái mở/đóng DropDown
  const [role, setRole] = useState('User'); // Giá trị được chọn
  const [items, setItems] = useState([
    // Các tùy chọn trong DropDown
    {label: 'Người dùng', value: 'User'},
    {label: 'Admin', value: 'Admin'},
  ]);
  const [errorMessage, setErrorMessage] = useState();
  const {refetch} = useGetUsersQuery(undefined);

  const handleAdduser = async () => {
    if (repassword !== password) {
      console.log('mật khẩu không trùng');
      Alert.alert('Thông báo', 'Mật khẩu nhập lại không khớp');
      return;
    } else {
      const user = {
        name: username,
        email: email,
        password: password,
        role: role,
        phone: phone,
        address: address,
      };
      try {
        await addUser(user).unwrap();
      } catch (err) {
        // Lấy thông báo lỗi từ API
        const errorMessage = err?.data?.msg || 'Email already registered';
        setErrorMessage(errorMessage);
        // Kiểm tra lỗi cụ thể
        if (errorMessage === 'Email already registered') {
          Alert.alert('Thông báo', 'Email đã tồn tại, vui lòng nhập lại');
        } else {
          Alert.alert('Thông báo', errorMessage);
        }
      }
    }
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
      let toast = Toast.show('Thêm người dùng thành công', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      const time = setTimeout(() => {
        toast.hide;
      }, 700);
      return () => clearTimeout(time);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError && !errorMessage) {
      Alert.alert('Thông báo', 'Thêm người dùng thất bại, vui lòng thử lại.');
    }
  }, [isError]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Pressable
          onPress={() => setVisible(false)}
          style={styles.containBtnBack}>
          <Ionicons name={'arrow-back'} color={Colors.black} size={28} />
        </Pressable>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Thêm tài khoản</Text>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          extraScrollHeight={0}
          keyboardOpeningTime={250}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Tên người dùng:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên người dùng"
            value={username}
            onChangeText={setUserName}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập Email"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Mật khẩu:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.label}>Nhập lại mật khẩu:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nhập lại mật khẩu"
            value={repassword}
            onChangeText={setRePassword}
          />
          <Text style={styles.label}>Vai trò:</Text>
          <View style={styles.containDropdown}>
            <DropDownPicker
              style={{
                borderColor: '#ccc',
                height: 30,
              }}
              open={open}
              value={role}
              items={items}
              setOpen={setOpen}
              setValue={setRole}
              setItems={setItems}
              placeholder="Vai trò"
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại"
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={styles.label}>Địa chỉ:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập địa chỉ"
            value={address}
            onChangeText={setAddress}
          />
          <Pressable style={[styles.btn]} onPress={handleAdduser}>
            <Text style={styles.txtBtn}>Thêm</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <Loading visible={isLoading} />
    </>
  );
};
export default AddAccountScreen;