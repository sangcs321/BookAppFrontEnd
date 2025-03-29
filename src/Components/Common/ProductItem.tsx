import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles/styleProductItem';

import {useNavigation} from '@react-navigation/native';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';
const ProductItem: React.FC<Props> = ({item}) => {
    const navigation = useNavigation<any>();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('Detail', {
          product: item,
        })
      }>
      <Image style={styles.image} source={{uri: item?.images[0]}} />
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
      <Pressable  style={styles.btn}>
        {/* {addedToCart ? (
          <View>
            <Text style={styles.txt}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={styles.txt}>Add to Cart</Text>
        )} */}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
