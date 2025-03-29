import React, {useState} from 'react';
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
import {AntDesign, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
function RegisterScreen() {
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
          <Text style={styles.txtLogin}>Đăng ký tài khoản</Text>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.txtErr}></Text>
          <View style={styles.input}>
            <FontAwesome name="user" size={24} style={{paddingLeft: 5}} />
            <TextInput
            //   value={name}
            //   onChangeText={text => setName(text)}
              style={styles.txtInput}
              placeholder=" Nhập tên của bạn"
            />
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons name="email" size={24} />
            <TextInput
            //   value={email}
            //   onChangeText={text => setEmail(text)}
              style={styles.txtInput}
              placeholder="Nhập gmail của bạn"
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="lock" size={24} />
            <TextInput
            //   value={password}
            //   onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={styles.txtInput}
              placeholder="Nhập mật khẩu của bạn"
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="lock" size={24} />
            <TextInput
            //   value={rePassrword}
            //   onChangeText={text => setRePassrword(text)}
              secureTextEntry={true}
              style={styles.txtInput}
              placeholder="Nhập lại mật khẩu của bạn"
            />
          </View>
        </View>
        <Pressable style={styles.btn} 
        // onPress={handleRegister}
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
