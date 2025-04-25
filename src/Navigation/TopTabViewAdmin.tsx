import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions} from 'react-native';
import {Colors} from '../Utils/Constants/Colors';
import ManageProduct from '../Screens/AdminScreen/ManageScreen/ManageProduct';
import ManageOrder from '../Screens/AdminScreen/ManageScreen/ManageOrder';
import ManageAccount from '../Screens/AdminScreen/ManageScreen/ManageAccount';

const Tab = createMaterialTopTabNavigator();

function TopTabViewAdmin() {
  const {width, height} = Dimensions.get('screen');
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true, // Kích hoạt cuộn ngang
        tabBarItemStyle: {width: width / 2.5}, // Đặt độ rộng cho mỗi tab, đảm bảo hiển thị 3 tab
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: 'none',
        }, // Cỡ chữ của tiêu đề trong tab
        tabBarActiveTintColor: Colors.tint, // Màu của tab khi được chọn
        tabBarInactiveTintColor: Colors.colorText, // Màu của tab khi không được chọn
        tabBarIndicatorStyle: {
          backgroundColor: Colors.tint, // Màu của thanh chỉ báo (indicator)
        },
      }}>
      <Tab.Screen
        options={{title: 'Đơn hàng'}}
        name="Đơn hàng"
        component={ManageOrder}
      />
      <Tab.Screen name="Sản phẩm" component={ManageProduct} />
      <Tab.Screen name="Tài khoản" component={ManageAccount} />
    </Tab.Navigator>
  );
}
export default TopTabViewAdmin;