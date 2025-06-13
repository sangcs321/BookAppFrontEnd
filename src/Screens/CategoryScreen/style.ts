import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Constants/Colors';
import { FontSizeText } from '../../Utils/Constants/Font';

const { width: widthScreen, height: heightScreen } = Dimensions.get('screen');
const WIDTH_IMAGE = (widthScreen - 33) / 2;
const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flex: 1
    },
    containProductInShop: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 10
    }, header: {
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: Colors.tint,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        color: '#007AFF',
        fontSize: 16,
    }, 
   
});
export default styles;