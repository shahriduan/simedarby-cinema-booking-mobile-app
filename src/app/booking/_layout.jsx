import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#0A0F1E' }, headerTintColor: '#FFFFFF', headerShadowVisible: false }}>
      <Stack.Screen name="card-payment" options={{ title: 'Card Payment', headerTitleAlign: 'center', headerBackVisible: true }} />
      <Stack.Screen name="booking-success" options={{ headerShown: false }} />
    </Stack>
  );
}