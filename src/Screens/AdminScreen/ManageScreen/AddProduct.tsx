import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../../Utils/Constants/Colors';
// import {
//   Asset,
//   CameraOptions,
//   ImageLibraryOptions,
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './styles/StyleAddProduct';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Thêm thư viện
import { SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
// import {
//   useAddProductMutation,
//   useGetProductsAdminQuery,
//   useGetProductsQuery,
// } from '../../../Redux/RTKQuery/Slice/ProductSlice';
import Loading from '../../../Components/Common/Loading';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const AddProductScreen = ({ setVisible }: any) => {

  const API_URL = Constants.expoConfig?.extra?.API_URL;
  const [productName, setProductName] = useState('');
  const [body, setBody] = useState('');
  const [supplier, setSupplier] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [language, setLanguage] = useState('');
  const [weight, setWeight] = useState('');
  const [other, setOther] = useState('');
  const [priceImport, setPriceImport] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [category, setCategory] = useState('Thiếu nhi');
  const [items, setItems] = useState([
    { label: 'Thiếu nhi', value: 'Thiếu nhi' },
    { label: 'Văn hóa', value: 'Văn hóa' },
    { label: 'Lịch sử', value: 'Lịch sử' },
    { label: 'Khoa học', value: 'Khoa học' },
    { label: 'Tự truyện', value: 'Tự truyện' },
    { label: 'Kinh tế', value: 'Kinh tế' },
    { label: 'Giáo dục', value: 'Giáo dục' },
    { label: 'Tâm lý', value: 'Tâm lý' },
    { label: 'Nấu ăn', value: 'Nấu ăn' },
    { label: 'Phát triển bản thân', value: 'Phát triển bản thân' },
    { label: 'Tôn giáo', value: 'Tôn giáo' },
    { label: 'Ngoại ngữ', value: 'Ngoại ngữ' },
  ]);
  const [state, setState] = useState('Sản phẩm hot');
  const [valueState, setValueState] = useState([
    { label: 'Sản phẩm hot', value: 'Sản phẩm hot' },
    { label: 'Sản phẩm bình thường', value: 'Sản phẩm bình thường' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const [imageUris, setImageUris] = useState([]);

  const pickImage = async () => {
    console.log("pickImage called");
    // Yêu cầu quyền truy cập thư viện ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access photo library is required!');
      return;
    }

    // Mở thư viện ảnh, cho phép chọn nhiều ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    console.log("ImagePicker result:", result);
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uris = result.assets.map(asset => asset.uri);
      setImageUris((prev) => [...prev, ...uris]);
      // console.log('Image URIs set:', uris);
    } else {
      console.log('User cancelled or no images selected');
    }
  };
  // Hàm mở camera
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUris((prev) => [...prev, result.assets[0].uri]);
    }
  };
  const handleDeleteImageSelected = (index) => {
    setImageUris((prevUris) => prevUris.filter((_, i) => i !== index));
  };
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!productName) newErrors.productName = 'Tên sản phẩm là bắt buộc';
    if (!category) newErrors.category = 'Vui lòng chọn danh mục';
    if (!state) newErrors.state = 'Vui lòng chọn trạng thái';
    if (publishYear && !/^\d{4}$/.test(publishYear)) newErrors.publishYear = 'Năm xuất bản phải là 4 chữ số';
    if (weight && !/^\d+(\.\d{1,2})?$/.test(weight)) newErrors.weight = 'Trọng lượng phải là số';
    if (!priceImport) newErrors.priceImport = 'Giá nhập là bắt buộc';
    else if (!/^\d+(\.\d{1,2})?$/.test(priceImport)) newErrors.priceImport = 'Giá nhập phải là số';
    if (!price) newErrors.price = 'Giá bán là bắt buộc';
    else if (!/^\d+(\.\d{1,2})?$/.test(price)) newErrors.price = 'Giá bán phải là số';
    if (discount && !/^(100|[0-9]?[0-9])$/.test(discount)) newErrors.discount = 'Giảm giá từ 0-100%';
    if (!quantity) newErrors.quantity = 'Số lượng là bắt buộc';
    else if (!/^\d+$/.test(quantity)) newErrors.quantity = 'Số lượng phải là số nguyên dương';
    if (imageUris.length === 0) newErrors.images = 'Phải chọn ít nhất một ảnh';

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };
  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found. Please login again.');
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/images/upload`, // Thay bằng URL upload ảnh thực tế
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return { url: response.data.url, publicId: response.data.publicId || 'default-id' };
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  };
  const handleAddProduct = async () => {
    setIsLoading(true);
    const { isValid, errors: newErrors } = validateForm();
    if (!isValid) {
      setIsLoading(false);
      const errorMessages = Object.values(newErrors).join('\n');
      Alert.alert('Lỗi', errorMessages || 'Vui lòng kiểm tra lại các trường');
      console.log('Form invalid, errors:', newErrors);
      return;
    }

    try {
      // Upload tất cả ảnh và lấy danh sách { url, publicId }
      const productImages = await Promise.all(
        imageUris.map(async (uri) => await uploadImage(uri))
      );

      // Chuẩn bị dữ liệu gửi API
      const productData = {
        title: productName,
        category,
        body,
        status: state,
        provider: supplier,
        author,
        publisher,
        yearPublic: parseInt(publishYear) || 0,
        language,
        weight,
        other,
        discount: parseInt(discount) || 0,
        quantity: parseInt(quantity) || 0,
        price: parseFloat(price) || 0,
        priceImport: parseFloat(priceImport) || 0,
        sold: 0,
        productImages,
      };

      // Lấy token
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found. Please login again.');
      }

      // Gửi API
      const response = await axios.post(
        `${API_URL}/api/products`, // Thay bằng URL API thực tế
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setIsLoading(false);
      Alert.alert('Thành công', 'Sản phẩm đã được thêm');
      Toast.show('Thêm sản phẩm thành công', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      setVisible(false); // Đóng modal sau khi thành công
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'Lỗi khi thêm sản phẩm';
      Alert.alert('Lỗi', errorMessage);
      console.error('Add product error:', error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        onPress={() => setVisible(false)}
        style={styles.containBtnBack}>
        <Ionicons name={'arrow-back'} color={Colors.black} size={28} />
      </Pressable>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Thêm sản phẩm</Text>
      </View>
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={0}
        keyboardOpeningTime={250}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Tên sản phẩm:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên sản phẩm"
          value={productName}
          onChangeText={setProductName}
        />
        <Text style={styles.label}>Tên danh mục:</Text>
        <View style={styles.containDropdown}>
          <DropDownPicker
            style={{
              borderColor: '#ccc',
              height: 30,
            }}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>
        <Text style={styles.label}>Giới thiệu sách:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập giới thiệu về sách"
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.label}>Trạng thái sản phẩm:</Text>
        <View style={styles.containDropdown}>
          <DropDownPicker
            style={{
              borderColor: '#ccc',
              height: 30,
            }}
            open={open2}
            value={state}
            items={valueState}
            setOpen={setOpen2}
            setValue={setState}
            setItems={setValueState}
            placeholder="choose state"
            zIndex={2000}
            zIndexInverse={1000}
          />
        </View>
        <Text style={styles.label}>Nhập cung cấp:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập nhà cung cấp"
          value={supplier}
          onChangeText={setSupplier}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.label}>Nhập tác giả:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tác giả"
          value={author}
          onChangeText={setAuthor}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.label}>Nhập nhà xuất bản:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập nhà xuất bản"
          value={publisher}
          onChangeText={setPublisher}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.label}>Nhập năm xuất bản:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập năm xuất bản"
          value={publishYear}
          onChangeText={setPublishYear}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.label}>Nhập ngôn ngữ:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ngôn ngữ"
          value={language}
          onChangeText={setLanguage}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.label}>Nhập trọng lượng:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập trọng lượng"
          value={weight}
          onChangeText={setWeight}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.label}>Khác:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập thông tin khác"
          value={other}
          onChangeText={setOther}
          multiline
          numberOfLines={10}
        />
        <Text style={styles.label}>Giá nhập:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập giá nhập sản phẩm"
          value={priceImport}
          onChangeText={setPriceImport}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Giá bán:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập giá sản phẩm"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Giảm giá:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập % giảm giá"
          value={discount}
          onChangeText={setDiscount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Số lượng:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số lượng"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Hình sản phẩm:</Text>
        <View style={styles.imageSection}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={pickImage}
          >
            <Feather name={'image'} color={Colors.black} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton}
            onPress={openCamera}
          >
            <Feather name={'camera'} color={Colors.black} size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.imagePreview}>
          {imageUris.map((uri, index) => (
            <View key={index} >
              <Pressable
                onPress={() => handleDeleteImageSelected(index)}
                style={styles.btnSclose}>
                <Ionicons name="close-circle" size={22} />
              </Pressable>
              <Image source={{ uri }} style={styles.image} />
            </View>
          ))}
        </View>
        <Pressable style={[styles.btn]}
          onPress={handleAddProduct}
        >
          <Text style={styles.txtBtn}>Thêm</Text>
        </Pressable>
      </KeyboardAwareScrollView>
      {/* <Loading visible={isLoading} /> */}
    </SafeAreaView>
  );
};

export default AddProductScreen;
