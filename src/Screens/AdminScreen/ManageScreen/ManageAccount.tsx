import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Pressable,
    Modal,
    TextInput,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Colors} from '../../../Utils/Constants/Colors';
  import Feather from 'react-native-vector-icons/Feather';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {styles} from './styles/StyleManageAccount';

//   import {
//     useGetUsersQuery,
//     useLazyFilterAccountQuery,
//   } from '../../../Redux/RTKQuery/Slice/UserSlice';
//   import AddAccountScreen from './AddAccount';
  import {useNavigation} from '@react-navigation/native';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import DropDownPicker from 'react-native-dropdown-picker';
import AddAccountScreen from './AddAccount';
//   import LoadingComponenet from '../../../Components/LoadingComponenet';
  const ManageAccount = () => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('Tất cả tài khoản');
    const [items, setItems] = useState([
      {label: 'Tất cả tài khoản', value: 'Tất cả tài khoản'},
      {label: 'Bị khóa', value: 'Bị khóa'},
      {label: 'Đang hoạt động', value: 'Đang hoạt động'},
    ]);
    // const {data, isLoading} = useGetUsersQuery(undefined);
    const [visible, setVisible] = useState<boolean>(false); // setVisible của modal add user
    const [isVisibleFilter, setVisibleFilter] = useState<boolean>(false); // setVisible của modal filter
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [accountsFilter, setAccountFilter] = useState([]);
    const listAccount = [{name:'Dang Thanh Sang',email:'thanhsangdang34@gmail.com'},{name:'Dang Thanh Sang',email:'thanhsangdang34@gmail.com',isBlock:true}]; // data?.users || [];
    // const [
    //   triggerFilterAccount,
    //   {data: accountFilterData, isLoading: filterLoading},
    // ] = useLazyFilterAccountQuery();
    // const handleFilter = async () => {
    //   setVisibleFilter(false);
    //   const result = await triggerFilterAccount({
    //     email: email,
    //     username: username,
    //   });
    //   if (result?.data) {
    //     setAccountFilter(result.data);
    //   } else {
    //     setAccountFilter([]);
    //   }
    // };
    // const handleUnFilter = () => {
    //   setEmail('');
    //   setUsername('');
    //   setStatus('Tất cả tài khoản');
    // };
    // let listAccount =
    //   !email && !username
    //     ? data?.users.filter(user => {
    //         if (status === 'Tất cả tài khoản') {
    //           return user;
    //         } else if (status === 'Bị khóa') {
    //           return user?.isBlock === true;
    //         } else if (status === 'Đang hoạt động') {
    //           return user?.isBlock === false;
    //         }
    //         return user;
    //       })
    //     : accountsFilter?.filter(user => {
    //         if (status === 'Tất cả tài khoản') {
    //           return user;
    //         } else if (status === 'Bị khóa') {
    //           return user?.isBlock === true;
    //         } else if (status === 'Đang hoạt động') {
    //           return user?.isBlock === false;
    //         }
    //         return user;
    //       });
    const renderItem = ({item, index}: any) => {
      return (
        <>
          {/* {filterLoading ? (
            <LoadingComponenet />
          ) : ( */}
            <Pressable
              onPress={() => navigation.navigate('DetailAccount', {user: item})}>
              <View style={[styles.rowAcc, {opacity: item?.isBlock ? 0.7 : 1}]}>
                <View style={styles.col1}>
                  <Text style={styles.rowTxt}>{index + 1}</Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.rowTxt}>{item.name}</Text>
                </View>
                <View style={styles.col3}>
                  <Text style={styles.rowTxt}>{item.email}</Text>
                </View>
                {item.isBlock && (
                  <AntDesign
                    name="lock"
                    color="red"
                    size={20}
                    style={styles.iconLock}
                  />
                )}
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
              value={status} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setStatus}
              setItems={setItems}
              placeholder="choose category"
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.headerTopBar}>
            <Text style={styles.headerTopBarText}>Accounts</Text>
            <View style={styles.filters}>
              <Pressable onPress={() => setVisibleFilter(true)}>
                <MaterialCommunityIcons
                  name={'filter-menu'}
                  size={20}
                  color={Colors.white}
                />
              </Pressable>
              <Pressable 
            //   onPress={handleUnFilter}
              >
                <MaterialCommunityIcons
                  name={'filter-off'}
                  size={20}
                  color={Colors.white}
                />
              </Pressable>
            </View>
            <Pressable onPress={() => setVisible(true)}>
              <Feather name={'plus-circle'} size={26} color={Colors.white} />
            </Pressable>
          </View>
          <View style={styles.header}>
            <View style={styles.col1}>
              <Text style={styles.headingTxt}>STT</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.headingTxt}>Họ và tên</Text>
            </View>
            <View style={styles.col3}>
              <Text style={styles.headingTxt}>Email</Text>
            </View>
          </View>
  
          {/* {(filterLoading || isLoading) && <LoadingComponenet />}
          {!filterLoading && ( */}
            <>
              {listAccount?.length > 0 && (
                <FlatList
                  renderItem={renderItem}
                  data={listAccount}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
              {listAccount?.length === 0 && (
                <Text style={styles.txtNoOrders}>Không có tài khoản nào</Text>
              )}
            </>
          {/* )} */}
        </View>
        <Modal // modal add user
          visible={visible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setVisible(false)}>
          <Pressable
            style={styles.containModal}
            // onPressIn={() => setVisible(false)}
          >
            <Pressable>
              <View style={styles.modal}>
                <AddAccountScreen setVisible={setVisible} />
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        <Modal visible={isVisibleFilter} transparent>
          <Pressable // modal filter
            style={styles.containModal}
            onPress={() => {
              setVisibleFilter(false);
              setUsername('');
              setEmail('');
            }}>
            <View style={styles.filterOrderCodeAndDate}>
              <View style={styles.titleFilter}>
                <Text style={styles.txtTitleFilter}>Lọc tài khoản</Text>
              </View>
              <TextInput
                style={styles.inputFilter}
                placeholder="Lọc tài khoản theo tên"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.inputFilter}
                placeholder="Lọc tài khoản theo Email"
                value={email}
                onChangeText={setEmail}
              />
              <Pressable
            //    onPress={handleFilter}
               >
                <Text style={styles.btnFilter}>Lọc</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </>
    );
  };
  
  export default ManageAccount;