import { StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Constants/Colors";
import { FontSizeText } from "../../../Utils/Constants/Font";

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginBottom: 10,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    shop: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    txtNameShop: {
      color: Colors.tint,
      fontSize: FontSizeText.fsSmall,
      fontWeight: '600',
    },
    txtWaiting: {
      color: 'red',
      fontSize: FontSizeText.fsSmall,
    },
    product: {
      flexDirection: 'row',
      gap: 10,      
    },
    image: {
      width: 70,
      height: 70,
      marginVertical: 8,
      borderRadius: 10,
      flex: 1,
    },
    inforProduct: {
      marginTop: 6,
      flex: 3,
    },
    colorAndQuality: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    txtNameProduct: {
      color: Colors.colorText,
      fontSize: 15,
    },
    txtColorAndQuality: {
      fontSize: FontSizeText.fsSmall,
    },
    txtPrice: {
      alignSelf: 'flex-end',
      color: Colors.colorText,
      fontSize: FontSizeText.fsSmall,
      paddingTop: 15,
    },
    containTotal: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 5,
    },
    txtTotal: {
      alignSelf: 'flex-end',
      color: Colors.colorText,
      fontSize: FontSizeText.fsSmall,
      fontWeight: '500',
    },
    txtTotalPrice: {
      alignSelf: 'flex-end',
      color: Colors.tint,
      fontSize: 14,
      fontWeight: '500',
    },
    seeMore: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 3,
    },
    txtSeemore: {
      fontSize: FontSizeText.fsSmall,
    },
    btnVerify: {
      alignSelf: 'flex-end',
      borderRadius: 6,
      marginTop: 10,
      alignItems: 'center',
      borderWidth:1,
      borderColor: Colors.tint,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: 'white'
    },
    txtVerify: {
      color: Colors.tint,
    },
  });
  export default styles;