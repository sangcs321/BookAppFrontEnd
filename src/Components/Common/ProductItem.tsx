import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles/StyleProductItem';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';

import { RootState } from '../../Redux/Store/Store';

import { useAddCartItemMutation } from '../../Redux/RTKQuery/Slice/CartSlice';
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  quantity: number;
  images: ProductImage[];
}
interface Image {
  id: number;
  url: string;
  publicId: string;
}

interface ProductImage {
  id: number;
  image: Image;
}
interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
const ProductItem: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>();
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [addCartItem] = useAddCartItemMutation();
  const user = useSelector((state: RootState) => state.user);
  const handleAddToCart = async () => {
    const cartItem: CartItem = {
      id: 0, // id sẽ được sinh tự động từ server, để tạm 0
      quantity: 1, // Mặc định thêm 1 sản phẩm
      product: item as Product, // Chuyển đổi item thành Product
      user: { id: Number(user.id) },
    };

    try {
      await addCartItem(cartItem).unwrap();
      setAddedToCart(true); // Cập nhật trạng thái nút
    } catch (error) {
      console.error('Add to cart failed:', error);
      setAddedToCart(false);
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('Detail', {
          product: item,
        })
      }>
      <Image style={styles.image} source={{ uri: item?.productImages[0].image.url }} />
      <View style={styles.containInfor}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {item?.title}
        </Text>
        <View>
          <Text style={styles.price}>
            {item.discount > 0
              ? formatCurrencyVND(
                item.price - (item.price * (item.discount)) / 100,
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
      <Pressable style={styles.btn} onPress={handleAddToCart}>
        {addedToCart ? (
          <View>
            <Text style={styles.txt}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={styles.txt}>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
