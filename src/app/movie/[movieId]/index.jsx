import MovieDetailsTab from '@/components/features/movie-details/MovieDetailsTab';
import RatingsTab from '@/components/features/movie-details/RatingsTab';
import StarRating from '@/components/features/movie-details/StarRating';
import theme from '@/constants/theme';
import routeName from '@/services/api';
import axios from '@/services/axios';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, IconButton } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

function getYouTubeVideoId(url) {
  if (!url) return null; // Added safe protection check
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regex);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Select showtime and seats screen
export default function Index() {
  const router = useRouter();

  const { movieId } = useLocalSearchParams();

  // Behaviour
  const [activeTab, setActiveTab] = useState('details'); // Example 'details' or 'ratings'

  // Data
  const [movieDetails, setMovieDetails] = useState({});

  const youtubeVideoId = movieDetails?.trailer_url 
      ? getYouTubeVideoId(movieDetails.trailer_url) 
      : null;

  useEffect(() => {
    getMovieDetails();
  }, []);

  async function getMovieDetails() {
    await axios.get(routeName({ name: 'movie_details', params: { movie_id: movieId } }))
    .then(response => {
      if (response?.data?.status == true) {
        setMovieDetails(response.data.data);
      }
    })
  }

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <View style={styles.heroNav}>
          <IconButton icon="arrow-left" iconColor="#FFFFFF" size={22} style={{ margin: 0 }} onPress={() => router.back()} />
        </View>

        {/* Video */}
        {youtubeVideoId ? (
          <View style={styles.videoBackgroundWrapper}>
            <YoutubePlayer
              height={280} 
              width={width}
              videoId={youtubeVideoId}
              play={true}
              webViewProps={{ androidLayerType: 'hardware'}}
              initialPlayerParams={{ controls: false, modestbranding: true, rel: false }}
            />
          </View>
        ) : (
          <View style={[styles.videoBackgroundWrapper, { backgroundColor: '#131929' }]} />
        )}
      </View>

      {/* Detail sheet */}
      <View style={styles.sheet}>
        {/* Movie info header */}
        <View style={styles.infoHeader}>
          <Image source={{ uri: movieDetails.poster_url }} style={styles.poster} resizeMode="cover" />
          <View style={{ flex: 1, gap: 5 }}>
            {/* Meta */}
            <View style={styles.titleRow}>
              <Text style={styles.movieTitle}>{movieDetails.title}</Text>
              <IconButton icon="heart-outline" iconColor="#4A5978" size={20} style={{ margin: 0 }} onPress={() => alert('You click favourite button')} />
            </View>
            {/* Genre */}
            <View style={styles.chips}>
              {movieDetails?.genre?.map((g) => (
                <Chip key={g} style={styles.chip} textStyle={styles.chipText} compact>
                  {g}
                </Chip>
              ))}
            </View>
            
            {/* Info row */}
            <View style={styles.infoRow}>
              <IconButton icon="calendar-outline" iconColor="#8A9BB5" size={14} style={{ margin: 0 }} />
              <Text style={styles.infoText}>{movieDetails.release_date}</Text>
              <IconButton icon="message-outline" iconColor="#8A9BB5" size={14} style={{ margin: 0 }} />
              <Text style={styles.infoText}>{movieDetails.classification}</Text>
              <IconButton icon="clock-outline" iconColor="#8A9BB5" size={14} style={{ margin: 0 }} />
              <Text style={styles.infoText}>{movieDetails.duration}</Text>
            </View>

            {/* Star rating */}
            <View style={styles.ratingRow}>
              <StarRating rating={movieDetails.rating} size={16} />
              <Text style={styles.ratingText}>{movieDetails.rating}/5 ({movieDetails.total_rating_people})</Text>
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
            ? <MovieDetailsTab synopsis={movieDetails.synopsis} casts={movieDetails.casts} director={movieDetails.director} writers={movieDetails.writers} /> 
            : <RatingsTab 
                reviewCount={movieDetails.total_rating_people} 
                rating={movieDetails.rating}
                customerReviews={movieDetails.movie_reviews}
                ratingBreakdown={movieDetails.rating_breakdown}
              />
          }
        </View>
      </View>

      {/* Book ticket */}
      <View style={styles.bookContainer}>
        <Link href={{ pathname: '/movie/[movieId]/booking-seats', params: { movieId: 2 }}} asChild>
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
    paddingTop: 35
  },
  hero: {
    height: 315,
    backgroundColor: '#0A0F1E',
    justifyContent: "space-between",
    position: 'relative',
    overflow: 'hidden',      
  },
  videoBackgroundWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  heroNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 20,
    zIndex: 5,
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