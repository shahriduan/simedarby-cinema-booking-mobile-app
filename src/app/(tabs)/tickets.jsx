import theme from '@/constants/theme'
import { Text, View } from 'react-native'

export default function Tickets() {
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#ffffff' }}>This is ticket screen</Text>
    </View>
  )
}