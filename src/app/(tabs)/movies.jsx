import spacing from '@/constants/spacing';
import theme from '@/constants/theme';
import routeName from '@/services/api';
import axios from '@/services/axios';
import { expo } from '@root/app.json';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { AppRegistry, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, IconButton, Searchbar } from 'react-native-paper';

export default function Index() {
  const router = useRouter();

  // Input
  const [searchInput, setSearchInput] = useState('');

  // Data
  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getUser();
    getMovies();
  }, []);

  async function getUser() {
    await axios.get(routeName({ name: 'user' }))
    .then(response => {
      if (response?.data?.status == true) {
        setName(response.data.data.first_name);        
      }
    })
  }

  async function getMovies() {
    await axios.get(routeName({ name: 'movies' }))
    .then(response => {
      if (response?.data?.status == true) {
        setMovies(response.data.data);
      }
    })
  }

  const filteredMovies = movies.filter((movie) => {
    const searchString = searchInput.toLowerCase().trim();
    const matchesTitle = movie.title?.toLowerCase().includes(searchString);

    return matchesTitle;
  });
  
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar.Icon size={46} icon="account" style={{ backgroundColor: "#1C2438" }} color="#8A9BB5" />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 16, letterSpacing: 0.2 }}>Hello, <Text style={{ fontWeight: '700' }}>{name}</Text></Text>
            <Text style={styles.subGreeting}>
              Want to go see a movie? Get your ticket today
            </Text>
          </View>
        </View>
        <IconButton icon="bell-outline" iconColor="#FFFFFF" size={22} onPress={() => alert('You click notifications button')} />
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Searchbar 
          placeholder="Search by movies or cinema hall"
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#4A5978"
          placeholderTextColor="#4A5978"
          theme={{ colors: { onSurfaceVariant: "#4A5978" } }}
          value={searchInput}
          onChangeText={setSearchInput}
        />

        <TouchableOpacity style={styles.filterBtn}>
          <IconButton icon="tune" iconColor="#FFFFFF" size={20} style={{ margin: 0 }} onPress={() => alert('You click filter button')} />
        </TouchableOpacity>
      </View>

      {/* Movie list */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}
        columnWrapperStyle={{ justifyContent: 'flex-start', marginBottom: 12 }}
        ListEmptyComponent={searchInput ? (<Text style={styles.emptyText}>No movies match "{searchInput}"</Text>) : null}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/movie/[movieId]', params: { movieId: item.id }}} asChild>
            <TouchableOpacity style={{ width: '47%', marginHorizontal: '1.5%' }}>
              <MovieCard title={item.title} posterUrl={item.poster_url} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

function MovieCard({ title, posterUrl }) {
  return (
    <View style={styles.movieCard}>
      <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
      <View style={styles.movieCardFooter}>
        <Text style={styles.movieCardTitle} numberOfLines={2}>
          {title}
        </Text>
        <IconButton icon="dots-vertical" iconColor="#8A9BB5" size={18} style={{ margin: 0, marginTop: -4 }} />
      </View>
    </View>
  );
}

AppRegistry.registerComponent(expo.name, () => Index);

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: theme.colors.background,
    paddingTop: 35
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: spacing.screenPaddingX.md, 
    paddingTop: 20, 
    paddingBottom: 12 
  },
  headerLeft: { 
    flexDirection: 'row', 
    alignItems: "center", 
    flex: 1, 
    gap: 12 
  },
  subGreeting: { 
    color: '#979ba3', 
    fontSize: 12, 
    marginTop: 2, 
    lineHeight: 16 
  },
  searchRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    gap: 8, 
    marginBottom: 20 
  },
  searchBar: { 
    flex: 1, 
    backgroundColor: '#131929', 
    borderRadius: 10, 
    height: 44, 
    elevation: 0 
  },
  searchInput: { 
    color: '#FFFFFF', 
    fontSize: 13, 
    marginTop: -4 
  },
  filterBtn: {
    backgroundColor: '#131929',
    borderRadius: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    gap: 20, 
    marginBottom: 24 
  },

  // Movie Card Component
  movieCard: {
    width: '100%',
    backgroundColor: '#131929',
    borderRadius: 10,
    overflow: "hidden"
  },
  poster: {
    width: '100%',
    height: 300,
  },
  movieCardFooter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 2,
    paddingVertical: 8,
    minHeight: 48,
  },
  movieCardTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '600',
    lineHeight: 16,
  },
  emptyText: { 
    color: '#8A9BB5', 
    textAlign: 'center', 
    marginTop: 40, 
    fontSize: 14 
  }
});
