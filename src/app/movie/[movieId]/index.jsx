import MovieDetailsTab from '@/components/features/movie-details/MovieDetailsTab';
import RatingsTab from '@/components/features/movie-details/RatingsTab';
import StarRating from '@/components/features/movie-details/StarRating';
import theme from '@/constants/theme';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, IconButton } from 'react-native-paper';

const MOVIE = {
  title: "Venom: Let There Be Carnage",
  genres: ["Action", "Adventure", "Sci-fi"],
  releaseDate: "October 2021",
  ageRating: "15+",
  duration: "1h 37m",
  rating: 4.0,
  reviewCount: 20,
  synopsis:
    "Eddie Brock is still struggling to co-exist with the shape-shifting extraterrestrial Venom. When deranged serial killer Cletus Kasady also becomes host to an alien symbiote...",
  casts: "Tom Hardy, Woody Harrelson, Michelle Williams, Naomi Harris",
  director: "Andy Serkis",
  writers: "Kelly Marcel (Screenplay by), Tom Hardy (Story by)",
};

// Select showtime and seats screen
export default function Index() {
  const router = useRouter();

  const { movieId } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState('details'); // Example 'details' or 'ratings'

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        {/* Top icon */}
        <View style={styles.heroNav}>
          <IconButton icon="arrow-left" iconColor="#FFFFFF" size={22} style={{ margin: 0 }} onPress={() => router.back() } />
          <IconButton icon="arrow-expand" iconColor="#FFFFFF" size={20} style={{ margin: 0 }} onPress={() => alert('You click fullscreen button')} />
        </View>
        {/* Trailer watermark */}
        <View style={styles.heroFooter}>
          <View style={styles.trailerBadge}>
            <Text style={styles.trailerText}>TRAILER</Text>
          </View>
          <IconButton icon="volume-off" iconColor="#FFFFFF" size={20} style={{ margin: 0 }} />
        </View>
      </View>

      {/* Detail sheet */}
      <View style={styles.sheet}>
        {/* Movie info header */}
        <View style={styles.infoHeader}>
          <View style={styles.poster} />
          <View style={{ flex: 1, gap: 5 }}>
            {/* Meta */}
            <View style={styles.titleRow}>
              <Text style={styles.movieTitle}>Venom: Let There Be Carnage</Text>
              <IconButton icon="heart-outline" iconColor="#4A5978" size={20} style={{ margin: 0 }} onPress={() => alert('You click favourite button')} />
            </View>
            {/* Genre */}
            <View style={styles.chips}>
              {MOVIE.genres.map((g) => (
                <Chip key={g} style={styles.chip} textStyle={styles.chipText} compact>
                  {g}
                </Chip>
              ))}
            </View>
            
            {/* Info row */}
            <View style={styles.infoRow}>
              <IconButton icon="calendar-outline" iconColor="#8A9BB5" size={14} style={{ margin: 0 }} />
              <Text style={styles.infoText}>{MOVIE.releaseDate}</Text>
              <IconButton icon="message-outline" iconColor="#8A9BB5" size={14} style={{ margin: 0 }} />
              <Text style={styles.infoText}>{MOVIE.ageRating}</Text>
              <IconButton icon="clock-outline" iconColor="#8A9BB5" size={14} style={{ margin: 0 }} />
              <Text style={styles.infoText}>{MOVIE.duration}</Text>
            </View>

            {/* Star rating */}
            <View style={styles.ratingRow}>
              <StarRating rating={MOVIE.rating} size={16} />
              <Text style={styles.ratingText}>{MOVIE.rating}/5 ({MOVIE.reviewCount})</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {['details', 'ratings'].map((tab) => {
            const label = tab === 'details' ? 'Movie Details' : 'Ratings & Reviews';
            const active = activeTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setActiveTab(tab)}>
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab content */}
        <View style={{ flex: 1 }}>
          {activeTab === "details" 
            ? <MovieDetailsTab synopsis={MOVIE.synopsis} casts={MOVIE.casts} director={MOVIE.director} writers={MOVIE.writers} /> 
            : <RatingsTab reviewCount={MOVIE.reviewCount} />
          }
        </View>
      </View>

      {/* Book ticket */}
      <View style={styles.bookContainer}>
        <Link href={{ pathname: '/booking/card-payment' }} asChild>
        {/* <Link href={{ pathname: '/movie/[movieId]/booking/seats', params: { movieId: 2 }}} asChild> */}
          <TouchableOpacity style={styles.bookButton} activeOpacity={0.85}>
            <Text style={styles.bookText}>Book Ticket</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  hero: {
    height: 220,
    backgroundColor: '#8A9BB530',
    justifyContent: "space-between",
  },
  heroNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 44,
  },
  heroFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  trailerBadge: {
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  trailerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Sheet
  sheet: {
    flex: 1,
    backgroundColor: '#0A0F1E',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  infoHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    gap: 14,
  },
  poster: {
    width: 100,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#8A9BB530',
    flexShrink: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  movieTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    marginRight: 4,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#1C2438',
    height: 24,
    borderRadius: 4,
  },
  chipText: {
    color: '#8A9BB5',
    fontSize: 10,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 0,
    marginTop: 2,
  },
  infoText: {
    color: '#8A9BB5',
    fontSize: 11,
    marginRight: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  ratingText: {
    color: '#8A9BB5',
    fontSize: 11,
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1C2438',
    marginHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#2563EB',
  },
  tabLabel: {
    color: '#4A5978',
    fontSize: 13,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: "600",
  },

  // Book ticket section
  bookContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background,
  },
  bookButton: {
    backgroundColor: '#3A4260',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});