import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions} from 'react-native';
import {Colors} from '../Utils/Constants/Colors';
import ProfitStatistics from '../Screens/AdminScreen/DashboardScreen/ProfitStatistics';
import RevenueStatistics from '../Screens/AdminScreen/DashboardScreen/RevenueStatistics';


const Tab = createMaterialTopTabNavigator();

function TopTabViewDashBoardAdmin() {
  const {width, height} = Dimensions.get('screen');
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true, // Kích hoạt cuộn ngang
        tabBarItemStyle: {width: width / 2}, // Đặt độ rộng cho mỗi tab, đảm bảo hiển thị 3 tab
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
      <Tab.Screen name="Doanh thu" component={RevenueStatistics} />
      <Tab.Screen name="Lợi nhuận" component={ProfitStatistics} />
      {/* <Tab.Screen name="Sản phẩm" component={ProductStatistics} />
      <Tab.Screen name="Tài khoản" component={UserStatistics} /> */}
    </Tab.Navigator>
  );
}
export default TopTabViewDashBoardAdmin;