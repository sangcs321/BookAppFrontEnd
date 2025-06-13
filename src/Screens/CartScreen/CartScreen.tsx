import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../Utils/Constants/Colors';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';

import styles from './style';
import {
   useGetCartItemsQuery , 
  useUpdateCartItemQuantityMutation, useDeleteCartItemMutation} from '../../Redux/RTKQuery/Slice/CartSlice';
import Loading from '../../Components/Common/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';



const CartScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user?.id);

  // Lấy cartItems từ Redux state (được đồng bộ qua extraReducers)
  const { cartItems, loading, error } = useSelector((state: RootState) => state.cart);
 
  // Gọi API để lấy cartItems (kích hoạt đồng bộ qua extraReducers)
  useGetCartItemsQuery(userId);

  // Hook để cập nhật số lượng
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();

  // Hook để xóa sản phẩm
  const [deleteCartItem] = useDeleteCartItemMutation();

  // Tính tổng tiền
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item?.product?.price || 0;
      const discount = item?.product?.discount || 0;
      const discountedPrice =
        discount > 0 ? price - (price * (discount * 10)) / 100 : price;
      const quantity = item?.quantity || 0;
      return sum + discountedPrice * quantity;
    }, 0);
  }, [cartItems]);

  // Hàm tăng số lượng
  const handleIncrease =async (itemId: number) => {
    const item = cartItems.find((i) => i.id === itemId.id);
    if (!item) {
      console.error('Item not found in cartItems:', itemId.id);
      return;
    }
    const newQuantity = (item.quantity || 0) + 1;
    console.log('Calling updateCartItemQuantity with:', { id: item.id, quantity: newQuantity });
  
    try {
      const result = await updateCartItemQuantity({ id: item.id, quantity: newQuantity }).unwrap();
      console.log('API call successful:', result); // Thành công
    } catch (error) {
      console.error('API call failed:', error); // Thất bại
    }
  };

  // Hàm giảm số lượng
  const handleDecrease = (item: any) => {
    const newQuantity = Math.max(1, (item.quantity || 0) - 1);
    updateCartItemQuantity({ id: item.id, quantity: newQuantity });
  };

  // Hàm xóa sản phẩm
  const handleDelete = (item: any) => {
    deleteCartItem(item.id);
  };

  // Kiểm tra disabled cho nút "Tiến hành mua"
  const disabled = cartItems.length > 0;

  
const handleBuy = () => {
    // Điều hướng đến Payment và truyền cartItems, total
    navigation.navigate('Payment', {
      cartItems: cartItems,
      total: total,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerTotal}>
        <Text style={styles.txtTotal}>Tổng tiền : </Text>
        <Text style={styles.txtPrice}>{formatCurrencyVND(total)}</Text>
      </View>
      <Pressable
        style={[styles.btnBuyAll, !disabled && { backgroundColor: 'gray' }]}
        disabled={!disabled}
        onPress={handleBuy}
      >
        <Text style={styles.txtBuyAll}>
          Tiến hành mua ({cartItems?.length || 0}) sản phẩm
        </Text>
      </Pressable>
      <View style={{ marginHorizontal: 10 }}>
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onDelete={handleDelete}
          />
        ))}
      </View>
    </ScrollView>
  );
};

// Tách riêng CartItem để tránh render lại
const CartItem = React.memo(({ item, onIncrease, onDecrease, onDelete }: any) => (
  
  <View style={styles.containItem}>
    <Pressable style={styles.item}>
      <View>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            
            uri: item?.product?.productImages?.[0]?.image?.url || 'https://via.placeholder.com/100',
          }}
        />
      </View>
      <View style={styles.containInfor}>
        <Text numberOfLines={3} style={styles.txtTitle}>
          {item?.product?.title || 'Không có tên'}
        </Text>
        <Text style={styles.txtPriceItem}>
          {item?.product?.discount > 0
            ? formatCurrencyVND(
                item?.product?.price -
                  (item?.product?.price * (item?.product?.discount * 10)) / 100,
              )
            : formatCurrencyVND(item?.product?.price || 0)}
        </Text>
        <Pressable style={styles.containBtn}>
          <View style={styles.containInDeCrease}>
            <Pressable
              onPress={() => onDecrease(item)}
              style={styles.btnDecrease}
            >
              <AntDesign name="minus" size={18} color={Colors.white} />
            </Pressable>
            <Pressable style={styles.containQuality}>
              <Text style={{ color: 'red' }}>{item?.quantity || 0}</Text>
            </Pressable>
            <Pressable
              onPress={() => onIncrease(item)}
              style={styles.btnIncrease}
            >
              <Feather name="plus" size={18} color={Colors.white} />
            </Pressable>
          </View>
          <Pressable onPress={() => onDelete(item)} style={styles.btnDelete}>
            <FontAwesome name="trash-o" size={18} color={Colors.white} />
          </Pressable>
        </Pressable>
      </View>
    </Pressable>
  </View>
));


export default CartScreen;