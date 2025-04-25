import {
    Text,
    View,
    FlatList,
    Image,
    Modal,
    Pressable,
    TouchableWithoutFeedback,
    TextInput,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Colors} from '../../../Utils/Constants/Colors';
  import formatCurrencyVND from '../../../Utils/Constants/FormatCurrency';
  import Feather from 'react-native-vector-icons/Feather';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {styles} from './styles/StyleManageProduct';
//   import AddProductScreen from './AddProduct';
//   import {
//     useGetProductsAdminQuery,
//     useLazyFilterProductQuery,
//   } from '../../../Redux/RTKQuery/Slice/ProductSlice';
  import DropDownPicker from 'react-native-dropdown-picker';
  import {useNavigation} from '@react-navigation/native';
//   import {ProductProps} from '../../../Types/Type';
  import {Calendar} from 'react-native-calendars';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddProductScreen from './AddProduct';
//   import LoadingComponenet from '../../../Components/LoadingComponenet';
  
  const ManageProduct = () => {
    // const {data, isLoading} = useGetProductsAdminQuery(undefined);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('Tất cả sản phẩm');
    const [visible, setVisible] = useState<boolean>(false);
    const [items, setItems] = useState([
      {label: 'Tất cả sản phẩm', value: 'Tất cả sản phẩm'},
      {label: 'Sản phẩm ngưng bán', value: 'Sản phẩm ngưng bán'},
      {label: 'Sản phẩm đang bán', value: 'Sản phẩm đang bán'},
      {label: 'Điện thoại', value: 'Điện thoại'},
      {label: 'LapTop', value: 'LapTop'},
      {label: 'Đồng hồ', value: 'Đồng hồ'},
      {label: 'Tai nghe', value: 'Tai nghe'},
      {label: 'Phụ kiện', value: 'Phụ kiện'},
    ]);
    const navigation = useNavigation<any>();
  
    const [isVisibleFilter, setIsVisibleFilter] = useState(false);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [nameProduct, setNameProduct] = useState<string>();
    const [createdDate, setCreatedDate] = useState<any>();
    const [productsFilter, setProductsFilter] = useState([]);
    const [sort, setSort] = useState('');
    // const [triggerFilterProduct, {isLoading: loadingFilter}] =
    //   useLazyFilterProductQuery();
   
    const handleUnFilter = () => {
      setCreatedDate('');
      setNameProduct('');
      setCategory('Tất cả sản phẩm');
      setSort('');
    };
    
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
    const products = [ {images: ['https://res.cloudinary.com/dms5ykyhc/image/upload/v1744427397/vbrqhmc7aysxm2zepodo.png'], title: 'Sách 1', price: 100000, discount: 0, rate: 4.5,id:'1',quantity:2},]; //data?.products;
    // const products = category === 'Tất cả sản phẩm' ? productsFilter : productsFilter.filter((item: any) => item.category === category);
    const renderItem = ({item, index}) => {
      return (
        <>
          {/* {loadingFilter ? (
            <LoadingComponenet />
          ) : ( */}
            <Pressable
              style={[styles.row, {opacity: item?.hide ? 0.7 : 1}]}
              onPress={() =>
                navigation.navigate('EditProduct', {
                  product: item,
                })
              }>
              <View style={styles.col1}>
                <Text style={styles.rowTxt}>{index + 1}</Text>
              </View>
              <View style={styles.col2}>
                <View style={styles.containProduct}>
                  <Image
                    source={{uri: item.images[0]}}
                    width={50}
                    height={50}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <Text
                    style={styles.nameProduct}
                    numberOfLines={1}
                    lineBreakMode="tail">
                    {item.title}
                  </Text>
                </View>
              </View>
              <View style={styles.col3}>
                <Text style={styles.rowTxt}>{formatCurrencyVND(item.price)}</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.rowTxt}>{item.quantity}</Text>
              </View>
              {item.hide && (
                <AntDesign
                  name="lock"
                  color="red"
                  size={20}
                  style={styles.iconLock}
                />
              )}
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
            <Text style={styles.headerTopBarText}>Products</Text>
            <View style={styles.filters}>
              <Pressable onPress={() => setIsVisibleFilter(true)}>
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
              <Pressable onPress={() => setVisible(true)}>
                <Feather name={'plus-circle'} size={20} color={Colors.white} />
              </Pressable>
            </View>
          </View>
          <View style={styles.header}>
            <View style={styles.col1}>
              <Text style={styles.headingTxt}>STT</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.headingTxt}>Sản phẩm</Text>
            </View>
            <View style={styles.col3}>
              <Text style={styles.headingTxt}>Giá</Text>
            </View>
            <View style={styles.col4}>
              <Text style={styles.headingTxt}>Số Lượng</Text>
            </View>
          </View>
          {/* {(loadingFilter || isLoading) && <LoadingComponenet />} */}
          {/* {!loadingFilter &&  */}
          (
            <>
              {products?.length > 0 ? (
                <FlatList
                  renderItem={renderItem}
                  data={products}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <Text style={styles.txtNoOrders}>Không có sản phẩm nào</Text>
              )}
            </>
          )
          {/* } */}
        </View>
        <Modal
          visible={visible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setVisible(false)}>
          <Pressable
            style={styles.containModal}
            onPressIn={() => setVisible(false)}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <AddProductScreen setVisible={setVisible} />
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
        <Modal visible={isVisibleFilter} transparent>
          <Pressable
            style={styles.containModal}
            onPress={() => setIsVisibleFilter(false)}>
            <View style={styles.filterOrderCodeAndDate}>
              <View style={styles.titleFilter}>
                <Text style={styles.txtTitleFilter}>Lọc sản phẩm</Text>
              </View>
              <View style={styles.date}>
                <TextInput
                  style={styles.inputFilter}
                  placeholder="Lọc sản phẩm theo ngày dd/mm/yyyy"
                  value={createdDate}
                  onChangeText={setCreatedDate}
                />
                <Pressable onPress={onSelectDate}>
                  <FontAwesome name={'calendar'} size={20} color={Colors.tint} />
                </Pressable>
              </View>
              <TextInput
                style={styles.inputFilter}
                placeholder="Lọc sản phẩm theo tên"
                value={nameProduct}
                onChangeText={setNameProduct}
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
          <Pressable style={styles.containModal}>
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
  
  export default ManageProduct;
  