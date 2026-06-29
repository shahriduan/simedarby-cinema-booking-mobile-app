import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function BookingSuccess() {
  const router = useRouter();

  const goToHome = () => {
    router.dismissAll();
    router.replace('/');
  }

  const goToTickets = () => {
    router.dismissAll();
    router.replace('/tickets');
  }

  return (
    <View style={styles.root}>
      <View style={styles.circle}>
        <IconButton icon="check" iconColor="#FFFFFF" size={52} style={{ margin: 0 }} />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>
          Your ticket purchase is successful, a confirmation has been sent to your e-mail
        </Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} activeOpacity={0.75} onPress={() => goToHome()}>
          <IconButton icon="arrow-left" iconColor="#FFFFFF" size={16} style={{ margin: 0 }} />
          <Text style={styles.btnText}>Main menu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.75} onPress={() => goToTickets()}>
          <IconButton icon="ticket-outline" iconColor="#FFFFFF" size={16} style={{ margin: 0 }} />
          <Text style={styles.btnText}>View ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0F1E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // Check circle
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1C2438',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text
  textWrap: {
    alignItems: 'center',
    marginBottom: 40,
    gap: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: '#8A9BB5',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Buttons
  btnRow: {
    flexDirection: 'row',
    gap: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A3550',
    borderRadius: 8,
    paddingVertical: 10,
    paddingRight: 16,
    paddingLeft: 8,
    backgroundColor: '#131929',
    gap: 2,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  }
});