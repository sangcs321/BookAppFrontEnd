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
const ProfileScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const pickImage = async () => {
    console.log("pickImage called");
    // Yêu cầu quyền truy cập thư viện ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access photo library is required!');
      return;
    }

    // Mở thư viện ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log("ImagePicker result:", result);
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      console.log('Image URI set:', result.assets[0].uri);
    } else {
      console.log('User cancelled or no image selected');
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    const token = await AsyncStorage.getItem('authToken');
    console.log('Token:', token);
    if (!token) {
        Alert.alert('Error', 'No token found. Please login again.');
        return;
    }
    try {
      const response = await axios.post(
        'http://192.168.0.104:8080/api/images/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploadedUrl(response.data.url);
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
      <Button title="Upload Image" onPress={uploadImage} />
      {uploadedUrl && (
        <View style={{ marginTop: 20 }}>
          <Text>Uploaded Image URL:</Text>
          <Text>{uploadedUrl}</Text>
          <Image
            source={{ uri: uploadedUrl }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
