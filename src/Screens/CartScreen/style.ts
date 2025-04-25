import { StyleSheet } from "react-native";
import { FontSizeText } from "../../Utils/Constants/Font";
import { Colors } from "../../Utils/Constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerTotal: {
        padding: 10, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtTotal: {
        fontSize: FontSizeText.fsMedium,
        fontWeight: 'bold',
        color: Colors.colorText
    },
    txtPrice: {
        fontSize: FontSizeText.fsMedium,
        fontWeight: 'bold',
        color: 'red'
    },
    btnBuyAll: {
        backgroundColor: Colors.tint,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    txtBuyAll: {
        color: Colors.white, 
        fontSize: FontSizeText.fsMedium,
        fontWeight: 'bold'
    },
    indicator: {
        height: 0,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        marginTop: 16,
    },
    containItem: {
        backgroundColor: Colors.white,
        marginTop: 10,
        borderBottomColor: '#F0F0F0',
        borderRadius: 15
    },
    item: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containInfor: {
        marginRight: 15,
        flex: 2,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginLeft: 10,
        marginVertical: 10,
        marginRight: 10,
        backgroundColor: Colors.lightGrey,
    },
    txtTitle: {
        fontSize: FontSizeText.fsSmall,
        fontWeight: 'bold',
        color: Colors.colorText,
    },
    txtPriceItem: { 
        fontSize: FontSizeText.fsSmall,
        fontWeight: 'bold',
        marginVertical: 6,
        color: 'red',
    },
    containBtn: {
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
        padding: 3,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    btnIncrease: {
        backgroundColor: Colors.tint,
        padding: 3,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    containQuality: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 6,
    },
    btnDelete: {
        backgroundColor: Colors.tint,
        padding: 3,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        borderWidth: 0.6,
    },
    


});
export default styles;
