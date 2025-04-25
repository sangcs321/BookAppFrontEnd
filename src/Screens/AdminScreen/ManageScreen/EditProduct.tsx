import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
  SafeAreaView
} from 'react-native';
import {Colors} from '../../../Utils/Constants/Colors';
// import {
//   CameraOptions,
//   ImageLibraryOptions,
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles/StyleEditProduct';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'; // Thêm thư viện
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

import Loading from '../../../Components/Common/Loading';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-root-toast';

const EditProduct = () => {
    const navigation = useNavigation<any>();
    // const route = useRoute<RouteProp<PropParams, 'EditProduct'>>();
    const [open, setOpen] = useState(false);
      const [open2, setOpen2] = useState(false);
      const [category, setCategory] = useState('Điện thoại');
      const [items, setItems] = useState([
        {label: 'Kinh tế', value: 'Điện thoại'},
        {label: 'Giáo dục', value: 'LapTop'},
        {label: 'Tâm lý', value: 'Đồng hồ'},
        {label: 'Nấu ăn', value: 'Tai nghe'},
        {label: 'Phát triển bản thân', value: 'Phụ kiện'},
      ]);
      const [state, setState] = useState('Sản phẩm hot');
      const [valueState, setValueState] = useState([
        {label: 'Sản phẩm hot', value: 'Sản phẩm hot'},
        {label: 'Sản phẩm bình thường', value: 'Sản phẩm bình thường'},
      ]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white, marginTop: 20}}>
      <Pressable
        // onPress={() =>
        //   navigation.replace('Detail', {
        //     product: product,
        //   })
        // }
        style={styles.containBtnBack}>
        <Ionicons name={'arrow-back'} color={Colors.black} size={28} />
      </Pressable>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Chỉnh sửa sản phẩm</Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={0}
        keyboardOpeningTime={250}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Tên sản phẩm:</Text>
        
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
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>
        <Text style={styles.label}>Giá nhập:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập giá nhập sản phẩm"
        //   value={priceImport}
        //   onChangeText={setPriceImport}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Giá bán:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập giá sản phẩm"
        //   value={price}
        //   onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Giảm giá:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập % giảm giá"
        //   value={discount}
        //   onChangeText={setDiscount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Số lượng:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số lượng"
        //   value={quantity}
        //   onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Hình sản phẩm:</Text>

        <View style={styles.imageSection}>
          <TouchableOpacity
            style={styles.imageButton}
            // onPress={openImageLibrary}
            >
            <Feather name={'image'} color={Colors.black} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} 
        //   onPress={openCamera}
          >
            <Feather name={'camera'} color={Colors.black} size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.imagePreview}>
          {/* {images.map((image, index) => (
            <View key={index}>
              <Pressable
                onPress={() => handleDeleteImageSelected(index)}
                style={styles.btnSclose}>
                <Ionicons name="close-circle" size={22} />
              </Pressable>
              <Image source={{uri: image}} style={styles.image} />
            </View>
          ))} */}
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.containBtn}>
        <Pressable
          style={[styles.btn,
            //  !hasChanges 
            //  && 
             {backgroundColor: 'gray'}]}
        //   onPress={handleUpdateProduct}
        //   disabled={!hasChanges}
          >
          <Text style={styles.txtBtn}>Cập nhật</Text>
        </Pressable>
      </View>
      {/* <Loading visible={isLoading} /> */}
    </SafeAreaView>
  );
};

export default EditProduct;