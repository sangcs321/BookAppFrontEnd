import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../../../Utils/Constants/Colors';
import { styles as st } from './styles/Style';
import { Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import formatCurrencyVND from '../../../Utils/Constants/FormatCurrency';
import { styles } from './styles/StyleDetailOrder';
import { formatDate } from '../../../Utils/Constants/FormatDate';
import Loading from '../../../Components/Common/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/Store';
import Toast from 'react-native-root-toast';
import { useUpdateStatusOrderMutation } from '../../../Redux/RTKQuery/Slice/OrderSlice';


const DetailOrder = () => {
  const navigation = useNavigation();
  const order = useRoute()?.params?.order;
  // console.log('order', order);
  const [updateOrderState, { isLoading, isSuccess, isError }] = useUpdateStatusOrderMutation();
  const handleUpdateStatus = async (state) => {
    try {
      await updateOrderState({ id: order?.id, state: state }).unwrap();
      Alert.alert('Thành công', 'Cập nhật trạng thái thành công', [
        {
          text: 'OK',
          onPress: () => {
            setTimeout(() => {
              navigation.navigate('MainAdmin'); // Quay về ManageOrder sau 1 giây
            }, 1000);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Cập nhật thất bại');
      console.error('Error:', error);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <Pressable style={st.row}>
        <View style={styles.col1}>
          <Text style={st.rowTxt}>{index + 1}</Text>
        </View>
        <View style={styles.col2}>
          <View style={styles.containProduct}>
            <Image
              source={{
                uri: item?.image,
              }}
              width={50}
              height={50}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.nameProduct}>{item.productName}</Text>
          </View>
        </View>
        <View style={styles.col3}>
          <Text style={st.rowTxt}>
            {' '}
            {item.discount > 0
              ? formatCurrencyVND(
                item.price - (item.price * (item.discount * 10)) / 100,
              )
              : formatCurrencyVND(item.productPrice)}
          </Text>
        </View>
        <View style={styles.col4}>
          <Text style={st.rowTxt}>{item.quantity}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.containBtnBack}>
        <Ionicons name={'arrow-back'} color={Colors.black} size={28} />
      </TouchableOpacity>
      <View style={styles.inforOrder}>
        <View style={styles.containTop}>
          <Text style={styles.shopTxt}>SHOP</Text>
          <Text style={styles.txt}>
            Mã hóa đơn:{' '}
            <Text style={{ fontWeight: '400' }}>{order.orderCode}</Text>
          </Text>
          <Text style={styles.txt}>
            Ngày:{' '}
            <Text style={{ fontWeight: '400' }}>
              {formatDate(order.createdAt)}
            </Text>
          </Text>
          <Text style={styles.txt}>
            Tên khách hàng:{' '}
            <Text style={{ fontWeight: '400' }}>{order.email}</Text>
          </Text>
          <Text style={styles.txt}>
            Số điện thoại khách hàng:{' '}
            <Text style={{ fontWeight: '400' }}>
              {order.user.phone}
            </Text>
          </Text>
          <Text style={styles.txt}>
            Địa chỉ khách hàng:{' '}
            <Text style={{ fontWeight: '400' }}>
              {order.shippingAddress}
            </Text>
          </Text>
          <Text style={styles.txt}>
            Hình thức thanh toán:
            <Text style={{ fontWeight: '400' }}>{' ' + order.paymentMethod}</Text>
          </Text>
          <Text style={styles.txt}>
            Phí vận chuyển:
            <Text style={{ fontWeight: '400' }}>
              {' ' + formatCurrencyVND(0)}
            </Text>
          </Text>
          <Text style={styles.txt}>
            Tổng tiền hóa đơn:
            <Text style={{ fontWeight: '400' }}>
              {' ' + formatCurrencyVND(order.totalPrice)}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.containDetail}>
        <View style={styles.containMiddle}>
          <View style={st.headerTopBar}>
            <Text style={st.headerTopBarText}>Chi tiết hóa đơn</Text>
          </View>
          <View style={st.header}>
            <View style={styles.col1}>
              <Text style={st.headingTxt}>STT</Text>
            </View>
            <View style={styles.col2}>
              <Text style={st.headingTxt}>Sản phẩm</Text>
            </View>
            <View style={styles.col3}>
              <Text style={st.headingTxt}>Giá</Text>
            </View>
            <View style={styles.col4}>
              <Text style={st.headingTxt}>Số lượng</Text>
            </View>
          </View>
          <View style={styles.containList}>
            <FlatList
              renderItem={renderItem}
              data={order?.orderItems}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.containBottom}>
          <View style={styles.containBtn}>
            {order.state === 'Chờ xác nhận' && (
              <>
                <Pressable
                  style={[styles.btn, styles.colorYellow]}
                  onPress={() => handleUpdateStatus('Đã hủy')}
                >
                  <Text style={styles.txtBtn}>Hủy</Text>
                </Pressable>
                <Pressable
                  style={[styles.btn, styles.colorGreen]}
                  onPress={() => handleUpdateStatus('Chờ lấy hàng')}
                >
                  <Text style={styles.txtBtn}>Xác nhận</Text>
                </Pressable>
              </>
            )}
            {order.state === 'Chờ lấy hàng' && (
              <>
                <Pressable
                  style={[styles.btn, styles.colorYellow]}
                  onPress={() => handleUpdateStatus('Đã hủy')}
                >
                  <Text style={styles.txtBtn}>Hủy</Text>
                </Pressable>
                <Pressable
                  style={[styles.btn, styles.colorGreen]}
                  onPress={() => handleUpdateStatus('Đã giao hàng')}
                >
                  <Text style={styles.txtBtn}>Xác nhận</Text>
                </Pressable>
              </>
            )}
            {(order.state !== 'Chờ xác nhận' && order.state !== 'Đã giao hàng') && (
              <Pressable
                style={[styles.btn, styles.colorTint]}
                onPress={() => handleUpdateStatus('Xóa')}
              >
                <Text style={styles.txtBtn}>Xóa</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
      {/* <Loading visible={isLoading} /> */}
    </SafeAreaView>
  );
};

export default DetailOrder;