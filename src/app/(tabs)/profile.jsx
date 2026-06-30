import theme from '@/constants/theme';
import { authStorage } from '@/services/localStorage';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Profile() {
  const router = useRouter();

  function logout() {
    authStorage.removeToken();
    router.replace('/');
  }
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#ffffff', paddingBottom: 20 }}>This is profile screen</Text>
      <Button icon="logout" mode="outlined" onPress={() => logout()}>
        Logout
      </Button>
    </View>
  )
}