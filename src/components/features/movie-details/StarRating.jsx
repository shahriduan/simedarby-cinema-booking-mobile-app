import { Text, View } from 'react-native'

export default function StarRating({ rating, size = 18, color = '#F5A623' }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={{
            fontSize: size,
            color: i <= Math.floor(rating) ? color : i - 0.5 <= rating ? color : '#2A3550',
          }}>
          {i <= Math.floor(rating) ? '★' : i - 0.5 <= rating ? '★' : '★'}
        </Text>
      ))}
    </View>
  )
}