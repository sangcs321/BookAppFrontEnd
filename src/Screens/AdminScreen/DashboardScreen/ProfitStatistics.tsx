import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {FontSizeText} from '../../../Utils/Constants/Font';
import {Colors} from '../../../Utils/Constants/Colors';
import {useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
// import {useLazyGetRevenueQuery} from '../../../Redux/RTKQuery/Slice/StatisticsSlice';
const ProfitStatistics = () => {
  const [openYear, setOpenYear] = useState(false);
  const [categoryYear, setCategoryYear] = useState('2024');
  const [itemsYear, setItemsYear] = useState([
    {label: '2024', value: '2024'},
    {label: '2025', value: '2025'},
    {label: '2026', value: '2026'},
    {label: '2027', value: '2027'},
    {label: '2028', value: '2028'},
    {label: '2029', value: '2029'},
    {label: '2030', value: '2030'},
  ]);
  const [openperiod, setOpenperiod] = useState(false);
  const [categoryperiod, setCategoryperiod] = useState('firstHalf');
  const [itemsperiod, setItemsperiod] = useState([
    {label: '6 tháng đầu năm', value: 'firstHalf'},
    {label: '6 tháng cuối năm', value: 'secondHalf'},
  ]);
  const [labels, setLabels] = useState([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
  ]);
  // const [data, setData] = useState([1000, 2000, 5000, 8000, 8000, 8000, 9000]);
  // const [triggerGetRevenue, {data: revenueData, isLoading}] =
  //   useLazyGetRevenueQuery();

  // // Gọi API khi categoryYear hoặc categoryperiod thay đổi
  // useEffect(() => {
  //   // Trigger API để lấy dữ liệu doanh thu khi giá trị thay đổi
  //   triggerGetRevenue({year: categoryYear, period: categoryperiod});
  // }, [categoryYear, categoryperiod, triggerGetRevenue]);

  // // Lấy kết quả từ API và cập nhật labels, data
  // useEffect(() => {
  //   if (revenueData) {
  //     // Giả sử API trả về dữ liệu dạng: [{ month, totalRevenue }, ...]
  //     const months = revenueData.map(item => {
  //       switch (item.month) {
  //         case 1:
  //           return 'Jan';
  //         case 2:
  //           return 'Feb';
  //         case 3:
  //           return 'Mar';
  //         case 4:
  //           return 'Apr';
  //         case 5:
  //           return 'May';
  //         case 6:
  //           return 'Jun';
  //         case 7:
  //           return 'Jul';
  //         case 8:
  //           return 'Aug';
  //         case 9:
  //           return 'Sep';
  //         case 10:
  //           return 'Oct';
  //         case 11:
  //           return 'Nov';
  //         case 12:
  //           return 'Dec';
  //         default:
  //           return '';
  //       }
  //     });
  //     const exchangeRate = 25000;

  //     const profits = revenueData.map(item => item.totalProfit / exchangeRate);

  //     setLabels(months);
  //     setData(profits);
  //   }
  // }, [revenueData]);
  const data = [
    1000, 2000, 5000, 8000, 8000, 8000, 9000,];
  return (
    <View style={styles.container}>
      <View style={styles.select}>
        <View style={styles.selectYear}>
          <DropDownPicker
            style={{
              borderColor: '#B7B7B7',
              height: 30,
            }}
            open={openYear}
            value={categoryYear}
            items={itemsYear}
            setOpen={setOpenYear}
            setValue={setCategoryYear}
            setItems={setItemsYear}
            placeholder="choose category"
          />
        </View>
        <View style={styles.selectPeriod}>
          <DropDownPicker
            style={{
              borderColor: '#B7B7B7',
              height: 30,
            }}
            open={openperiod}
            value={categoryperiod}
            items={itemsperiod}
            setOpen={setOpenperiod}
            setValue={setCategoryperiod}
            setItems={setItemsperiod}
            placeholder="choose category"
          />
        </View>
      </View>
      <View>
        <Text style={styles.title}>Thống kê lợi nhuận</Text>
      </View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={250}
        yAxisSuffix="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ProfitStatistics;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  select: {
    flexDirection: 'row',
    gap: 5,
  },
  selectYear: {
    flex: 1,
  },
  selectPeriod: {
    flex: 2,
  },
  title: {
    alignSelf: 'center',
    fontSize: FontSizeText.fsMedium,
    fontWeight: 'bold',
    color: Colors.colorText,
    paddingTop: 30,
  },
});