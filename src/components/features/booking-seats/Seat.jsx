import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const { width: SW } = Dimensions.get("window");
const COLS = 9;
const SEAT_SIZE = Math.floor((SW - 80) / COLS);

export default function Seat({ id, row, col, unavailable, selected, onPress }) {
  const bg = unavailable ? '#1C2438' : selected ? '#3A4570' : '#2A3550';

  return (
    <TouchableOpacity
      disabled={unavailable}
      onPress={() => onPress(id)}
      style={[
        styles.seat,
        {
          width: SEAT_SIZE - 4,
          height: SEAT_SIZE - 2,
          backgroundColor: bg,
          borderWidth: selected ? 1 : 0,
          borderColor: selected ? '#5B6FA6' : 'transparent',
        },
      ]}
    >
      {unavailable && <Text style={styles.seatX}>×</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Seat grid
  seatGrid: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 3,
  },
  rowLabel: {
    color: '#4A5978',
    fontSize: 10,
    width: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  seat: {
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatX: { 
    color: '#4A5978', 
    fontSize: 12, 
    fontWeight: '700' 
  },
});