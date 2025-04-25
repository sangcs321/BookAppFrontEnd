import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles/StyleProductItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Utils/Constants/Colors';
import {FontSizeText} from '../../Utils/Constants/Font';
import { useNavigation } from '@react-navigation/native';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';
const ProductSale: React.FC<Props> = ({ item }) => {
    const navigation = useNavigation<any>();
    return (
        <Pressable
            style={[styles.container,style.marginH]}
            onPress={() =>
                navigation.navigate('Detail', {
                    product: item,
                })
            }>
            <View style={style.bannerBadge}>
                <Ionicons
                    name="heart-outline"
                    color={'white'}
                    size={11}
                    style={style.bannerBadgeIcon}
                />
                <Text style={style.txtHot}>
                    Sale up {(item?.discount || 0) * 10} %
                </Text>
            </View>
            <Image style={styles.image} source={{ uri: item?.images[0] }} />
            <View style={styles.containInfor}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                    {item?.title}
                </Text>
                <View>
                    <Text style={styles.price}>
                        {item.discount > 0
                            ? formatCurrencyVND(
                                item.price - (item.price * (item.discount * 10)) / 100,
                            )
                            : formatCurrencyVND(item.price)}
                    </Text>
                    <View style={styles.containRatingAndSold}>
                        <View style={styles.rating}>
                            <FontAwesome name={'star'} color={'#rgb(254,180,45)'} size={12} />
                            <Text style={styles.soldTxt}>{item.rate}</Text>
                        </View>
                        <Text style={styles.soldTxt}>Đã bán {item.sold}</Text>
                    </View>
                </View>
            </View>
            <Pressable style={styles.btn}>
                {/* {addedToCart ? ( */}
                <View>
                    <Text style={styles.txt}>Added to Cart</Text>
                </View>
                {/* ) : (
          <Text style={styles.txt}>Add to Cart</Text>
        )} */}
            </Pressable>
        </Pressable>
    );
};

export default ProductSale;
const style = StyleSheet.create({
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
marginH:{
    marginHorizontal: 5,
}
});