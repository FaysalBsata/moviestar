import { Link } from 'expo-router';
import React from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { ListItem, ScrollView } from 'tamagui';
import { Favorite } from '~/interfaces/favorites';
import { Container, Main } from '~/tamagui.config';

const FavoritePage = () => {
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  console.log('🚀 ~ FavoritePage ~ favorites', favorites);
  return (
    <Main>
      <Container>
        <ScrollView>
          {favorites?.map((fav) => (
            <Link key={fav.id} href={`/favorite/${fav.mediaType}/${fav.id}`} asChild>
              <ListItem
                title={fav.name}
                size={'$4'}
                theme={'alt2'}
                icon={() => (
                  <Animated.Image
                    source={{ uri: `https://image.tmdb.org/t/p/w400${fav.thumbnail}` }}
                    style={{ width: 50, height: 50 }}
                    sharedTransitionTag={`${fav.mediaType === 'movie' ? 'movie' : 'tv'}-${fav.id}`}
                  />
                )}
              />
            </Link>
          ))}
        </ScrollView>
      </Container>
    </Main>
  );
};

export default FavoritePage;
