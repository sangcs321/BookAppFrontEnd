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
import { RootState } from '../../Redux/Store/Store';
import { Colors } from '../../Utils/Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductItem from '../../Components/Common/ProductItem';
import styles from './style';
import Loading from '../../Components/Common/Loading';
import LoadingComponenet from '../../Components/LoadingComponenet';
import { useLazySearchProductsQuery } from '../../Redux/RTKQuery/Slice/ProductSlice';
import { Product } from '../../Types/Type';

function CategoriesScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute();

    const { keyword } = route.params;
    const [trigger, { data, isLoading, isError, error }] = useLazySearchProductsQuery();
    // Sử dụng useEffect để cập nhật title trong thanh header
    useEffect(() => {
        navigation.setOptions({ title: keyword });
        if (keyword) {
            trigger({ keyword }); // Gọi API khi component mount với keyword
        }
    }, [keyword, trigger]);

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    >
                    <Ionicons name={'arrow-back'} color={Colors.black} size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kết quả cho "{keyword}"</Text>
                <View style={{ width: 40 }} /> {/* Placeholder cho bên phải */}
            </View>
            <View style={styles.container}>
                {isLoading && <LoadingComponenet />}
                {!isLoading && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.containProductInShop}>
                            {data?.map((item: Product, index: number) => (
                                <ProductItem item={item} key={index} />
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
        </>
    );
}

export default CategoriesScreen;