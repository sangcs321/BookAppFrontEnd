import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {ProductProps, PropParams} from '../../Types/Type';
import { Colors } from '../../Utils/Constants/Colors';
import formatCurrencyVND from '../../Utils/Constants/FormatCurrency';
// import {addToCart} from '../../Redux/Slice/Cart';
import styles from './style';
// import CommentComponent from '../../Components/Common/CommentComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
// import {useGetReviewByProductIdQuery} from '../../Redux/RTKQuery/Slice/ReviewSlice';
// import LoadingComponenet from '../../Components/LoadingComponenet';
import { RootState } from '../../Redux/Store/Store';
import EditProduct from '../AdminScreen/ManageScreen/EditProduct';
// import {
//   useGetProductsAdminQuery,
//   useGetQuantityOfProductQuery,
//   useUpdateQuantityOfProductMutation,
//   useUpdateStatusProductMutation,
// } from '../../Redux/RTKQuery/Slice/ProductSlice';
import Loading from '../../Components/Common/Loading';
import Toast from 'react-native-root-toast';

const ProductInfoScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const { product } = useRoute<any>().params;
  const imageData = product.productImages.map(item => item.image);
  console.log('product', product);
  console.log('image', imageData);
  const navigation = useNavigation<any>();
  const [addedToCart, setAddedToCart] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleQuality, setVisibleQuality] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const increamentQuality = () => {
    setQuantity(pre => pre + 1);
  };
  const decreamentQuality = () => {
    setQuantity(pre => {
      if (pre !== 1) {
        return pre - 1;
      }
      return pre;
    });
  };

  const slideAnim = useRef(new Animated.Value(300)).current; // Giá trị khởi điểm từ dưới màn hình
  const slideOpenTechInfo = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const slideCloseTechInfo = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      useNativeDriver: true,
    }).start();
  };
  const slideOpenBuyNow = () => {
    Animated.timing(slideAnim, {
      toValue: 120,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const slideCloseBuyNow = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (visible) {
      slideOpenTechInfo();
    } else {
      slideCloseTechInfo();
    }
  }, [visible]);
  useEffect(() => {
    if (visibleQuality) {
      slideOpenBuyNow();
    } else {
      slideCloseBuyNow();
    }
  }, [visibleQuality]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const tabbarOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const btnOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );
  const handleSelectCart = () => {
    navigation.navigate('Main', { screen: 'Cart' });
  };
  function roundToOneDecimalPlace(num: number): number {
    return Math.round(num * 10) / 10;
  }

  return (
    <>
      <Animated.View style={[styles.tabbar, { opacity: tabbarOpacity }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} color={Colors.black} size={26} />
        </Pressable>
        {user.role === 'User' && (
          <Pressable onPress={handleSelectCart}>
            <Feather name="shopping-cart" size={26} color={Colors.black} />
            {/* <Text style={styles.txtCart}>{cart?.length}</Text> */}
          </Pressable>
        )}
      </Animated.View>
      <Animated.View style={[styles.containBtnBack, { opacity: btnOpacity }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} color={Colors.black} size={26} />
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.containBtnCart, { opacity: btnOpacity }]}>
        {user.role === 'User' && (
          <Pressable onPress={handleSelectCart}>
            <Feather name="shopping-cart" size={26} color={Colors.black} />
            {/* <Text style={styles.txtCart}>{cart?.length}</Text> */}
          </Pressable>
        )}
      </Animated.View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          data={imageData}
          renderItem={({ item, index }) => {
            return (
              <ImageBackground
                style={styles.image}
                source={{ uri: item.url }}
                resizeMode="contain"
                key={index}
              />
            );
          }}
        />
        <View style={styles.containTitleAndPrice}>
          <Text style={styles.txtTitle} numberOfLines={2} ellipsizeMode="tail">
            {product.title}
          </Text>
          <View style={styles.containPriceAndSold}>
            <View style={styles.priceOldAndPriceNew}>
              <Text style={styles.txtPrice}>
                {product.discount > 0
                  ? formatCurrencyVND(
                    product.price -
                    (product.price * (product.discount)) / 100,
                  )
                  : formatCurrencyVND(product.price)}
              </Text>
              {product.discount > 0 && (
                <>
                  <Text style={styles.txtPriceOld}>
                    {formatCurrencyVND(product.price)}
                  </Text>
                  <Text style={styles.txtDiscount}>
                    -{product.discount * 10}%
                  </Text>
                </>
              )}
            </View>
            <Text style={styles.sold}>Đã bán {product.sold}</Text>
          </View>
        </View>
        <View style={styles.containDes}>
          <Text style={styles.txtDes}>Thông tin sản phẩm</Text>
          <View style={styles.containFourInfor}>
            <View style={styles.line}>
              <FontAwesome name="pencil" size={15} />
              <Text style={styles.txtSmall}>
                {product.author}
              </Text>
            </View>
            <View style={styles.gift}>
              <Ionicons name="book-sharp" size={18} style={styles.giftIcon} />
              <Text style={[styles.txtGift, styles.txtSmall]}>
                {product.status}
              </Text>
            </View>
            <View style={styles.policy}>
              <MaterialIcons
                name="menu-book"
                size={18}
                style={styles.policyIcon}
              />
              <Text style={[styles.txtPolicy, styles.txtSmall]}>
                {product.category}
              </Text>
            </View>
            <View style={styles.policy}>
              <MaterialIcons
                name="factory"
                size={18}
                style={styles.policyIcon}
              />
              <Text style={[styles.txtPolicy, styles.txtSmall]}>{product.publisher}</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.containTech} onPress={() => setVisible(true)}>
          <Text style={styles.txtDes}>Thông tin chi tiết</Text>
          <Ionicons name="chevron-forward" color={Colors.darkGrey} size={20} />
        </Pressable>
        <View style={styles.containComment}>
          <View style={styles.containRate}>
            <Text style={styles.txtStar}>
              {roundToOneDecimalPlace(product.rating || 0)}
            </Text>
            <FontAwesome name={'star'} color={'#rgb(254,180,45)'} size={18} />
            <Text style={styles.txtRateProduct}>Đánh giá sản phẩm</Text>
          </View>
        </View>
        {/* {isLoading && <LoadingComponenet />}
          {!isLoading && data?.map(item => <CommentComponent item={item} />)} */}
      </ScrollView>
      <View style={styles.containBtn}>
        {user.role === 'User' && (
          <>
            <Pressable
              // onPress={() => 
              //   addItemToCart(product)}
              style={styles.btn}>
              {addedToCart ? (
                <View>
                  <Text style={styles.txt}>Added to Cart</Text>
                </View>
              ) : (
                <Text style={styles.txt}>Add to Cart</Text>
              )}
            </Pressable>

            <Pressable
              style={styles.btn}
              onPress={() => setVisibleQuality(true)}>
              <Text style={styles.txt}>Mua ngay</Text>
            </Pressable>
          </>
        )}
        {user.role === 'Admin' && (
          <>
            <Pressable
              style={styles.btn}
              onPress={() =>
                navigation.replace('EditProduct', { product: product })
              }>
              <Text style={styles.txt}>Chỉnh sửa</Text>
            </Pressable>

            <Pressable style={styles.btn}
            // onPress={handleHideProduct}
            >
              <Text style={styles.txt}>
                {/* {hide ? 'Mở sản phẩm' : 'Khóa sản phẩm'} */}
              </Text>
            </Pressable>
          </>
        )}
      </View>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modal}>
          <Animated.View
            style={[
              styles.containModal,
              { transform: [{ translateY: slideAnim }] }, // Apply animation
            ]}>
            <Pressable
              onPress={() => setVisible(false)}
              style={styles.containBtnBack}>
              <Ionicons name={'arrow-back'} color={Colors.black} size={28} />
            </Pressable>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Thông tin chi tiết</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <>
                <View style={[styles.containInfor, styles.bgGray]}>
                  <View style={styles.inforLabel}>
                    <Text>Giới thiệu sách</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.body}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgWhite]}>
                  <View style={styles.inforLabel}>
                    <Text>Công nghệ màn hình</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.techScreen}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgGray]}>
                  <View style={styles.inforLabel}>
                    <Text>Camera</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.camera}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgWhite]}>
                  <View style={styles.inforLabel}>
                    <Text>Bộ xử lý</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.chip}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgGray]}>
                  <View style={styles.inforLabel}>
                    <Text>Dung lượng Ram</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.ram}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgWhite]}>
                  <View style={styles.inforLabel}>
                    <Text>Bộ nhớ trong</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.rom}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgGray]}>
                  <View style={styles.inforLabel}>
                    <Text>Pin</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.battery}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgWhite]}>
                  <View style={styles.inforLabel}>
                    <Text>Thẻ sim</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.sim}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgGray]}>
                  <View style={styles.inforLabel}>
                    <Text>Hệ điều hành</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.operSystem}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgWhite]}>
                  <View style={styles.inforLabel}>
                    <Text>Độ phân giải</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.resolution}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgGray]}>
                  <View style={styles.inforLabel}>
                    <Text>Trọng lượng</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.weight}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgWhite]}>
                  <View style={styles.inforLabel}>
                    <Text>Kích thước</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.demension}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgGray]}>
                  <View style={styles.inforLabel}>
                    <Text>Màu sắc</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.color}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgWhite]}>
                  <View style={styles.inforLabel}>
                    <Text>Thương hiệu</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.manufacturer}</Text>
                  </View>
                </View>
                <View style={[styles.containInfor, styles.bgGray]}>
                  <View style={styles.inforLabel}>
                    <Text>Tính năng khác</Text>
                  </View>
                  <View style={styles.inforTxt}>
                    <Text>{product?.specification?.featureDiff}</Text>
                  </View>
                </View>
              </>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
      {/* <Loading visible={loadingUpdate || isLoadingUpdate} /> */}
    </>
  );
};

export default ProductInfoScreen;