import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SW } = Dimensions.get('window');
const CARD_WIDTH = (SW - 48) / 2;

export default function MenuCard({ item, qty, onIncrease, onDecrease }) {
  return (
    <View style={styles.card}>
      {/* Image */}
      <View style={styles.cardImage} />

      {/* Info */}
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>
        {item.desc}
      </Text>

      {/* Price row */}
      <View style={styles.priceRow}>
        <View>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>
              RM {item.originalPrice.toLocaleString()}
            </Text>
          )}
          <Text style={styles.price}>RM {item.price.toLocaleString()}</Text>
        </View>
        <Stepper value={qty} onIncrease={onIncrease} onDecrease={onDecrease} />
      </View>
    </View>
  );
}

function Stepper({ value, onIncrease, onDecrease }) {
  return (
    <View style={styles.stepper}>
      <TouchableOpacity style={styles.stepBtn} onPress={onDecrease} disabled={value === 0}>
        <Text style={[styles.stepBtnText, value === 0 && { color: '#2A3550' }]}>-</Text>
      </TouchableOpacity>
      <Text style={styles.stepCount}>{value}</Text>
      <TouchableOpacity style={styles.stepBtn} onPress={onIncrease}>
        <Text style={styles.stepBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Card
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#131929',
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#8A9BB525',
    borderRadius: 6,
    marginBottom: 8,
  },
  cardName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
  },
  cardDesc: {
    color: '#4A5978',
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  originalPrice: {
    color: '#4A5978',
    fontSize: 10,
    textDecorationLine: 'line-through',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Stepper
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2438',
    borderRadius: 5,
    overflow: 'hidden',
    height: 26,
  },
  stepBtn: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A3550',
  },
  stepBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  stepCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    width: 26,
    textAlign: 'center',
  },
});