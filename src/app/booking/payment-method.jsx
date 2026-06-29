import PaymentRow from '@/components/features/payment-method/PaymentRow';
import theme from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const PAYMENT_METHODS = [
  {
    id: 'debit',
    icon: 'credit-card-outline',
    title: 'Debit card',
    subtitle: 'Pay with',
    subtitleBadge: 'VISA',
    hasVisa: true,
  },
  {
    id: 'bank',
    icon: 'bank-outline',
    title: 'Bank Transfer',
    subtitle: 'Make a transfer from your bank account',
    hasVisa: false,
  },
  {
    id: 'crypto',
    icon: 'wallet-outline',
    title: 'Crypto wallets',
    subtitle: 'Pay from your cryptocurrency wallet',
    hasVisa: false,
  },
];

export default function PaymentMethod() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <Text style={styles.prompt}>
        How would you like to make the payment? Kindly select your preferred option
      </Text>

      <View style={styles.card}>
        {PAYMENT_METHODS.map((method, i) => (
          <PaymentRow
            key={method.id}
            method={method}
            onPress={() => router.push('/booking/card-payment')}
            showDivider={i < PAYMENT_METHODS.length - 1}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Prompt
  prompt: {
    color: '#8A9BB5',
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
  },

  // Card container
  card: {
    marginHorizontal: 16,
    backgroundColor: '#131929',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1C2438',
  },
});