import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../Utils/Constants/Colors';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';
// import OrderItemInDetail from '../../Components/Common/OrderItemInDetail';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddOrderMutation,
  //   useGetAllOrderQuery,
  //   useGetOrdersByStatusQuery,
} from '../../Redux/RTKQuery/Slice/OrderSlice';
import Loading from '../../Components/Common/Loading';
// import {cleanCart} from '../../Redux/Slice/Cart';
// import {
//   useGetQuantityOfProductQuery,
//   useUpdateQuantityOfProductMutation,
// } from '../../Redux/RTKQuery/Slice/ProductSlice';
import { RootState } from '../../Redux/Store/Store';
import OrderItemInDetail from '../../Components/Common/OrderItemInDetail';
import { clearCart } from '../../Redux/Slice/Cart';
import { useDeleteCartItemMutation } from '../../Redux/RTKQuery/Slice/CartSlice';
import { useUpdateQuantityProductMutation } from '../../Redux/RTKQuery/Slice/ProductSlice';
const PayScreen = () => {
  const { cartItems, total } = useRoute<any>().params; // để tạm là any
  const user = useSelector((state: RootState) => state.user);
  const [finalTotal, setFinalTotal] = useState(total);
  const [isLoading2, setIsLoading2] = useState(false);
  const [shippingfee, setShippingFee] = useState(30000); // Mặc định: Phí vận chuyển là 0
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Mặc định: Thanh toán khi nhận hàng
  const [addOrder, { isLoading, isSuccess, isError, error }] =
    useAddOrderMutation();
  const [updateQuantityOfProduct,isSuccess2] = useUpdateQuantityProductMutation();
  const navigation = useNavigation<any>();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const handleShippingFee = (fee: number) => {
    setShippingFee(fee);
    const newTotal = total + fee; // Cập nhật tổng tiền sau khi cộng phí vận chuyển
    setFinalTotal(newTotal);
  }
  useEffect(() => {
    // Cập nhật tổng tiền khi có thay đổi về phí vận chuyển
    handleShippingFee(shippingfee);
  }, [shippingfee]);
  const handleBuyProduct = async () => {
    if(!user.verified){
      Alert.alert('Thông báo', 'Vui lòng xác thực tài khoản trước khi đặt hàng');
      return;
    }
    if (!user.address) {
      Alert.alert('Thông báo', 'Vui lòng cập nhật địa chỉ');
      return;
    }
    if (!user.phoneNumber) {
      Alert.alert('Thông báo', 'Vui lòng cập nhật số điện thoại');
      return;
    }
    setIsLoading2(true);
    const order = {
      userId: user.id,
      paymentMethod: paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'ONLINE', // Sửa logic paymentMethod
      shippingAddress: user.address,
      state: 'Chờ xác nhận',
      orderItems: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        productPrice: item.product.price,
      })),
      totalPrice: finalTotal,
    };

    try {
      const orderResponse = await addOrder(order).unwrap(); // Gọi API thêm đơn
      Alert.alert('Thành công', 'Đặt hàng thành công!');
      navigation.navigate('Main'); // Điều hướng sau khi thành công
    } catch (error) {
      Alert.alert('Lỗi', 'Đặt hàng thất bại: ' + (error.message || 'Vui lòng thử lại'));
      console.error('Lỗi khi gọi API:', error);
    } finally {
      setIsLoading2(false);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const updateQuantity = async () => {
      await Promise.all(cartItems.map(item =>
        updateQuantityOfProduct({ id: item.product.id, quantity: item.quantity })
      ));
    };
    
    if (isSuccess) {
      updateQuantity();  
      const clearCart = async () => {
        await Promise.all(cartItems.map(item =>
          deleteCartItem(item.id).unwrap()
        ));
      };
      clearCart();
      Alert.alert('Thông báo', 'Đặt hàng thành công');
      navigation.navigate('Main');
    }
  }, [isSuccess]); // Theo dõi sự thay đổi của isSuccess

  useEffect(() => {
    if (isError) {
      console.log('Đặt hàng thất bại', error);
      Alert.alert('Thông báo', 'Mua hàng thất bại');
    }
  }, [isError]); // Theo dõi sự thay đổi của isError

 
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.containAddress}>
          <View style={styles.containInforUser}>
            <Ionicons
              name="location-outline"
              color={Colors.tint}
              size={15}
              style={styles.left}
            />
            <View style={styles.right}>
              <Text style={styles.txtTitleAddress}>Địa chỉ nhận hàng</Text>
              <View style={styles.inforUser}>
                <Text style={styles.txtNameUser}>Tên: {user.name}</Text>
              </View>
              <View style={styles.inforUser}>
                <Text style={styles.txtPhoneNumber}>Số điện thoại: {user.phoneNumber}</Text>
              </View>
              <Text style={styles.txtAddress}>Địa chỉ: {user.address}</Text>
              <Pressable
                style={styles.btnUpgrade}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.txtBtnUpgrade}>Thay đổi</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.methodShip}>
          <View style={styles.header}>
            <Feather name="truck" size={16} color={Colors.tint} />
            <Text style={styles.txtMethodShip}>Phương thức vận chuyển</Text>
          </View>
          <View style={styles.containMethod}>
            <Text style={styles.txt}>Nhanh</Text>
            <Text style={styles.txt}>{formatCurrencyVND(shippingfee)}</Text>
          </View>
        </View>
        <View style={styles.containOrder}>
          <View style={styles.shop}>
            <Entypo name="shop" size={18} color={Colors.tint} />
            <Text style={styles.txtNameShop}>Book Shop</Text>
          </View>
          {cartItems?.map((item, index) => {
            return (
              <OrderItemInDetail
                key={index}
                product={item?.product}
                quantity={item?.quantity}
              />
            );
          })}
          <Text style={styles.indicator} />
          <View style={styles.containTotal}>
            <Text style={styles.txtTotal}>Thành tiền:</Text>
            <Text style={styles.txtTotalPrice}>{formatCurrencyVND(total)}</Text>
          </View>
        </View>
        <View style={styles.containMethod}>
          {/* Lựa chọn Thanh toán khi nhận hàng */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => setPaymentMethod('COD')}
          >
            <View style={styles.radio}>
              {paymentMethod === 'COD' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.txt}>Thanh toán khi nhận hàng</Text>
          </TouchableOpacity>

          {/* Lựa chọn Thanh toán online */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => setPaymentMethod('ONLINE')}
          >
            <View style={styles.radio}>
              {paymentMethod === 'ONLINE' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.txt}>Thanh toán online</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailPay}>
          <View style={styles.header}>
            <Foundation name="clipboard-notes" size={16} color={Colors.tint} />
            <Text style={styles.txtDetailPay}>Chi tiết thanh toán</Text>
          </View>
          <View style={styles.detailLine}>
            <Text style={styles.txt13}>Tổng tiền hàng</Text>
            <Text style={styles.txt13}>{formatCurrencyVND(total)}</Text>
          </View>
          <View style={styles.detailLine}>
            <Text style={styles.txt13}>Tổng tiền phí vận chuyển</Text>
            <Text style={styles.txt13}>{formatCurrencyVND(shippingfee)}</Text>
          </View>
          <View style={styles.detailLine}>
            <Text style={styles.txt16}>Tổng thanh toán</Text>
            <Text style={styles.txtTotalOrder}>{formatCurrencyVND(finalTotal)}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.containBtnBuy}>
        <View style={styles.confirmPrice}>
          <Text style={styles.txtTotalPay}>Tổng thanh toán</Text>
          <Text style={styles.txtTotalOrder}>{formatCurrencyVND(finalTotal)}</Text>
        </View>
        <Pressable style={styles.btnBuy} onPress={handleBuyProduct}>
          <Text style={styles.txtBuy}>Đặt hàng</Text>
        </Pressable>
        {/* <Loading visible={isLoading || isLoadingUpdate} /> */}
      </View>
    </>
  );
};

export default PayScreen;