import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import {useRef, useEffect, useState} from 'react';
import React from 'react';
import BannerImage from './BannerImage';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  autoPlay?: boolean;
  autoPlayTime?: number;
}

const {width} = Dimensions.get('screen');
const SPACING = 8;
const ITEM_SIZE = width - SPACING;

const BannerCarousel: React.FC<Props> = ({
  data,
  autoPlay = false,
  autoPlayTime = 2,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, SetDragging] = useState<boolean>(autoPlay);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (autoPlay && dragging) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
      }, autoPlayTime * 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  useEffect(() => {
    if (autoPlay) {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex,
          animated: true,
          viewOffset: SPACING / 2,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={ITEM_SIZE + SPACING}
        snapToAlignment="start"
        decelerationRate={0.9}
        contentContainerStyle={styles.contentContainerStyle}
        disableIntervalMomentum={false}
        onScrollBeginDrag={() => {
          SetDragging(false);
        }}
        onScrollEndDrag={() => {
          SetDragging(true);
        }}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={{width: ITEM_SIZE}}>
              <BannerImage imageSource={item} height={200} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  contentContainerStyle: {
    columnGap: SPACING,
    paddingHorizontal: 8,
  },
});
