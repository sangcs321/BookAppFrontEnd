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
  import React, {useEffect} from 'react';
  import {Colors} from '../../../Utils/Constants/Colors';
  import {styles as st} from './styles/Style';
  import {Pressable} from 'react-native';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import formatCurrencyVND from '../../../Utils/Constants/FormatCurrency';
  import {styles} from './styles/StyleDetailOrder';
  import {formatDate} from '../../../Utils/Constants/FormatDate';
//   import {
//     useDeleteOrderMutation,
//     useGetAllOrderQuery,
//     useGetOrdersByStatusQuery,
//     useUpdateStatusOrderMutation,
//   } from '../../../Redux/RTKQuery/Slice/OrderSlice';
  import Loading from '../../../Components/Common/Loading';
  import {useSelector} from 'react-redux';
  import {RootState} from '../../../Redux/Store/Store';
  import Toast from 'react-native-root-toast';
//   import {stat} from 'react-native-fs';
//   import {getWebSocketClient} from '../../../../WebSocket';
//   import {useAddNotificationMutation} from '../../../Redux/RTKQuery/Slice/NotifiSlice';
  
  const DetailOrder = () => {
    const navigation = useNavigation();
    // const order = useRoute()?.params?.order;
    const order = {
        user : {
          name : 'Nguyễn Văn A',
            phoneNumber : '0123456789',
            address : 'Hà Nội',
        },
      orderCode : '123456789',
      createdAt : '2023-10-01T12:00:00Z',
        paymentMethod : 'Thanh toán khi nhận hàng',
        shippingAddress : {
          phoneNumber : '0123456789',
          address : 'Hà Nội',
        },
        totalPrice : 1000000,
        products : [
          {
            images : ['https://example.com/image1.jpg'],
            title : 'Sản phẩm 1',
            price : 500000,
            discount : 10,
            quantity : 2,
          },
          {
            images : ['https://example.com/image2.jpg'],
            title : 'Sản phẩm 2',
            price : 300000,
            discount : 0,
            quantity : 1,
          },
        ],
        status : 'Chờ xác nhận',
    };

    // const user = order.user;
   const user = [{phoneNumber : '0123456789', name : 'Nguyễn Văn A', address :'Hà Nội'}];
    const renderItem = ({item, index}) => {
      return (
        <Pressable style={st.row}>
          <View style={styles.col1}>
            <Text style={st.rowTxt}>{index + 1}</Text>
          </View>
          <View style={styles.col2}>
            <View style={styles.containProduct}>
              <Image
                source={{
                  uri: item?.images[0],
                }}
                width={50}
                height={50}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.nameProduct}>{item.title}</Text>
            </View>
          </View>
          <View style={styles.col3}>
            <Text style={st.rowTxt}>
              {' '}
              {item.discount > 0
                ? formatCurrencyVND(
                    item.price - (item.price * (item.discount * 10)) / 100,
                  )
                : formatCurrencyVND(item.price)}
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
            <Text style={styles.shopTxt}>MACAU SHOP</Text>
            <Text style={styles.txt}>
              Mã hóa đơn:{' '}
              <Text style={{fontWeight: '400'}}>{order.orderCode}</Text>
            </Text>
            <Text style={styles.txt}>
              Ngày:{' '}
              <Text style={{fontWeight: '400'}}>
                {formatDate(order.createdAt)}
              </Text>
            </Text>
            <Text style={styles.txt}>
              Tên khách hàng:{' '}
              <Text style={{fontWeight: '400'}}>{order.user.name}</Text>
            </Text>
            <Text style={styles.txt}>
              Số điện thoại khách hàng:{' '}
              <Text style={{fontWeight: '400'}}>
                {order.shippingAddress.phoneNumber}
              </Text>
            </Text>
            <Text style={styles.txt}>
              Địa chỉ khách hàng:{' '}
              <Text style={{fontWeight: '400'}}>
                {order.shippingAddress.address}
              </Text>
            </Text>
            <Text style={styles.txt}>
              Hình thức thanh toán:
              <Text style={{fontWeight: '400'}}>{' ' + order.paymentMethod}</Text>
            </Text>
            <Text style={styles.txt}>
              Phí vận chuyển:
              <Text style={{fontWeight: '400'}}>
                {' ' + formatCurrencyVND(0)}
              </Text>
            </Text>
            <Text style={styles.txt}>
              Tổng tiền hóa đơn:
              <Text style={{fontWeight: '400'}}>
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
                data={order?.products}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={styles.containBottom}>
            <View style={styles.containBtn}>
              {order.status === 'Chờ xác nhận' && (
                <>
                  <Pressable
                    style={[styles.btn, styles.colorYellow]}
                    // onPress={() => handleUpdateStatus('Đã hủy')}
                    >
                    <Text style={styles.txtBtn}>Hủy</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.btn, styles.colorGreen]}
                    // onPress={() => handleUpdateStatus('Chờ lấy hàng')}
                    >
                    <Text style={styles.txtBtn}>Xác nhận</Text>
                  </Pressable>
                </>
              )}
              {order.status !== 'Chờ xác nhận' && (
                <Pressable
                  style={[styles.btn, styles.colorTint]}
                //   onPress={() => handleUpdateStatus('Xóa')}
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