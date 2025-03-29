import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, {useEffect} from 'react';
  import {Colors} from '../../Utils/Constants/Colors';
  
  import {useSelector} from 'react-redux';
  import {formatDate} from '../../Utils/Constants/FormatDate';
  import {useNavigation} from '@react-navigation/native';
  import Loading from '../../Components/Common/Loading';
  const NotifiItem = ({item, navigation}) => {
    return (
      <Pressable
        style={styles.containerItem}
        onPress={() => {
          navigation.navigate('Order', {
            screen:
              item?.orders?.status === 'Chờ lấy hàng' ? 'Chờ lấy hàng' : 'Đã hủy',
          });
        }}>
        <View style={styles.containerLeft}>
          <Image
            source={{
              uri: item?.image,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.containerRight}>
          {item?.orders?.status === 'Chờ lấy hàng' ? (
            <>
              <Text style={styles.txtStatus}>Đơn hàng đã được xác nhận</Text>
              <Text>
                Đơn hàng {item?.orders?.orderCode} đã được người bán xác nhận, vui
                lòng đợi nhận hàng
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.txtStatus}>Đơn hàng đã bị hủy</Text>
              <Text>
                Đơn hàng {item?.orders?.orderCode} đã bị hủy, vui lòng đặt đơn
                hàng khác
              </Text>
            </>
          )}
          <Text style={styles.txtDate}>{formatDate(item.createdAt)}</Text>
        </View>
      </Pressable>
    );
  };
  const Notification = () => {
    const navigation = useNavigation<any>();
    return (
      <>
        {/* {isLoading ? (
          <LoadingComponenet />
        ) : ( */}
          <View style={styles.container}>
            {/* {data?.length > 0 && ( */}
              <Pressable 
            //   onPress={handleDelete}
              >
                <Text style={styles.deleteNoti}>Xóa tất cả thông báo</Text>
              </Pressable>
            {/* )} */}
            {/* <FlatList
              data={data}
              renderItem={({item}) => (
                <NotifiItem item={item} navigation={navigation} />
              )}
            /> */}
          </View>
        {/* )}
        <Loading visible={isLoadingNoti} /> */}
      </>
    );
  };
  
  export default Notification;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
    },
    containerLeft: {
      flex: 1,
    },
    containerRight: {
      flex: 4,
    },
    image: {
      width: 50,
      height: 50,
    },
    containerItem: {
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#c0c0c0',
    },
    txtStatus: {
      color: Colors.colorText,
    },
    txtDate: {
      fontSize: 11,
    },
    deleteNoti: {
      color: Colors.tint,
      paddingBottom: 5,
      paddingRight: 10,
      alignSelf: 'flex-end',
    },
  });
  