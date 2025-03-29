import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Constants/Colors";
import { FontSizeText } from "../../../Utils/Constants/Font";
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const WIDTH_IMAGE = (widthScreen - 26) / 2;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: WIDTH_IMAGE,
    },
    image: {
        width: WIDTH_IMAGE,
        height: 170,
        resizeMode: 'contain',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15

    },
    title: {
        color: Colors.colorText,
        fontSize: FontSizeText.fsSmall,
        fontWeight: '500'
    },
    price:{
        color: "red",
        fontSize: FontSizeText.fsSmall,
        fontWeight: '500',
        marginBottom: 3
    },
    txt: {
        color: Colors.white,
        fontSize: FontSizeText.fsSmall,
        fontWeight: 'bold',
      },
    btn: {
        backgroundColor: Colors.tint,
        padding: 10,
        paddingVertical: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
      },
      text: {
        fontSize: FontSizeText.fsMedium,
        marginTop: 20,
      },
      containInfor:{
        paddingHorizontal: 10
      },
      containRatingAndSold: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      soldTxt: {
        fontSize: 11,
        color: Colors.colorText
      },
      rating: {
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(252,246,234)',
        borderWidth: 1,
        borderColor: 'rgb(238,222,170)',
        paddingHorizontal: 5,
      }
    
})
export default styles;