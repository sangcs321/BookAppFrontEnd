import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Utils/Constants/Colors';
import {FontSizeText} from '../../Utils/Constants/Font';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const WIDTH_IMAGE = (widthScreen - 33) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.tint,
    padding: 10,
    height: 50,
  },
  containCate: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCate: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cateTxt: {
    textAlign: 'center',
    fontSize: FontSizeText.fsSmall,
    fontWeight: '500',
    marginTop: 5,
    color: Colors.colorText,
  },
  containTrending: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  containProductInShop: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 10,
  },
  imageTrending: {
    width: WIDTH_IMAGE,
    height: 220,
    resizeMode: 'cover',
  },

  containProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
 
});
export default styles;
