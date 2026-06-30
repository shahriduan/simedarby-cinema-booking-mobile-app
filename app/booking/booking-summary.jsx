import routeName from '@/services/api';
import axios from '@/services/axios';
import { bookingStorage } from '@/services/localStorage';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

const { width: SW } = Dimensions.get('window');
const NOTCH_SIZE = 16;

// ─── Data ─────────────────────────────────────────────────────────────────────
const BOOKING = {
  movie: {
    title: "Venom: Let There Be Carnage",
    genres: "Action, Adventure, Sci-fi",
    duration: "1h 37m",
    meta: "English, IMDb 3D",
    ticketType: "Classic Tickets",
  },
  cinema: "Genesis Deluxe Lagos : Maryland mall",
  date: "Nov 20, 2021",
  seat: "F4, F5",
  start: "5:40PM",
  end: "7:20PM",
  costs: [
    { id: 1, label: "Tickets", sub: "Classic tickets (x2)", amount: 5000 },
    { id: 2, label: "Food & Beverage", sub: "Fresh XL Combo (x2)", amount: 5400 },
    { id: 3, label: "Charges", sub: "Service charge", amount: 50 },
  ],
  total: 10450,
};

export default function BookingSummary() {
  const router = useRouter();

  const [promoCode, setPromoCode] = useState('');
  const [booking, setBooking] = useState({});
  
  useEffect(() => {
    getBookingDetails();
  }, []);

  async function getBookingDetails() {
    try {
      const bookingId = await bookingStorage.getBookingId();

      const response = await axios.get(routeName({ name: 'booking_details', params: { booking_id: bookingId } }))

      if (response?.data?.status == true) {
        setBooking(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch booking summary:', error);
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F1E" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Ticket Stub */}
        <View style={styles.ticket}>
          {/* Top section */}
          <View style={styles.ticketTop}>
            <Image source={{ uri: booking?.movie?.poster_url }} style={styles.poster} resizeMode="cover" />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{booking?.movie?.title}</Text>
              <Text style={styles.movieMeta}>{booking?.movie?.genre}</Text>
              <Text style={styles.movieMeta}>{booking?.movie?.duration}</Text>
              <Text style={styles.movieMeta}>{booking?.movie?.classification}</Text>
            </View>
          </View>

          {/* Perforated divider */}
          <TicketDivider />

          {/* Bottom section */}
          <View style={styles.ticketBottom}>
            <Text style={styles.cinemaLabel}>Cinema</Text>
            <Text style={styles.cinemaName}>{booking?.cinema?.name}</Text>

            <View style={styles.detailGrid}>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{dayjs(booking.movie_start_at).format('MMM DD, YYYY')}</Text>
              </View>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>Seat</Text>
                <Text style={styles.detailValue}>{booking?.seats?.map(item => item.replace('-', '')).join(', ')}</Text>
              </View>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>Start</Text>
                <Text style={styles.detailValue}>{dayjs(booking.movie_start_at).format('hh:mmA')}</Text>
              </View>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>End</Text>
                <Text style={styles.detailValue}>{dayjs(booking.movie_end_at).format('hh:mmA')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Cost Breakdown Card */}
        <View style={styles.costCard}>
          <CostRow label="Tickets" sub={'Tickets (x '+booking.total_selected_seat+')'} amount={booking.total_ticket_price} last={false} />
          <CostRow label="Food & Beverages" sub={booking?.booking_fnbs?.map(item => item.name)} amount={booking.fnb_total_price} last={false} />
          <CostRow label="Charges" sub="Service Charges" amount={booking.service_charges} last={false} />

          {/* Promo code row */}
          {/* <View style={[styles.costRow, styles.costRowBorder]}>
            <Text style={styles.costLabel}>Promo Code</Text>
            <TextInput
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder=""
              placeholderTextColor="#4A5978"
              style={styles.promoInput}
            />
          </View> */}

          {/* Total */}
          <View style={[styles.costRow, { paddingTop: 14 }]}>
            <Text style={styles.totalLabel}>Total Amount Payable</Text>
            <Text style={styles.totalAmount}>
              RM {booking.grand_total_price}
            </Text>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85} onPress={() => router.push('/booking/payment-method')}>
          <Text style={styles.ctaText}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TicketDivider() {
  return (
    <View style={styles.dividerWrap}>
      <View style={styles.notchLeft} />
      <View style={styles.dashedLine}>
        {Array.from({ length: 16 }).map((_, i) => (
          <View key={i} style={styles.dash} />
        ))}
      </View>
      <View style={styles.notchRight} />
    </View>
  );
}

function CostRow({ label, sub, amount, last }) {
  return (
    <View style={[styles.costRow, !last && styles.costRowBorder]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.costLabel}>{label}</Text>
        {Array.isArray(sub) && sub.length > 0 ? (
          sub.map((item, index) => (
            <Text key={index} style={styles.costSub}>
              {item}
            </Text>
          ))
        ) : (
          /* Fallback if sub is just a normal string or object */
          sub && <Text style={styles.costSub}>{sub}</Text>
        )}
      </View>
      <Text style={styles.costAmount}>RM{Number(amount).toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#0A0F1E' 
  },

  scroll: { 
    paddingHorizontal: 16, 
    paddingTop: 8 
  },

  // Ticket
  ticket: {
    backgroundColor: '#131929',
    borderRadius: 14,
    marginBottom: 20,
    overflow: 'visible',
  },
  ticketTop: {
    flexDirection: 'row',
    padding: 16,
    gap: 14,
  },
  poster: {
    width: 70,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#8A9BB530',
    flexShrink: 0,
  },
  movieInfo: { 
    flex: 1, 
    gap: 3 
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 4,
  },
  movieMeta: {
    color: '#8A9BB5',
    fontSize: 11.5,
    lineHeight: 17,
  },

  // Perforated divider
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: NOTCH_SIZE,
  },
  notchLeft: {
    width: NOTCH_SIZE,
    height: NOTCH_SIZE,
    borderRadius: NOTCH_SIZE / 2,
    backgroundColor: '#0A0F1E',
    marginLeft: -NOTCH_SIZE / 2,
  },
  notchRight: {
    width: NOTCH_SIZE,
    height: NOTCH_SIZE,
    borderRadius: NOTCH_SIZE / 2,
    backgroundColor: '#0A0F1E',
    marginRight: -NOTCH_SIZE / 2,
  },
  dashedLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  dash: {
    width: 4,
    height: 1.5,
    backgroundColor: '#2A3550',
  },

  // Ticket bottom
  ticketBottom: {
    padding: 16,
    paddingTop: 14,
  },
  cinemaLabel: {
    color: '#4A5978',
    fontSize: 10,
    marginBottom: 4,
  },
  cinemaName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 16,
  },
  detailGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailCol: { gap: 4 },
  detailLabel: {
    color: '#4A5978',
    fontSize: 10,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Cost card
  costCard: {
    backgroundColor: '#131929',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  costRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1C2438',
  },
  costLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  costSub: {
    color: '#4A5978',
    fontSize: 11,
  },
  costAmount: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  // Promo input
  promoInput: {
    backgroundColor: '#1C2438',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#FFFFFF',
    fontSize: 12,
    width: 120,
    textAlign: 'center',
  },

  // Total
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  // Footer
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 8,
    backgroundColor: '#0A0F1E',
  },
  ctaBtn: {
    backgroundColor: '#2A3550',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
