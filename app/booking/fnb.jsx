import MenuCard from '@/components/features/fnb/MenuCard';
import routeName from '@/services/api';
import axios from '@/services/axios';
import { bookingStorage } from '@/services/localStorage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SW } = Dimensions.get("window");
const CARD_WIDTH = (SW - 48) / 2;

const transformMenuData = (rawData) => {
  const result = {};
  rawData.forEach((categoryGroup) => {
    result[categoryGroup.category] = categoryGroup.items.map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        desc: item.description,
        price: item.unit_price,
        originalPrice: item.original_price ?? null,
        badge: item.badge ?? null,
      }
    });
  });
  return result;
};

export default function Fnb() {
  const router = useRouter();

  const [menu, setMenu] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [quantities, setQuantities] = useState([]); // [{ fnb_id, quantity }]

  // Helper to read current qty for an item
  const getQty = (fnbId) => quantities.find((q) => q.fnb_id === fnbId)?.quantity || 0;

  // Recompute only when raw menu data changes
  const MENU_DATA = useMemo(() => transformMenuData(menu), [menu]);
  const TABS = useMemo(() => Object.keys(MENU_DATA), [MENU_DATA]);
  const allItems = useMemo(() => Object.values(MENU_DATA).flat(), [MENU_DATA]);

  const totalItems = allItems.reduce((sum, item) => sum + getQty(item.id), 0);
  const subTotal = allItems.reduce((sum, item) => sum + getQty(item.id) * item.price, 0);

  const currentItems = MENU_DATA[activeTab] || [];

  useEffect(() => {
    getFnb();
  }, []);

  async function getFnb() {
    try {
      const response = await axios.get(routeName({ name: 'fnb_menu' }));
      if (response?.data?.status === true) {
        const data = response.data.data;
        setMenu(data);
        setActiveTab(data[0]?.category ?? null); // default to first tab once data arrives
      }
    } catch (error) {
      console.error('Failed to fetch FnB menu:', error);
    }
  }

  async function submitFnb() {
    try {
      const bookingId = await bookingStorage.getBookingId();

      const response = await axios.post(routeName({ name: 'submit_fnb', params: { booking_id: bookingId } }), { 
        fnb: quantities 
      });

      if (response?.data?.status === true) {
        router.push('/booking/payment-method');
      } else {
        alert(response?.data?.message || 'Failed to update food items.');
      }
    } catch (error) {
      console.error('Failed to submit FnB:', error);
      alert('A network error occurred. Please try again.');
    }
  }

  function increase(fnbId) {
    setQuantities((prev) => {
      const existing = prev.find((q) => q.fnb_id === fnbId);
      if (existing) {
        return prev.map((q) =>
          q.fnb_id === fnbId ? { ...q, quantity: q.quantity + 1 } : q
        );
      }
      return [...prev, { fnb_id: fnbId, quantity: 1 }];
    });
  }

  function decrease(fnbId) {
    setQuantities((prev) =>
      prev
        .map((q) =>
          q.fnb_id === fnbId ? { ...q, quantity: Math.max(q.quantity - 1, 0) } : q
        )
        .filter((q) => q.quantity > 0) // optional: drop zero-qty entries entirely
    );
  }

  return (
    <View style={styles.root}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const active = activeTab === tab;
          
          return (
            <TouchableOpacity key={tab} style={[styles.tab, active && styles.tabActive]} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {currentItems.map((item, i) => {
          if (i % 2 !== 0) return null;

          const next = currentItems[i + 1];

          return (
            <View key={item.id} style={styles.row}>
              <MenuCard
                item={item}
                qty={getQty(item.id)}
                onIncrease={() => increase(item.id)}
                onDecrease={() => decrease(item.id)}
              />
              {next ? (
                <MenuCard
                  item={next}
                  qty={getQty(next.id)}
                  onIncrease={() => increase(next.id)}
                  onDecrease={() => decrease(next.id)}
                />
              ) : (
                <View style={{ width: CARD_WIDTH }} />
              )}
            </View>
          );
        })}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Summary bar */}
      <View style={styles.summary}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>ITEM</Text>
          <Text style={styles.summaryValue}>{totalItems}</Text>
        </View>
        <View style={[styles.summaryBox, styles.summaryBoxRight]}>
          <Text style={styles.summaryLabel}>SUB-TOTAL</Text>
          <Text style={styles.summaryValue}>
            RM {Number(subTotal).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Confirm button */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.confirmBtn, totalItems === 0 && styles.confirmBtnDisabled]} activeOpacity={0.85} onPress={() => submitFnb()}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#0A0F1E'
  },

  // Tabs
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1C2438',
    marginBottom: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { 
    borderBottomColor: '#2563EB'
  },
  tabLabel: { 
    color: '#4A5978', 
    fontSize: 13, 
    fontWeight: '500' 
  },
  tabLabelActive: { 
    color: '#FFFFFF', 
    fontWeight: '600' 
  },

  // Grid
  grid: { 
    paddingHorizontal: 16, 
    paddingTop: 12 
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },

  // Summary
  summary: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2A3550',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
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
  summaryLabel: {
    color: '#4A5978',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  // Footer
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    backgroundColor: '#0A0F1E',
  },
  confirmBtn: {
    backgroundColor: '#3A4260',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmBtnDisabled: {
    opacity: 0.5,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});