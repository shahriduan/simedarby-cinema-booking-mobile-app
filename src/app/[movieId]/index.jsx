import theme from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  const { movieId } = useLocalSearchParams();

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#ffffff' }}>This movie details</Text>
    </View>
  )
}