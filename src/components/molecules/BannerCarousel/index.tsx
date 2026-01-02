import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import * as S from './styles';
import { useBannerCarousel } from './useBannerCarousel';

const { width } = Dimensions.get('window');

type BannerCarouselProps = {
  banners: string[];
};

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  const { activeIndex, handleScroll } = useBannerCarousel();

  return (
    <S.Container>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map((banner, index) => (
          <S.BannerImage
            key={index}
            source={{ uri: banner }}
            resizeMode="cover"
            width={width - 32}
          />
        ))}
      </ScrollView>

      <S.DotsContainer>
        {banners.map((_, index) => (
          <S.Dot key={index} active={index === activeIndex} />
        ))}
      </S.DotsContainer>
    </S.Container>
  );
};
