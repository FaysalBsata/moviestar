import { Link } from 'expo-router';
import { Card, Image, Paragraph, Text, YStack } from 'tamagui';
import { ResultItem } from '~/interfaces/apiResult';
type MovieCardProps = {
  movie: ResultItem;
};
const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      href={`(drawer)/home/${movie.media_type === 'movie' ? '(movie)' : 'tv'}/${movie.id}`}
      asChild>
      <Card
        elevate
        w={150}
        h={260}
        scale={0.9}
        hoverStyle={{ scale: 0.975 }}
        pressStyle={{ scale: 0.975 }}
        animation={'bouncy'}>
        <Card.Header p={0}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            alt={movie.title || movie.name}
            style={{ width: 150, height: 200 }}
          />
        </Card.Header>
        <Card.Footer p={8}>
          <YStack>
            <Text fontSize={20} color={'lightblue'}>
              {movie.title || movie.name}
            </Text>
            <Paragraph theme={'alt2'}>
              {new Date(movie.release_date! || movie.first_air_date!).getFullYear()}
            </Paragraph>
          </YStack>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default MovieCard;
