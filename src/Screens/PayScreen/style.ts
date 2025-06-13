import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Constants/Colors";
import { FontSizeText } from "../../Utils/Constants/Font";

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
    },
    containAddress: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        marginTop: 7,
    },
    containTxtTitleAddress: {},
    containInforUser: {
        flexDirection: 'row',
        gap: 5,
    },
    left: {
        flex: 1,
    },
    right: {
        flex: 20
    },
    inforUser: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    txtTitleAddress: {
        color: Colors.colorText
    },
    txtNameUser: {
        color: Colors.colorText,
        fontSize: FontSizeText.fsSmall
    },
    txtPhoneNumber: {
        color: Colors.darkGrey,
        fontSize: 12
    },
    txtAddress: {
        color: Colors.darkGrey,
        fontSize: 12
    },
    btnUpgrade: {
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.tint,
        width: 80,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    txtBtnUpgrade: {
        color: Colors.tint
    },
    methodShip: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10
    },
    txtMethodShip: {
        color: Colors.colorText,
    },
    containMethod: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt: {
        color: Colors.colorText,
        fontWeight: '500',
        fontSize: FontSizeText.fsSmall,
    },
    containOrder: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10
    },
    txtNameShop: {
        color: Colors.tint,
        fontSize: FontSizeText.fsSmall,
        fontWeight: '600',
    },
    shop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    indicator: {
        height: 0,
        borderWidth: 0.5,
        borderColor: '#cdcdcd',
        marginTop: 5,
    },
    containTotal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 5,
        marginTop: 5
    },
    txtTotal: {
        alignSelf: 'flex-end',
        color: Colors.colorText,
        fontSize: FontSizeText.fsSmall,
        fontWeight: '500',
    },
    txtTotalPrice: {
        alignSelf: 'flex-end',
        color: 'red',
        fontSize: 14,
        fontWeight: '500',
    },
    methodPay: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10
    },
    txtMethodPay: {
        color: Colors.colorText,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    detailPay: {
        padding: 10,
        backgroundColor: 'white',
    },
    txtDetailPay: {
        color: Colors.colorText,
    },
    detailLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt13: {
        fontSize: FontSizeText.fsSmall
    },
    txt16: {
        fontSize: FontSizeText.fsMedium,
        color: Colors.colorText
    },
    txtTotalOrder: {
        fontSize: FontSizeText.fsMedium,
        color: 'red',
        fontWeight: '500'
    },
    containBtnBuy: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 3
    },
    btnBuy: {
        padding: 12,
        paddingHorizontal: 25,
        backgroundColor: Colors.tint,
        alignItems: 'center'
    },
    txtBuy: {
        color: Colors.white,
        fontSize: FontSizeText.fsSmall,
        fontWeight: '600'
    },
    confirmPrice: {
        marginRight: 8,
        alignItems: 'flex-end',
    },
    txtTotalPay: {
        fontSize: FontSizeText.fsSmall
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    total: { fontSize: 18, marginBottom: 10 },
    subtitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    item: { fontSize: 14, marginBottom: 5 },
    // methodPay: { marginTop: 20, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
    // header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    // txtMethodPay: { fontSize: 16, fontWeight: 'bold', marginLeft: 5 },
    // containMethod: { marginLeft: 10 },
    option: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.tint,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioSelected: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.tint },
    txt: { fontSize: 14 },
    button: {
        backgroundColor: Colors.tint,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

})
export default styles;