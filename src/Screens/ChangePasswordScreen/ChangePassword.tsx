import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import Toast from 'react-native-root-toast';
import {useNavigation} from '@react-navigation/native';

const ChangePassword = () => {
    const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View>
          <View style={styles.containInput}>
            <Text style={styles.txt}>Mật khẩu cũ</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Nhập mật khẩu cũ"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.indicator} />
        </View>
        <View>
          <View style={styles.containInput}>
            <Text style={styles.txt}>Mật khẩu mới</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.indicator} />
        </View>
        <View>
          <View style={styles.containInput}>
            <Text style={styles.txt}>Nhập lại mật khẩu mới</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Nhập lại mật khẩu mới"
              value={confirmNewPassword}
              onChangeText={text => setConfirmNewPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.indicator} />
        </View>
        <Pressable
          style={[styles.btn, !hasChanges && {backgroundColor: 'gray'}]}
          onPress={handleSave}
          disabled={!hasChanges} // Vô hiệu hóa nút khi không có thay đổi
        >
          <Text style={styles.txtBtn}>Đổi</Text>
        </Pressable>
      </KeyboardAvoidingView>
      <Loading visible={isLoading} />
    </>
  );
};

export default ChangePassword;
