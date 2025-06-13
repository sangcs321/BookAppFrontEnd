import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {ProductProps} from '../../Types/Type';
import {Colors} from '../../Utils/Constants/Colors';
import {FontSizeText} from '../../Utils/Constants/Font';
import Entypo from 'react-native-vector-icons/Entypo';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import styles from './styles/StyleOrderItem';


const OrderItemInDetail: React.FC<Props> = ({product, quantity}) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      style={styles.product}
    //   onPress={() =>
    //     navigation.navigate('Detail', {
    //       product: {...product, _id: product?.productId},
    //     })
    //   }
      >
      <Image
        source={{
          uri: product?.productImages?.[0]?.image?.url,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.inforProduct}>
        <Text
          style={styles.txtNameProduct}
          numberOfLines={1}
          ellipsizeMode="tail">
          {product?.title}
        </Text>
        <View style={styles.colorAndQuality}>
          <Text style={styles.txtColorAndQuality}>
            {product?.specification?.color}
          </Text>
          <Text style={styles.txtColorAndQuality}>x{quantity ?? 0}</Text>
        </View>
        <Text style={styles.txtPrice}>
          {product && product.discount > 0
            ? formatCurrencyVND(
                product.price - (product.price * (product.discount * 10)) / 100,
              )
            : formatCurrencyVND(product && product.price)}
        </Text>
      </View>
    </Pressable>
  );
};

export default OrderItemInDetail;