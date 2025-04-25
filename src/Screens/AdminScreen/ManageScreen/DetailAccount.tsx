import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Pressable,
    ScrollView,
    TextInput,
    Alert,
    SafeAreaView,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {Colors} from '../../../Utils/Constants/Colors';
  import {styles} from './styles/StyleDetailAccount';
  import DropDownPicker from 'react-native-dropdown-picker';
  import {
    useBlockUserAdminMutation,
    useEditUserAdminMutation,
    useGetUsersQuery,
  } from '../../../Redux/RTKQuery/Slice/UserSlice';
  import Toast from 'react-native-root-toast';
  import Loading from '../../../Components/Common/Loading';
//   import {getWebSocketClient} from '../../../../WebSocket';
  
  const DetailAccont = () => {
    const navigation = useNavigation<any>();
    const user = useRoute()?.params?.user;
    console.log(user);
    const [block, setBlock] = useState(user.isBlock);
    const [open, setOpen] = useState(false); // Trạng thái mở/đóng DropDown
    const [role, setRole] = useState(user.role); // Giá trị được chọn
    const [items, setItems] = useState([
      // Các tùy chọn trong DropDown
      {label: 'Người dùng', value: 'User'},
      {label: 'Admin', value: 'Admin'},
    ]);
    const [hasChanges, setHasChanges] = useState(false);
    useEffect(() => {
      if (role !== user.role) {
        setHasChanges(true);
      } else {
        setHasChanges(false);
      }
    }, [role]);
  
    const [
      editUserAdmin,
      {isLoading: isLoadingEdit, isSuccess: isSuccessEdit, isError: isErrorEdit},
    ] = useEditUserAdminMutation();
    const [
      blockUserAdmin,
      {
        isLoading: isLoadingBlock,
        isSuccess: isSuccessBlock,
        isError: isErrorBlock,
      },
    ] = useBlockUserAdminMutation();
    const handleEditRole = async () => {
      const ro = role;
      const userNew = {email: user.email, role: ro};
      await editUserAdmin({userNew});
    };
    const handleBlock = () => {
      const userBlock = {email: user.email, block: !block};
      console.log(block);
      Alert.alert(
        'Xác nhận',
        !block
          ? 'Bạn có muốn chặn tài khoản này?'
          : 'Bạn có muốn mở chặn tài khoản này?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await blockUserAdmin({userBlock});
            },
          },
        ],
      );
    };
    const {refetch} = useGetUsersQuery(undefined);
    useEffect(() => {
      if (isSuccessEdit) {
        refetch();
        let toast = Toast.show('Chỉnh sửa thành công', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
        const time = setTimeout(() => {
          toast.hide;
        }, 700);
        return () => clearTimeout(time);
      }
    }, [isSuccessEdit]);
    // useEffect(() => {
    //   const client = getWebSocketClient();
    //   if (isSuccessBlock) {
    //     if (!block) {
    //       client.send(JSON.stringify(`Blocked user/${user._id}`));
    //     }
    //     refetch();
    //     setBlock(!block);
    //     let toast = Toast.show(
    //       !block ? 'Chặn tài khoản thành công' : 'Mở chặn tài khoản thành công',
    //       {
    //         duration: Toast.durations.SHORT,
    //         position: Toast.positions.CENTER,
    //       },
    //     );
    //     const time = setTimeout(() => {
    //       toast.hide;
    //     }, 700);
    //     return () => clearTimeout(time);
    //   }
    // }, [isSuccessBlock]);
    return (
      <>
     
        <ScrollView>
          <View style={styles.containerHeader}>
            <Pressable
              style={styles.containBtnBack}
              onPress={() => navigation.goBack()}>
              <Ionicons name={'arrow-back'} color={Colors.white} size={28} />
            </Pressable>
            <View>
              <Image
                source={{
                  uri:
                    user.avatar ||
                    'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
                }}
                style={styles.image}
              />
              <Text style={styles.textName}>{user.name}</Text>
            </View>
          </View>
          <View style={styles.containerBody}>
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} value={user.email} editable={false} />
            <Text style={styles.label}>Địa chỉ:</Text>
            <TextInput
              style={styles.input}
              value={user.address}
              editable={false}
            />
            <Text style={styles.label}>Số điện thoại:</Text>
            <TextInput
              style={styles.input}
              value={user.phoneNumber}
              editable={false}
            />
            <Text style={styles.label}>Vai trò:</Text>
            <View style={styles.containDropdown}>
              <DropDownPicker
                style={{
                  borderColor: '#ccc',
                  height: 30,
                }}
                open={open}
                value={role}
                items={items}
                setOpen={setOpen}
                setValue={setRole}
                setItems={setItems}
                placeholder="Vai trò"
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
          </View>
        </ScrollView>
  
        <View style={styles.containBtnbBot}>
          <Pressable style={[styles.btn, styles.colorTint]} onPress={handleBlock}>
            <Text style={styles.txtBtn}>{block ? 'Bỏ chặn' : 'Chặn'}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              styles.colorTint,
              !hasChanges && {backgroundColor: 'gray'},
            ]}
            onPress={handleEditRole}
            disabled={!hasChanges} // Vô hiệu hóa nút khi không có thay đổi
          >
            <Text style={styles.txtBtn}>Chỉnh sửa</Text>
          </Pressable>
          {user?.role !== 'Admin' && (
            <Pressable
              style={[styles.btn, styles.colorTint]}
              onPress={() =>
                navigation.navigate('Chat', {
                  chatroomId: user._id + 'admin',
                  userId: user._id,
                  avatar: user.avatar,
                  name: user.name,
                })
              }>
              <Text style={styles.txtBtn}>Nhắn tin</Text>
            </Pressable>
          )}
        </View>
        <Loading visible={isLoadingBlock || isLoadingEdit} />
        
      </>
    );
  };
  export default DetailAccont;