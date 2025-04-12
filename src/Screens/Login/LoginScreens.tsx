import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import Toast from 'react-native-root-toast';
import { setUser } from '../../Redux/Slice/User';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';

const API_URL = Constants.expoConfig?.extra?.API_URL;

function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [textErr, setTextErr] = useState('');
  const validateLogin = () => {
    if (!email || !password) {
      setTextErr('Vui lòng điền đầy đủ thông tin của bạn');
      return false;
    } else {
      setTextErr('');
      return true;
    }
  };
  const handleLogin = () => {
    if (validateLogin()) {
      const user = {
        email: email,
        password: password,
      };
      axios
        .post(`${API_URL}/api/auth/login?email=${user.email}&password=${user.password}`)
        .then(res => {
          const token = res.data.token;
          const userId = res.data.userId;
          AsyncStorage.setItem('authToken', token);
          if (token) {
            const decodedToken = jwtDecode(token);
            axios
              .get(`${API_URL}/api/users/profile/${userId}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },})
              .then(res => {
                const user = res.data;
                console.log(user.id);
                // if (user.isBlock) {
                //   Alert.alert(
                //     'Thông báo',
                //     'Tài khoản của bạn đã bị chặn, vui lòng liên hệ shop để được mở chặn',
                //   );
                //   return;
                // }
                dispatch(setUser(user));
                // if (user.role === 'User') {
                  navigation.replace('Main');
                // } else {
                //   navigation.replace('MainAdmin');
                // }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          setTextErr('Tài khoản hoặc mật khẩu không chính xác');
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
        //   style={styles.imgLogo}
        //   resizeMode="cover"
        //   source={require('../../Assets/Images/LogoApp.png')}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.txtLogin}>Đăng nhập tài khoản</Text>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.txtErr}>{textErr}</Text>
          <View style={styles.input}>
            <MaterialCommunityIcons name="email" size={24} />
            <TextInput
              style={styles.txtInput}
              placeholder="Nhập Email của bạn"
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="lock" size={24} />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={styles.txtInput}
              placeholder="Nhập mật khẩu của bạn"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.containTxtForgetPw}
          onPress={() => navigation.navigate('Forget')}
        >
          <Text style={styles.txtForgetPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}
          onPress={handleLogin}
        >
          <Text style={styles.btnText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.containTxtDontAccount}>
          <Text style={styles.txtDontAccount}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.txtSignUp}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
