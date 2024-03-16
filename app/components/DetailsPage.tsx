import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { ImageBackground } from 'react-native';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { Button, H1, Paragraph, ScrollView, Text, YStack } from 'tamagui';
import { MediaType } from '~/interfaces/apiResult';
import { Favorite } from '~/interfaces/favorites';
import { getMovieDetails } from '~/services/api';
import { Main } from '~/tamagui.config';
type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};
const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });
  const toggleFavorite = () => {
    const current = favorites || [];
    if (!isFavorite) {
      setFavorites([
        ...current,
        {
          id,
          mediaType,
          name: movieQuery.data?.title || movieQuery.data?.name,
          thumbnail: movieQuery.data?.poster_path,
        },
      ]);
    } else {
      setFavorites(current.filter((item) => item.id !== id));
    }
    setIsFavorite(!isFavorite);
  };
  return (
    <Main>
      <Stack.Screen
        options={{
          headerRight: ({ tintColor }) => (
            <Button
              hoverStyle={{ scale: 0.975 }}
              pressStyle={{ scale: 0.975 }}
              scale={0.9}
              animation={'bouncy'}
              unstyled
              onPress={toggleFavorite}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color={tintColor} size={24} />
            </Button>
          ),
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}`,
          }}>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.poster_path}` }}
            style={{ width: 200, height: 300, margin: 10, borderRadius: 6 }}
            sharedTransitionTag={`${mediaType === 'movie' ? 'movie' : 'tv'}-${id}`}
          />
        </ImageBackground>
        <YStack p={10} animation={'lazy'} enterStyle={{ opacity: 0, y: 10 }}>
          <H1 color={'$blue7'}>
            {movieQuery.data?.title || movieQuery.data?.name}
            <Text fontSize={16}>(2023)</Text>
          </H1>
          <Paragraph theme={'alt2'}>{movieQuery.data?.tagline}</Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default DetailsPage;
