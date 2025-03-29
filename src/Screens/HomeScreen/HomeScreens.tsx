import React, { useCallback, useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import ProductItem from '../../Components/Common/ProductItem';
import { useNavigation } from '@react-navigation/native';



import Loading from '../../Components/Common/Loading';
import SeacrchComponent from '../../Components/Common/SearchComponent';
import TitleComponent from '../../Components/Common/Title';
import LoadingComponenet from '../../Components/LoadComponenet';

function HomeScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <SeacrchComponent position={'home'} isChat={true} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <BannerCarousel data={images} autoPlay /> */}
                <TitleComponent text={'Danh mục sản phẩm'} />
                {/* <FlatList
                    data={list}
                    contentContainerStyle={{
                        gap: 8,
                        backgroundColor: 'white',
                        paddingBottom: 10,
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.containCate}
                            onPress={() =>
                                navigation.navigate('Category', { category: item?.name })
                            }>
                            <Image style={styles.imageCate} source={{ uri: item?.image }} />
                            <Text style={styles.cateTxt}>{item?.name}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                /> */}
                <TitleComponent text={'Deals hot hôm nay'} />
                {/* {loading3 && <LoadingComponenet />} */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* {productsDealsHot?.map((item, index) => (
              <ProductHotItem item={item} index={index} key={index} />
            ))} */}
                </ScrollView>
                <TitleComponent text={'Sản phẩm hot trong tuần'} />
                {/* {loading1 && <LoadingComponenet />}
          <View style={styles.containTrending}>
            {productsHot?.map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
          </View> */}
                <TitleComponent text={'Sản phẩm trong shop'} />
                {/* {loading2 && <LoadingComponenet />} */}
                <View style={styles.containProductInShop}>
                    {/* {productsNor?.map((item, index) => (
              <ProductItem item={item} key={index} />
            ))} */}
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
export default HomeScreen;