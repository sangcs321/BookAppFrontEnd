import {
    View,
    StyleSheet,
    Image,
    DimensionValue,
    TouchableOpacity,
    Text,
  } from 'react-native';
  import React from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {Colors} from '../../Utils/Constants/Colors';
  
  interface Props {
    imageSource: string;
    width?: DimensionValue;
    height?: DimensionValue;
    onPress?: () => void;
  }
  
  const BannerImage: React.FC<Props> = ({
    imageSource,
    width,
    height,
    onPress,
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Image
          style={[styles.bannerImage, {width, height}]}
          source={{uri: imageSource}}
          resizeMode="cover"
        />
        <View style={styles.bannerBadge}>
          <Ionicons
            name="heart-outline"
            color={'white'}
            size={14}
            style={styles.bannerBadgeIcon}
          />
          <Text style={{color: 'white', paddingBottom: 2, paddingRight: 5}}>
            Hot
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    bannerImage: {
      width: '100%',
      borderRadius: 16,
    },
    bannerBadge: {
      position: 'absolute',
      top: 10,
      right: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      backgroundColor: Colors.tint,
      borderRadius: 8,
    },
    bannerBadgeIcon: {
      marginLeft: 4,
      alignSelf: 'center',
    },
  });
  
  export default BannerImage;
  