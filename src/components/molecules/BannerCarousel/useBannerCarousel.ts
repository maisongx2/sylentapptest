import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const useBannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return {
    activeIndex,
    handleScroll,
  };
};
