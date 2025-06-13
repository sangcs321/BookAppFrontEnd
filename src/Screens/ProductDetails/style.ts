import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Constants/Colors";
import { FontSizeText } from "../../Utils/Constants/Font";

const {width, height} = Dimensions.get('screen');
const HEIGHT = (width * 100) / 100;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabbar: {
      backgroundColor: 'white',
      zIndex: 1000,
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 10,
      position: 'absolute',
      top: 0,
      width: '100%',
      opacity: 0,
      elevation: 20,
    },
    containBtnBack: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 1000,
    },
    containBtnCart: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1000,
    },
    txtCart: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: 'red',
      borderRadius: 99,
      paddingHorizontal: 5,
      color: 'white'
    },
    image: {
      width,
      height: height / 2,
    },
    containTitleAndPrice: {
      padding: 10,
      marginTop: 3,
      backgroundColor: Colors.white,
      elevation: 0.5
    },
    txtTitle: {fontSize: FontSizeText.fsMedium, fontWeight: '500', color: Colors.colorText},
    txtPrice: {fontSize: FontSizeText.fsMedium, fontWeight: '500', marginVertical: 6, color: 'red'},
    btn: {
      backgroundColor: Colors.tint,
      width: (Dimensions.get('screen').width - 30) / 2,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    txt: {
      color: Colors.white,
      fontSize: FontSizeText.fsMedium,
      fontWeight: 'bold',
    },
    sold: {
      fontSize: FontSizeText.fsSmall,
      marginVertical: 7,
    },
    containDes: {
      padding: 10,
      backgroundColor: Colors.white,
      marginTop: 10,
      elevation: 0.5,
    },
    line : {
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
      marginTop: 5  
    },
    policy: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 25
    },
    tax: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      gap: 10,
    },
    containTech: {
      padding: 10,
      backgroundColor: Colors.white,
      marginTop: 10,
      elevation: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    txtDes: {
      fontSize: FontSizeText.fsMedium,
      color: Colors.colorText,
    },
    containBtn: {
      flexDirection: 'row',
      gap: 10,
      marginHorizontal: 10,
    },
    containComment: {
      borderBottomWidth: 1,
      borderColor: '#c0c0c0',
      backgroundColor: Colors.white,
      marginTop: 10,
      elevation: 0.5
    },
    containRate: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      padding: 10,
     
    },
    txtStar: {
      color: Colors.black,
      fontSize: FontSizeText.fsLarge,
    },
    txtRateProduct: {
      color: Colors.black,
      fontSize: FontSizeText.fsMedium,
    },
    indicator: {
      height: 1,
      borderColor: Colors.lightGrey,
      borderWidth: 1,
      marginTop: 15,
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end'
    },
    containModal: {
      backgroundColor: 'white',
      elevation: 5,
      borderRadius: 12,
      height: height/1.5,

    },
    containerTitle: {
      alignItems: 'center',
      paddingVertical: 10
    },
    title: {
      color: Colors.colorText,
      fontSize: 20,
      fontWeight: '900',
    },
    containInfor: {
      flexDirection: 'row',
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10
    },
    inforLabel: {
      flex: 2,
    },
    inforTxt: {
      flex: 1
    },
    bgGray: {
      backgroundColor: 'rgb(242,242,242)'
    },
    bgWhite: {
      backgroundColor: 'white'
    },
    policyIcon: {
      position: 'absolute', left: -4
    },
    txtPolicy: {
      position: 'absolute', 
      left: 30,
    },
    txtSmall: {
      fontSize: FontSizeText.fsSmall
    },
    gift: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 13
    },
    giftIcon: {
      position: 'absolute', left: -4
    },
    txtGift: {
      position: 'absolute', 
      left: 30,
    },
    containFourInfor: {
      paddingLeft: 2
    },
    containPriceAndSold: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    containBtnInDe: {
      marginTop: 15,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
  },
  containInDeCrease: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 10,
      paddingVertical: 5,
      borderRadius: 7,
  },
  btnDecrease: {
      backgroundColor: Colors.tint,
      padding: 7,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
  },
  btnIncrease: {
      backgroundColor: Colors.tint,
      padding: 7,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
  },
  containQuantity: {
      backgroundColor: 'white',
      paddingHorizontal: 18,
      paddingVertical: 6,
  },
  btnDelete: {
      backgroundColor: Colors.tint,
      padding: 6,
      borderRadius: 5,
      borderColor: '#C0C0C0',
      borderWidth: 0.6,
  },
  containProductAndQuality: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnBuyNow: {
    backgroundColor: Colors.tint,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10
  },
  containModalEditProduct: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalEditProduct: {
    flex: 1,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width ,
    borderRadius: 10
  },
  priceOldAndPriceNew: {
    flexDirection: 'row',
    gap: 5,
    alignContent: 'center',
    justifyContent: 'center'
  },
  txtPriceOld: {
    marginTop: 9,
    color: Colors.lightGrey,
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  txtDiscount: {
    color: Colors.tint,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 9,
    backgroundColor: 'rgb(252,241,235)',
    height: 20,
    paddingVertical:1,
    paddingHorizontal: 2,
  }

  });
  export default styles;