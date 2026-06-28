import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';

export default function MovieDetailsTab({ synopsis, casts, director, writers }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
      <View style={styles.detailRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.detailLabel}>Full synopsis</Text>
          <Text style={styles.detailValue} numberOfLines={expanded ? undefined : 3}>
            {synopsis}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.viewAll}>{expanded ? " show less" : " ...view all"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Divider style={styles.divider} />
      <DetailRow label="Casts" value={casts} />
      <Divider style={styles.divider} />
      <DetailRow label="Director" value={director} />
      <Divider style={styles.divider} />
      <DetailRow label="Writers" value={writers} />
      <Divider style={styles.divider} />
    </ScrollView>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue} numberOfLines={2}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 4,
  },
  detailLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailValue: {
    color: '#8A9BB5',
    fontSize: 12,
    lineHeight: 18,
  },
  divider: {
    backgroundColor: '#1C2438',
  },
});