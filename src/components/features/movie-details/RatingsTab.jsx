import StarRating from '@/components/features/movie-details/StarRating';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const RATING_BREAKDOWN = [
  { stars: 5, count: 8 },
  { stars: 4, count: 6 },
  { stars: 3, count: 4 },
  { stars: 2, count: 2 },
  { stars: 1, count: 0 },
];

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    rating: 3,
    title: "INTERESTING MOVIE!",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed risus elementum du. In.",
  },
  {
    id: 2,
    rating: 2,
    title: "NOTHING SPECIAL",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor enim auter dolor sit, lorem id aliquam.",
  },
  {
    id: 3,
    rating: 2,
    title: "NOTHING SPECIAL",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor enim auter dolor sit, lorem id aliquam.",
  },
];

export default function RatingsTab({ reviewCount }) {
  const maxCount = Math.max(...RATING_BREAKDOWN.map((r) => r.count));
  
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
      {/* Overall */}
      <View style={styles.overallRow}>
        <IconButton icon="star" iconColor="#F5A623" size={20} style={{ margin: 0 }} />
        <Text style={styles.overallScore}>4.0</Text>
        <Text style={styles.overallCount}>({reviewCount} Reviews)</Text>
      </View>

      {/* Breakdown bars */}
      <View style={styles.barsContainer}>
        {RATING_BREAKDOWN.map((r) => (
          <RatingBar key={r.stars} stars={r.stars} count={r.count} maxCount={maxCount} />
        ))}
      </View>

      {/* Customer reviews header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        <TouchableOpacity>
          <Text style={{ color: '#c2c8d4', fontSize: 12, fontWeight: '500' }}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Review cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 16 }}>
        {CUSTOMER_REVIEWS.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

function ReviewCard({ review }) {
  return (
    <View style={styles.reviewCard}>
      <StarRating rating={review.rating} size={12} />
      <Text style={styles.reviewTitle}>{review.title}</Text>
      <Text style={styles.reviewBody} numberOfLines={3}>
        {review.body}
      </Text>
    </View>
  );
}

function RatingBar({ stars, count, maxCount }) {
  const pct = maxCount > 0 ? count / maxCount : 0;

  return (
    <View style={styles.ratingBarRow}>
      <Text style={styles.ratingBarLabel}>{'★'.repeat(stars)}</Text>
      <View style={styles.ratingBarTrack}>
        <View style={[styles.ratingBarFill, { width: `${pct * 100}%` }]} />
      </View>
      <Text style={styles.ratingBarCount}>({count})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Ratings tab
  overallRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  overallScore: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  overallCount: {
    color: "#8A9BB5",
    fontSize: 12,
    marginLeft: 4,
  },
  barsContainer: {
    gap: 6,
    marginBottom: 20,
  },
  ratingBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingBarLabel: {
    color: "#F5A623",
    fontSize: 10,
    width: 52,
    letterSpacing: -1,
  },
  ratingBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#1C2438",
    borderRadius: 3,
    overflow: "hidden",
  },
  ratingBarFill: {
    height: "100%",
    backgroundColor: "#4A5978",
    borderRadius: 3,
  },
  ratingBarCount: {
    color: "#4A5978",
    fontSize: 11,
    width: 28,
    textAlign: "right",
  },

  // Reviews
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  reviewCard: {
    width: 160,
    backgroundColor: "#131929",
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  reviewTitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
    letterSpacing: 0.3,
  },
  reviewBody: {
    color: "#4A5978",
    fontSize: 10,
    lineHeight: 15,
  },

});