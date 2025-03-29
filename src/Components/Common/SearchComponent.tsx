import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Utils/Constants/Colors';
import {TextInput} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';


type Props = {
  text?: string;
  position: string;
  isChat?: boolean;
  onChangeText?: any;
};

const SeacrchComponent: React.FC<Props> = ({
  text,
  position,
  onChangeText,
  isChat = false,
}) => {
  const navigation = useNavigation<any>();
  
  return (
    <View style={styles.container}>
      <Pressable style={styles.searchBar} 
    //   onPress={handleChooseSearch}
      >
        <AntDesignIcon name="search1" color={Colors.lightGrey} size={15} />
        <TextInput
        //   ref={inputRef}
          placeholder="Search in MACAU shop"
          placeholderTextColor={Colors.lightGrey}
        //   value={searchText}
        //   onChangeText={handleTextChange}
        //   onSubmitEditing={handleSearch}
          style={styles.searchTxt}
        //   onPress={handleChooseSearch}
        //   onFocus={handleOnFocus}
        />
      </Pressable>
      {/* {isChat && (
        <Pressable
          onPress={() =>
            navigation.navigate('Chat', {chatroomId: user.id + 'admin', userId: user.id})
          }>
          <Ionicons
            name="chatbubble-ellipses-outline"
            color={'white'}
            size={24}
          />
        </Pressable>
      )} */}
    </View>
  );
};

export default SeacrchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    flex: 1,
    height: 28,
  },
  searchTxt: {
    color: Colors.darkGrey,
    fontSize: 13,
    paddingVertical: 0,
    flex: 1,
  },
});
