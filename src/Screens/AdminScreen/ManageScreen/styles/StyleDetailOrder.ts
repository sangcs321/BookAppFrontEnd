import { Dimensions, StyleSheet } from "react-native";
import { FontSizeText } from "../../../../Utils/Constants/Font";
import { Colors } from "../../../../Utils/Constants/Colors";

 export const styles = StyleSheet.create({
    background: {
      flex: 1,
      paddingHorizontal: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderTxt: {
      fontSize: 26,
      color: Colors.colorText,
      fontWeight: '900',
    },
    shopTxt: {
      color: Colors.tint,
      fontWeight: '900',
      fontSize: FontSizeText.fsMedium,
    },
    txt: {
      fontSize: FontSizeText.fsSmall,
      color: Colors.colorText,
      lineHeight: 23,
      fontWeight: 'bold',
    },
    inforOrder: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 40,
    },
    containDetail: {
      marginTop: 10,
      flex: 1,
    },
    containProduct: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 2,
    },
    image: {
      flex: 3,
    },
    nameProduct: {
      flex: 7,
      color: Colors.colorText,
      fontSize: FontSizeText.fsSmall,
    },
    col1: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    col2: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    col3: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    col4: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containList: {
      flex: 1,
    },
    containTxtTotal: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 5,
      justifyContent: 'flex-start',
      
    },
    txtFee: {
      fontSize: FontSizeText.fsSmall,
      color: Colors.colorText,
      fontWeight: 'bold',
    },
    txtPriceFee: {
      color: 'black',
      fontSize: 18,
    },
    txtTotal: {
      fontSize: FontSizeText.fsSmall,
      color: Colors.colorText,
      fontWeight: 'bold',
    },
    txtPriceTotal: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: 18,
    },
    containBtn: {
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'center',
      marginTop: 5,
    },
    btn: {
      borderRadius: 8,
      padding: 10,
      width: Dimensions.get('screen').width / 4,
      alignItems: 'center',
    },
    txtBtn: {
      color: Colors.white,
      fontSize: FontSizeText.fsSmall,
      fontWeight: 'bold',
    },
    colorYellow: {
      backgroundColor: 'rgb(255,192,3)',
    },
    colorTint: {
      backgroundColor: Colors.tint,
    },
    colorGreen: {
      backgroundColor: 'rgb(147,208,86)',
    },
    containBtnBack: {
      position: 'absolute',
      top: 15,
      left: 7,
      zIndex: 1000,
    },
    containTop: {
      flex: 3
    },
    containMiddle: {
      flex: 6
    },
    containBottom: {
      backgroundColor: 'white',
      paddingVertical: 10,
    }
  });