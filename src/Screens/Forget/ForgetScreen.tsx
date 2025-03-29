import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import {TextInput} from 'react-native';
  import {useNavigation} from '@react-navigation/native';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import styles from './style';

  const ForgetPwScreen = () => {
    const navigation = useNavigation();
   
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            style={styles.imgLogo}
            resizeMode="contain"
            // source={require('../../Assets/Images/forget.jpg')

            // }
          />
        </View>
        <KeyboardAvoidingView>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.txtLogin}>Quên mật khẩu</Text>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.txtErr}>{}</Text>
            <View style={styles.input}>
              <MaterialCommunityIcons name="email" size={24} />
              <TextInput
                // value={}
                style={styles.txtInput}
                // onChangeText={text => setEmail(text)}
                placeholder="Nhập gmail của bạn"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.btn}
        //    onPress={handleForget}
           >
            <Text style={styles.btnText}>Tiếp tục</Text>
          </TouchableOpacity>
          <View style={styles.containTxtDontAccount}>
            <Text style={styles.txtDontAccount}>Quay lại </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.txtSignUp}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default ForgetPwScreen;
  