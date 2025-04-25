import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../../Utils/Constants/Colors";
import { FontSizeText } from "../../../../Utils/Constants/Font";
import { input } from "@tensorflow/tfjs";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingHorizontal: 10,
    }, container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    }, containBtnBack: {
        position: 'absolute',
        top: 7,
        left: 7,
        zIndex: 1000,
    }, containerHeader: {
        marginTop: 20,
        backgroundColor: Colors.tint,
        height: 110,
        marginBottom:20,
    }, image: {
        width: 90,
        height: 90,
        borderRadius: 99,
        top: 35,
        left: 40
    }, textName: {
        left: 140,
        bottom: 25,
        fontSize: 15,
        color: Colors.colorText,
    },
    colorTint: {
        backgroundColor: Colors.tint,
    },
    txtBtn: {
        color: Colors.white,
        fontSize: FontSizeText.fsMedium,
        fontWeight: 'bold',
    }, btn: {
       flex:1,
        borderRadius: 8,
        padding: 10,
        width: Dimensions.get('screen').width / 4,
        alignItems: 'center',
        bottom:10,
        marginHorizontal: 5, // Khoảng cách ngang giữa các button
    },containBtnbBot:{
        flexDirection: 'row', // Sắp xếp phần tử con theo chiều ngang
        justifyContent: 'space-between', // Tạo khoảng cách đều giữa các Pressable (tùy chọn)
        alignItems: 'center',
        top:0,
        bottom:0
    },input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: Colors.colorText,
      },label: {
        fontSize: FontSizeText.fsSmall,
        marginBottom: 8,
        color: Colors.colorText,
      },containerBody: {
        padding: 15,
        paddingTop: 10,
      },containDropdown: {
        marginBottom: 30,
      },

});