import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../Utils/Constants/Colors';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';

import styles from './style';

import Loading from '../../Components/Common/Loading';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerTotal}>
        <Text style={styles.txtTotal}>Tổng tiền : </Text>
        <Text style={styles.txtPrice}>{formatCurrencyVND(total)}</Text>
      </View>
      <Pressable
        
        >
        <Text style={styles.txtBuyAll}>
          Tiến hành mua 
          {/* ({cart?.length}) */}
           sản phẩm
        </Text>
      </Pressable>
      <View style={{marginHorizontal: 10}}>
        {cart.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            // onIncrease={handleIncrease}
            // onDecrease={handleDecrease}
            // onDelete={handleDelete}
          />
        ))}
      </View>
      {/* <Loading visible={isLoading} /> */}
    </ScrollView>
  );
};

// Tách riêng CartItem để tránh render lại toàn bộ
const CartItem = React.memo(({item, onIncrease, onDecrease, onDelete}: any) => (
  <View style={styles.containItem}>
    <Pressable style={styles.item}>
      <View>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: item?.product?.images[0],
          }}
        />
      </View>
      <View style={styles.containInfor}>
        <Text numberOfLines={3} style={styles.txtTitle}>
          {item?.product?.title}
        </Text>
        <Text style={styles.txtPriceItem}>
          {item?.product?.discount > 0
            ? formatCurrencyVND(
                item?.product?.price -
                  (item?.product?.price * (item?.product?.discount * 10)) / 100,
              )
            : formatCurrencyVND(item?.product?.price)}
        </Text>
        {/* <Rating size={12} rating={item?.product?.rate} disabled /> */}
        <Pressable style={styles.containBtn}>
          <View style={styles.containInDeCrease}>
            <Pressable
              onPress={() => onDecrease(item)}
              style={styles.btnDecrease}>
              <AntDesign name="minus" size={18} color={Colors.white} />
            </Pressable>
            <Pressable style={styles.containQuality}>
              <Text style={{color: 'red'}}>{item?.quantity}</Text>
            </Pressable>
            <Pressable
              onPress={() => onIncrease(item)}
              style={styles.btnIncrease}>
              <Feather name="plus" size={18} color={Colors.white} />
            </Pressable>
          </View>
          <Pressable onPress={() => onDelete(item)} style={styles.btnDelete}>
            <FontAwesome name={'trash-o'} size={18} color={Colors.white} />
          </Pressable>
        </Pressable>
      </View>
    </Pressable>
  </View>
));

export default CartScreen;
