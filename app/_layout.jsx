import theme from '@/constants/theme';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" translucent backgroundColor={theme.colors.background} />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
