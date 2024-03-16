import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import DetailsPage from '~/app/components/DetailsPage';
import { MediaType } from '~/interfaces/apiResult';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('🚀 ~ Page ~ id:', id);
  return <DetailsPage id={id} mediaType={MediaType.Movie} />;
};

export default Page;
