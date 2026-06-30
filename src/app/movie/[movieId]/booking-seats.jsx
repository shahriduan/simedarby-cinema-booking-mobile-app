import Dropdown from '@/components/features/booking-seats/Dropdown.jsx';
import Seat from '@/components/features/booking-seats/Seat.jsx';
import theme from '@/constants/theme';
import routeName from '@/services/api';
import axios from '@/services/axios';
import dayjs from 'dayjs';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

// Show time is hardcoded
const TIMES = [
  { value: '09:20:00', label: '9:20AM' },
  { value: '11:40:00', label: '11:40AM' },
  { value: '13:20:00', label: '1:20PM' },
  { value: '15:30:00', label: '3:30PM' },
  { value: '17:40:00', label: '5:40PM' },
  { value: '19:30:00', label: '7:30PM' },
  { value: '21:20:00', label: '9:20PM' }
];
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLS = 9;
const TICKET_PRICE = 15;

const UNAVAILABLE = new Set([
  "B-4","B-5","B-6",
  "C-3","C-4","C-5",
  "D-4","D-5","D-6",
  "E-3","E-5","E-6","E-7",
  "F-4","F-5",
]);

const { width: SW } = Dimensions.get('window');

export default function BookingSeats() {
  const router = useRouter();
  const { movieId } = useLocalSearchParams();

  const today = new Date();

  // Data
  const [listArea, setListArea] = useState([]);
  const [listCinema, setListCinema] = useState([]);

  // Input
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(new Set([]));

  function toggleSeat(id) {
    setSelectedSeats((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function seatId(row, col) {
    return `${row}-${col}`;
  }

  const seatLabels = [...selectedSeats]
    .map((id) => {
      const [r, c] = id.split('-');
      return `${r}${c}`;
    })
    .join("  ");

  const subTotal = selectedSeats.size * TICKET_PRICE;

  useEffect(() => {
    getArea();
  }, []);

  async function bookSeats() {
    console.log(movieId);
    console.log(selectedCinema);
    console.log(dayjs(selectedDate).format('YYYY-MM-DD') + ' ' + selectedTime);
    console.log([...selectedSeats]);

    await axios.post(routeName({ name: 'booking_ticket' }), {
        cinema_id: selectedCinema,
        movie_id: movieId,
        showtime_slot: dayjs(selectedDate).format('YYYY-MM-DD') + ' ' + selectedTime,
        seats: [...selectedSeats]
      })
      .then(response => {
        if (response?.data?.status == true) {
          // router.push({ name: '/booking/fnb' });
        } else {
          alert(response.data.message);
        }
      });
  }

  async function getArea() {
    await axios.get(routeName({ name: 'area' }))
      .then(response => {
        if (response?.data?.status == true) {
          setListArea(response.data.data);
        }
      })
  }

  const goPrevMonth = () => {
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (selectedMonth > currentMonth) {
      setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1));
    }
  }

  const goNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1));
  }

  async function getCinema(targetAreaId) {
    const response = await axios.get(routeName({ name: 'cinema', query: { area_id: targetAreaId } }))
      .then(response => {
        if (response?.data?.status === true) {
          setListCinema(response.data.data);
        }
      });
  }

  const dates = useMemo(() => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const result = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);

      // Skip past dates
      if (date < new Date(today.setHours(0, 0, 0, 0))) {
        continue;
      }

      result.push(date);
    }

    return result;
  }, [selectedMonth]);

  const handleAreaSelect = (selectedAreaId) => {
    setSelectedArea(selectedAreaId);
    setSelectedCinema(null);
    setListCinema([]);
    getCinema(selectedAreaId);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Ticket Booking',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center', 
          headerShown: true,
          headerShadowVisible: false,

        }}
      />
      <View style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          <Text style={styles.sectionQuestion}>
            Where would you like to see the movie? Kindly select as appropriate
          </Text>

          {/* Location */}
          <Text style={styles.label}>Area</Text>
          <Dropdown
            label="Select Area"
            value={selectedArea}
            options={listArea}
            onSelect={handleAreaSelect}
          />

          {/* Cinema location */}
          <Text style={styles.label}>Cinema Location</Text>
          <Dropdown
            label="Select Cinema"
            value={selectedCinema}
            options={listCinema}
            onSelect={setSelectedCinema}
          />

          {/* Month picker */}
          <View style={styles.dateHeader}>
            <Text style={styles.label}>Select a date</Text>
          </View>
          <View style={styles.monthRow}>
            <IconButton 
              icon="chevron-left" 
              iconColor="#FFFFFF" 
              size={18} 
              style={{ margin: 0 }}     
              onPress={goPrevMonth}
              disabled={
                selectedMonth.getFullYear() === today.getFullYear() &&
                selectedMonth.getMonth() === today.getMonth()
              } 
            />
            <Text style={styles.monthLabel}>
              {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>

            <IconButton 
              icon="chevron-right" 
              iconColor="#FFFFFF" 
              size={18} 
              style={{ margin: 0 }} 
              onPress={goNextMonth} 
            />
          </View>

          {/* Date picker */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date) => {
              const active = selectedDate.toDateString() === date.toDateString();

              return (
                <TouchableOpacity key={date.toISOString()} style={[ styles.dayCell, active && styles.dayCellActive]} onPress={() => setSelectedDate(date)}>
                  <Text style={[styles.dayName, active && styles.dayNameActive]}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>

                  <Text style={[styles.dayNum, active && styles.dayNumActive]}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Time slot */}
          <Text style={styles.label}>Available Time</Text>
          <View style={styles.timeGrid}>
            {TIMES.map((t) => {
              const active = selectedTime === t.value;
              return (
                <TouchableOpacity key={t.value} style={[styles.timeChip, active && styles.timeChipActive]} onPress={() => setSelectedTime(t.value)}>
                  <Text style={[styles.timeText, active && styles.timeTextActive]}>{t.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Seat legend */}
          <Text style={[styles.label, { textAlign: 'center', marginBottom: 10 }]}>
            Select Seat
          </Text>
          <View style={styles.legend}>
            {[
              { color: '#2A3550', label: 'Available' },
              { color: '#1C2438', label: 'Unavailable', cross: true },
              { color: '#a9aebe', label: 'Selected', border: true },
            ].map(({ color, label, cross, border }) => (
              <View key={label} style={styles.legendItem}>
                <View style={[styles.legendBox, { backgroundColor: color, borderWidth: border ? 1 : 0, borderColor: "#5B6FA6" }]}>
                  {cross && <Text style={styles.seatX}>x</Text>}
                </View>
                <Text style={styles.legendLabel}>{label}</Text>
              </View>
            ))}
          </View>

          {/* Screen curve */}
          <View style={styles.screenWrap}>
            <View style={styles.screenCurve} />
            <Text style={styles.screenLabel}>Screen</Text>
          </View>

          {/* Seat grid */}
          <View style={styles.seatGrid}>
            {ROWS.map((row) => (
              <View key={row} style={styles.seatRow}>
                <Text style={styles.rowLabel}>{row}</Text>
                {Array.from({ length: COLS }, (_, ci) => {
                  const id = seatId(row, ci + 1);
                  return (
                    <Seat
                      key={id}
                      id={id}
                      row={row}
                      col={ci + 1}
                      unavailable={UNAVAILABLE.has(id)}
                      selected={selectedSeats.has(id)}
                      onPress={toggleSeat}
                    />
                  );
                })}
                <Text style={styles.rowLabel}>{row}</Text>
              </View>
            ))}
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryBox}>
              <Text style={styles.summarySmall}>SEAT</Text>
              <Text style={styles.summaryValue}>{seatLabels || "—"}</Text>
            </View>
            <View style={[styles.summaryBox, styles.summaryBoxRight]}>
              <Text style={styles.summarySmall}>SUB-TOTAL</Text>
              <Text style={styles.summaryValue}>
                RM {subTotal.toLocaleString()}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.proceedBtn} onPress={() => bookSeats() }>
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#0A0F1E' 
  },

  // Question
  sectionQuestion: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
    marginTop: 4,
  },

  // Labels
  label: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 4,
  },

  // Date
  dateHeader: { 
    marginBottom: 2 
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: -8,
  },
  monthLabel: { 
    color: '#FFFFFF', 
    fontSize: 13, 
    fontWeight: '600' 
  },
  dayCell: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 6,
    minWidth: 36,
  },
  dayCellActive: { 
    backgroundColor: '#2563EB' 
  },
  dayName: { 
    color: '#4A5978', 
    fontSize: 10, 
    marginBottom: 4 
  },
  dayNameActive: { 
    color: '#FFFFFF' 
  },
  dayNum: { 
    color: '#8A9BB5', 
    fontSize: 13, 
    fontWeight: '600' 
  },
  dayNumActive: { 
    color: '#FFFFFF' 
  },

  // Time
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  timeChip: {
    borderWidth: 1,
    borderColor: '#2A3550',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  timeChipActive: { 
    borderColor: '#2563EB', 
    backgroundColor: '#1A2445' 
  },
  timeText: { 
    color: '#8A9BB5', 
    fontSize: 12 
  },
  timeTextActive: { 
    color: '#FFFFFF' 
  },

  // Legend
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  legendItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },
  legendBox: {
    width: 16,
    height: 14,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendLabel: { 
    color: '#8A9BB5', 
    fontSize: 11 
  },

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

  // Screen
  screenWrap: { 
    alignItems: 'center', 
    marginBottom: 16 
  },
  screenCurve: {
    width: SW * 0.65,
    height: 20,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: '#2A3550',
    marginBottom: 6,
  },
  screenLabel: { 
    color: '#4A5978', 
    fontSize: 11, 
    letterSpacing: 1 
  },

  // Summary
  summary: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2A3550',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 120
  },
  summaryBox: {
    flex: 1,
    padding: 12,
    backgroundColor: '#131929',
  },
  summaryBoxRight: {
    borderLeftWidth: 1,
    borderLeftColor: '#2A3550',
  },
  summarySmall: { 
    color: '#4A5978', 
    fontSize: 10, 
    fontWeight: '700', 
    letterSpacing: 0.5, 
    marginBottom: 4 
  },
  summaryValue: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: '700' 
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 28,
    backgroundColor: '#0A0F1E',
    borderTopWidth: 1,
    borderTopColor: '#1C2438',
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2A3550',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  proceedBtn: {
    flex: 1,
    backgroundColor: '#3A4260',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  proceedText: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: '600' 
  },
});