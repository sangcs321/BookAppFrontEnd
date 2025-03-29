import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Colors} from '../../Utils/Constants/Colors';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import Feather from 'react-native-vector-icons/Feather';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import styles from './style';
  import {useSelector} from 'react-redux';
  import {useNavigation} from '@react-navigation/native';
//   import LoadingComponenet from '../../Components/LoadingComponenet';
  
  import {FontSizeText} from '../../Utils/Constants/Font';
  
  const ProfileScreen = () => {
    const navigate = useNavigation<any>();
    
    return (
      <>
        {/* {(isLoading || loadingOrderNoteRate) && <LoadingComponenet />}
        {!isLoading && !loadingOrderNoteRate && ( */}
          <>
            <View>
              <Pressable
                style={styles.containAvatar}
                onPress={() => {
                  navigate.navigate('EditProfile');
                }}>
                <View>
                  <Image
                    source={{
                      uri: user.avatar,
                    }}
                    style={styles.avatarImage}
                  />
                  <FontAwesome5
                    name="pen"
                    size={12}
                    color={'white'}
                    style={styles.btnEdit}
                  />
                </View>
                <View style={styles.containInfor}>
                  <Text style={styles.txtHello}>Xin chào!</Text>
                  <Text style={styles.txtName}>{user?.name}</Text>
                </View>
                <Pressable
                  style={styles.btnChat}
                  onPress={() =>
                    navigate.navigate('Chat', {
                      chatroomId: user.id + 'admin',
                      userId: user.id,
                    })
                  }>
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    color={'white'}
                    size={24}
                  />
                </Pressable>
              </Pressable>
  
              {/* {!user.verified ? (
                <View style={styles.containConfirm}>
                  <MaterialCommunityIcons
                    name={'email-outline'}
                    size={18}
                    color={'#000080'}
                    style={{paddingTop: 7}}
                  />
                  <TouchableOpacity onPress={() => reVerife(user.id)}>
                    <Text style={styles.txtConfirm}>
                      Ấn vào đây để lấy link xác nhận tài khoản của bạn trong
                      email, xác nhận và bắt đầu mua hàng
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )} */}
              <View style={styles.containOrder}>
                <Pressable
                  style={styles.headerOrder}
                  onPress={() => {
                    ForwardOrderPage('Đã giao');
                  }}>
                  <Text style={styles.txtOrder}>Đơn mua</Text>
                  <Text style={styles.txtHistory}>Xem lịch sử mua hàng</Text>
                </Pressable>
                <View style={styles.containStatusOrder}>
                  <Pressable
                    style={styles.btnStatusOrder}
                    onPress={() => {
                      ForwardOrderPage('Chờ xác nhận');
                    }}>
                    <AntDesign name="wallet" size={22} color={Colors.black} />
                    <Text style={styles.badge}>
                      {ordersWaiting?.orders.length}
                    </Text>
                    <Text style={styles.txtStatusOrder}>Chờ xác nhận</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnStatusOrder}
                    onPress={() => {
                      ForwardOrderPage('Chờ lấy hàng');
                    }}>
                    <AntDesign name="gift" size={22} color={Colors.black} />
                    <Text style={styles.badge}>
                      {orderConfirmed?.orders.length}
                    </Text>
                    <Text style={styles.txtStatusOrder}>Chờ lấy hàng</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnStatusOrder}
                    onPress={() => {
                      ForwardOrderPage('Đã giao');
                    }}>
                    <Feather name="truck" size={22} color={Colors.black} />
                    <Text style={styles.badge}>0</Text>
                    <Text style={styles.txtStatusOrder}>Chờ giao hàng</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnStatusOrder}
                    onPress={() => navigate.navigate('ReviewScreen')}>
                    <MaterialCommunityIcons
                      name="star-circle-outline"
                      size={22}
                      color={Colors.black}
                    />
                    <Text style={styles.badge_2}>
                      {orderNotRate?.ordersWithoutReviews.length}
                    </Text>
                    <Text style={styles.txtStatusOrder}>Đánh giá</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <Pressable style={styles.btnSignOut} 
            // onPress={handleSignOut}
            >
              <Text style={styles.txtSignOut}>Đăng xuất</Text>
            </Pressable>
          </>
        {/* )} */}
      </>
    );
  };
  
  export default ProfileScreen;
  