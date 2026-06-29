import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';

export default function PaymentRow({ method, onPress, showDivider }) {
  return (
    <>
      <TouchableOpacity style={styles.row} onPress={() => onPress()} activeOpacity={0.7}>
        {/* Left icon */}
        <View style={styles.iconWrap}>
          <IconButton icon={method.icon} iconColor='#8A9BB5' size={22} style={{ margin: 0 }} />
        </View>

        {/* Text */}
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{method.title}</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.rowSubtitle}>{method.subtitle}</Text>
            {method.hasVisa && (
              <View style={styles.visaBadge}>
                <Text style={styles.visaText}>VISA</Text>
              </View>
            )}
          </View>
        </View>

        {/* Chevron */}
        <IconButton icon="chevron-right" iconColor="#4A5978" size={20} style={{ margin: 0 }} />
      </TouchableOpacity>

      {showDivider && <Divider style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 12,
  },

  // Icon
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#1C2438',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text
  rowText: {
    flex: 1,
    gap: 3,
  },
  rowTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowSubtitle: {
    color: '#4A5978',
    fontSize: 12,
    lineHeight: 17,
  },

  // Visa badge
  visaBadge: {
    backgroundColor: '#1A3080',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  visaText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },

  divider: {
    backgroundColor: '#1C2438',
    marginHorizontal: 14,
  },
});