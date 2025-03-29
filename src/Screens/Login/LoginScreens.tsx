import React, {useEffect, useState} from 'react';
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
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import styles from './style';
import {useNavigation} from '@react-navigation/native';



function LoginScreen() {
    const navigation = useNavigation();
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
        <View style={{alignItems: 'center'}}>
          <Text style={styles.txtLogin}>Đăng nhập tài khoản</Text>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.txtErr}></Text>
          <View style={styles.input}>
            <MaterialCommunityIcons name="email" size={24} />
            <TextInput
             
              style={styles.txtInput}
              placeholder="Nhập gmail của bạn"
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="lock" size={24} />
            <TextInput
              
              secureTextEntry={true}
              style={styles.txtInput}
              placeholder="Nhập mật khẩu của bạn"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.containTxtForgetPw}
        //   onPress={() => navigation.navigate('Forget')}
          >
          <Text style={styles.txtForgetPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} 
        // onPress={handle}
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
