import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Input, ScrollView, Spinner, YStack } from 'tamagui';
import MovieCard from '~/app/components/MovieCard';
import useDebounce from '~/app/utils/useDebounce';
import { getSearchResults, getTrending } from '~/services/api';
import { Container, Main, Subtitle, Title } from '~/tamagui.config';

const HomePage = () => {
  const [searchString, setSearchString] = useState('');
  const debouncedString = useDebounce(searchString, 300);
  const trendingQuery = useQuery({ queryKey: ['trending'], queryFn: getTrending });
  const searchQuery = useQuery({
    queryKey: ['search', useDebounce],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
  });
  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotine,032541,01b4e4)/ghQrKrcEpAlkzBuNoOCSxHQXWqw.jpg',
        }}
        style={{ width: '100%', height: 200 }}>
        <Container>
          <YStack>
            <Title
              color={'#fff'}
              enterStyle={{ opacity: 0, scale: 1.5, y: -10 }}
              animation={'quick'}>
              Trending
            </Title>
            <Input
              placeholder="Search for a movie, tv show, person..."
              placeholderTextColor={'#fff'}
              borderWidth={1}
              size={'$4'}
              value={searchString}
              onChangeText={setSearchString}
            />
          </YStack>
        </Container>
      </ImageBackground>
      <Subtitle p={10}>{searchQuery.data?.results ? 'Search Results' : 'Trending'}</Subtitle>
      {(trendingQuery.isLoading || searchQuery.isLoading) && (
        <Spinner size="large" color={'$blue10'} py={14} />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={40}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
        {searchQuery.data?.results
          ? searchQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)
          : trendingQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)}
      </ScrollView>
    </Main>
  );
};

export default HomePage;
