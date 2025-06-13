import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassrword, setRePassrword] = useState('');
  const [name, setName] = useState('');
  const [textErr, setTextErr] = useState('');
  const validateRegister = () => {
    if (!email || !password || !rePassrword || !name) {
      setTextErr('Vui lòng điền đầy đủ thông tin của bạn');
      return false;
    } else if (password !== rePassrword) {
      setTextErr('Mật khẩu không khớp');
      return false;
    } else if (password.length < 6) {
      setTextErr('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setTextErr('Email không hợp lệ');
      return false;
    }
    else {
      setTextErr('');
      return true;
    }
  };
  const handleRegister = () => {
    if (validateRegister()) {
      const user = {
        email: email,
        password: password,
        username: name,
      };
      axios
        .post(`${API_URL}/api/auth/register`, user)
        .then(async res => {
          if (res.data) {
            Alert.alert('Đăng ký thành công', 'Bạn có thể đăng nhập ngay bây giờ', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),
              },
            ]);
          } else {
            setTextErr('Đăng ký không thành công');
          }
        })
        .catch(err => {
          setTextErr(err.response?.data?.message || 'Đăng ký không thành công');
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.imgLogo}
          resizeMode="contain"
          source={require('../../../assets/logo.png')}
         />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.txtLogin}>Đăng ký tài khoản</Text>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.txtErr}>{textErr}</Text>
          <View style={styles.input}>
            <FontAwesome name="user" size={24} style={{ paddingLeft: 5 }} />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={styles.txtInput}
              placeholder=" Nhập tên của bạn"
            />
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons name="email" size={24} />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.txtInput}
              placeholder="Nhập Email của bạn"
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
          <View style={styles.input}>
            <AntDesign name="lock" size={24} />
            <TextInput
              value={rePassrword}
              onChangeText={text => setRePassrword(text)}
              secureTextEntry={true}
              style={styles.txtInput}
              placeholder="Nhập lại mật khẩu của bạn"
            />
          </View>
        </View>
        <Pressable style={styles.btn}
          onPress={handleRegister}
        >
          <Text style={styles.btnText}>Đăng ký</Text>
        </Pressable>
        <View style={styles.containTxtDontAccount}>
          <Text style={styles.txtDontAccount}>Bạn đã có tài khoản? </Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.txtSignUp}>Đăng nhập</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterScreen;
