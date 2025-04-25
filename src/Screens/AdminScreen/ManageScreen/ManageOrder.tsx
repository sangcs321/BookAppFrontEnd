import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Pressable,
    TextInput,
    Modal,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import DropDownPicker from 'react-native-dropdown-picker';
  import {useNavigation} from '@react-navigation/native';
  import {styles} from './styles/Style';
//   import {
//     useGetAllOrderQuery,
//     useLazyFilterOrderQuery,
//   } from '../../../Redux/RTKQuery/Slice/OrderSlice';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import {Colors} from '../../../Utils/Constants/Colors';
  import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
//   import LoadingComponenet from '../../../Components/LoadingComponenet';
  
  const ManageOrder = () => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('Chờ xác nhận');
    const [visible, setVisible] = useState<boolean>(false);
    const [items, setItems] = useState([
      {label: 'Tất cả đơn hàng', value: 'Tất cả đơn hàng'},
      {label: 'Chờ xác nhận', value: 'Chờ xác nhận'},
      {label: 'Chờ lấy hàng', value: 'Chờ lấy hàng'},
      {label: 'Đã giao', value: 'Đã giao'},
      {label: 'Đã hủy', value: 'Đã hủy'},
    ]);
    const navigation = useNavigation<any>();
    // const {data, isLoading} = useGetAllOrderQuery(undefined);
  
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [orderCode, setOrderCode] = useState<string>();
    const [createdDate, setCreatedDate] = useState<any>();
    const [ordersFilter, setOrderFilter] = useState([]);
    const [sort, setSort] = useState('');
    const listOrder = [{orderCode:'DH001',user:{name:'Nguyen Van A'},status:'Chờ xác nhận'},{orderCode:'DH002',user:{name:'Nguyen Van B'},status:'Chờ lấy hàng'}]; // data?.orders || [];
    // const [
    //   triggerFilterOrder,
    //   {data: orderFilterData, isLoading: filterLoading},
    // ] = useLazyFilterOrderQuery();
    // const handleFilter = async () => {
    //   setVisible(false);
  
    //   const result = await triggerFilterOrder({
    //     orderCode: orderCode,
    //     createdDate: createdDate,
    //   });
  
    //   if (result?.data) {
    //     setOrderFilter(result.data);
    //   } else {
    //     setOrderFilter([]);
    //   }
    // };
    const handleUnFilter = () => {
      setCreatedDate('');
      setOrderCode('');
      setCategory('Tất cả đơn hàng');
      setSort('');
    };
    // const handleSort = async type => {
    //   setSort(type);
    //   const result = await triggerFilterOrder({
    //     orderCode: orderCode,
    //     createdDate: createdDate,
    //     sortDate: type === 'increase' ? 'increase' : 'decrease',
    //   });
  
    //   if (result?.data) {
    //     setOrderFilter(result.data);
    //   } else {
    //     setOrderFilter([]);
    //   }
    // };
    const hideCalendar = () => {
      setCalendarVisible(false);
    };
  
    const onDayPress = (date: any) => {
      let changeDay;
      if (parseInt(date.day) < 10) {
        changeDay = '0' + date.day;
      } else {
        changeDay = date.day;
      }
      setCreatedDate(changeDay + '/' + date.month + '/' + date.year);
      hideCalendar();
    };
    const onSelectDate = () => {
      setCalendarVisible(true);
    };
    // let listOrder =
    //   !sort && !orderCode && !createdDate
    //     ? data?.orders.filter(order => {
    //         if (category === 'Tất cả đơn hàng') {
    //           return order;
    //         }
    //         return order?.status === category;
    //       })
    //     : ordersFilter.filter(order => {
    //         if (category === 'Tất cả đơn hàng') {
    //           return order;
    //         }
    //         return order?.status === category;
    //       });
  
    const renderItem = ({item, index}) => {
      return (
        <>
          {/* {filterLoading ? (
            <LoadingComponenet />
          ) : ( */}
            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate('DetailOrder', {order: item})}>
              <View style={styles.col1}>
                <Text style={styles.rowTxt}>{index + 1}</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.rowTxt}>{item.orderCode}</Text>
              </View>
              <View style={styles.col3}>
                <Text style={styles.rowTxt}>{item?.user?.name}</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.rowTxt}>{item.status}</Text>
              </View>
            </Pressable>
          {/* )} */}
        </>
      );
    };
    return (
      <>
        <View>
          <View style={styles.filterStatus}>
            <DropDownPicker
              style={{
                borderColor: '#B7B7B7',
                height: 30,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.headerTopBar}>
            <Text style={styles.headerTopBarText}>Orders</Text>
            <View style={styles.filters}>
              <Pressable
                onPress={() => {
                  setVisible(true);
                }}>
                <MaterialCommunityIcons
                  name={'filter-menu'}
                  size={20}
                  color={Colors.white}
                />
              </Pressable>
              <Pressable onPress={handleUnFilter}>
                <MaterialCommunityIcons
                  name={'filter-off'}
                  size={20}
                  color={Colors.white}
                />
              </Pressable>
              <Pressable 
            //   onPress={() => handleSort('decrease')}
                >
                <MaterialCommunityIcons
                  name={'sort-calendar-ascending'}
                  size={20}
                  color={Colors.white}
                />
              </Pressable>
              <Pressable
            //    onPress={() => handleSort('increase')}
               >
                <MaterialCommunityIcons
                  name={'sort-calendar-descending'}
                  size={20}
                  color={Colors.white}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.header}>
            <View style={styles.col1}>
              <Text style={styles.headingTxt}>STT</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.headingTxt}>Mã đơn hàng</Text>
            </View>
            <View style={styles.col3}>
              <Text
                style={styles.headingTxt}
                ellipsizeMode="tail"
                numberOfLines={1}>
                Tên khách hàng
              </Text>
            </View>
            <View style={styles.col4}>
              <Text style={styles.headingTxt}>Trạng thái</Text>
            </View>
          </View>
          {/* {(filterLoading || isLoading) && <LoadingComponenet />}
          {!filterLoading && ( */}
            <>
              {listOrder?.length > 0 && (
                <FlatList
                  renderItem={renderItem}
                  data={listOrder}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
              {listOrder?.length === 0 && (
                <Text style={styles.txtNoOrders}>Không có đơn hàng nào</Text>
              )}
            </>
          {/* )} */}
        </View>
        <Modal visible={visible} transparent>
          <Pressable
            style={styles.containModal}
            onPress={() => {
              setVisible(false);
              setOrderCode('');
              setCreatedDate('');
            }}>
            <View style={styles.filterOrderCodeAndDate}>
              <View style={styles.titleFilter}>
                <Text style={styles.txtTitleFilter}>Lọc đơn hàng</Text>
              </View>
              <View style={styles.date}>
                <TextInput
                  style={styles.inputFilter}
                  placeholder="Lọc đơn hàng theo ngày dd/mm/yyyy"
                  value={createdDate}
                  onChangeText={setCreatedDate}
                />
                <Pressable onPress={onSelectDate}>
                  <FontAwesome name={'calendar'} size={20} color={Colors.tint} />
                </Pressable>
              </View>
              <TextInput
                style={styles.inputFilter}
                placeholder="Lọc đơn hàng theo mã đơn hàng"
                value={orderCode}
                onChangeText={setOrderCode}
              />
              <Pressable
            //    onPress={handleFilter}
               >
                <Text style={styles.btnFilter}>Lọc</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
        <Modal visible={isCalendarVisible}>
          <Pressable
            style={styles.containModal}
            onPress={() => setVisible(false)}>
            <View style={styles.filterOrderCodeAndDate}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{
                  [createdDate]: {
                    createdDate: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'orange',
                  },
                }}
                theme={{
                  selectedDayBackgroundColor: 'blue',
                  todayTextColor: 'red',
                  arrowColor: 'blue',
                }}
              />
            </View>
          </Pressable>
        </Modal>
      </>
    );
  };
  
  export default ManageOrder;