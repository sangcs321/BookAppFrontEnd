import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {ProductProps} from '../../Types/Type';
// import {addToCart} from '../../Redux/Slice/Cart';
import {Colors} from '../../Utils/Constants/Colors';
import {FontSizeText} from '../../Utils/Constants/Font';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';
// type Props = {
//   item: ProductProps;
//   index: any;
// };
const ProductHotItem: React.FC<Props> = ({item, index}) => {
  const navigation = useNavigation<any>();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item: ProductProps) => {
    setAddedToCart(true);
    // dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 5000);
  };
  return (
    <Pressable
      key={index}
      onPress={() =>
        navigation.navigate('Detail', {
          product: item,
        })
      }
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingBottom: 10,
        marginLeft: 8,
        borderRadius: 15,
      }}>
      <View style={styles.bannerBadge}>
        <Ionicons
          name="heart-outline"
          color={'white'}
          size={11}
          style={styles.bannerBadgeIcon}
        />
        <Text style={styles.txtHot}>
          Sale up {(item?.discount || 0) * 10} %
        </Text>
      </View>
      <Image style={styles.dealhotImage} source={{uri: item?.images[0]}} />
      <Pressable style={styles.containUpto} onPress={() => addItemToCart(item)}>
        {addedToCart ? (
          <Text style={styles.uptoTxt}>Added to cart</Text>
        ) : (
          <Text style={styles.uptoTxt}>Add to cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductHotItem;

const styles = StyleSheet.create({
  dealhotImage: {
    width: 150,
    height: 150,
    marginTop: 10,
    resizeMode: 'contain',
  },
  containUpto: {
    backgroundColor: Colors.tint,
    paddingVertical: 5,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  uptoTxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: FontSizeText.fsSmall,
    fontWeight: 'bold',
  },
  bannerBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.tint,
    borderRadius: 8,
    zIndex: 1000,
  },
  bannerBadgeIcon: {
    marginLeft: 4,
    alignSelf: 'center',
  },
  txtHot: {
    fontSize: 10,
    color: 'white',
    paddingBottom: 2,
    paddingRight: 5,
  },
  containInfor:{
    paddingHorizontal: 10
  },
  soldTxt: {
    fontSize: 11,
    color: Colors.colorText
  },
  containRatingAndSold: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
});