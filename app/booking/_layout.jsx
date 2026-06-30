import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Layout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#0A0F1E' }, headerTintColor: '#FFFFFF', headerShadowVisible: false }}>
      <Stack.Screen 
        name="fnb" 
        options={{ 
          title: 'Food and Beverages', 
          headerTitleAlign: 'center', 
          headerBackVisible: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/booking/payment-method')} activeOpacity={0.7} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
              <MaterialDesignIcons name="chevron-right" size={20} color="#8A9BB5" style={styles.iconStyle} />
            </TouchableOpacity>
          )
        }} 
      />
      <Stack.Screen name="payment-method" options={{ title: 'Payment', headerTitleAlign: 'center', headerBackVisible: true }} />
      <Stack.Screen name="card-payment" options={{ title: 'Card Payment', headerTitleAlign: 'center', headerBackVisible: true }} />
      <Stack.Screen name="booking-success" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    flexDirection: 'row',     
    alignItems: 'center',     
    paddingRight: 16,         
    paddingVertical: 6,
  },
  skipText: {
    color: '#8A9BB5',
    fontSize: 14,             
    fontWeight: '500'
  },
  iconStyle: {
    marginLeft: 2,
  }
});