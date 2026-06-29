import MenuCard from '@/components/features/fnb/MenuCard';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SW } = Dimensions.get("window");
const CARD_WIDTH = (SW - 48) / 2;

const TABS = ["Combo", "Food/Snacks", "Beverages"];

const MENU_DATA = {
  Combo: [
    {
      id: 1,
      name: "Yummy combo",
      desc: "2 hotdogs, 2 Lays chips & 4 pepsi",
      price: 20.00,
      badge: null,
    },
    {
      id: 2,
      name: "Fresh Combo",
      desc: "Large popcorn & candy with pepsi",
      price: 25.00,
      badge: null,
    },
    {
      id: 3,
      name: "Special Combo",
      desc: "Chicken Shawarma & Pack of fries",
      originalPrice: 30,
      price: 25.00,
      badge: "11%",
    },
    {
      id: 4,
      name: "Delight Combo",
      desc: "Double pack medium popcorn",
      price: 20.00,
      badge: null,
    },
  ],
  "Food/Snacks": [
    { id: 5, name: "Popcorn (Large)", desc: "Buttered large popcorn bucket", price: 15.00, badge: null },
    { id: 6, name: "Hot Dog", desc: "Classic beef hot dog with mustard", price: 12.00, badge: null },
    { id: 7, name: "Nachos", desc: "Crispy nachos with cheese dip", price: 18.00, badge: null },
    { id: 8, name: "Shawarma", desc: "Chicken shawarma with fries", price: 22.00, badge: "5%" },
  ],
  Beverages: [
    { id: 9, name: "Pepsi (500ml)", desc: "Chilled Pepsi bottle", price: 5.00, badge: null },
    { id: 10, name: "Juice Box", desc: "Assorted fruit juice box", price: 7.00, badge: null },
    { id: 11, name: "Water (1L)", desc: "Still mineral water", price: 3.00, badge: null },
    { id: 12, name: "Smoothie", desc: "Mixed berry smoothie", price: 12.00, badge: "10%" },
  ],
};

export default function Fnb() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('Combo');
  const [quantities, setQuantities] = useState({});

  const allItems = Object.values(MENU_DATA).flat();
  const totalItems = allItems.reduce((sum, item) => sum + (quantities[item.id] || 0), 0);
  const subTotal = allItems.reduce((sum, item) => sum + (quantities[item.id] || 0) * item.price, 0);

  const currentItems = MENU_DATA[activeTab] || [];

  function increase(id) {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function decrease(id) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
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
          // Pair cards in rows
          if (i % 2 !== 0) return null;

          const next = currentItems[i + 1];

          return (
            <View key={item.id} style={styles.row}>
              <MenuCard item={item} qty={quantities[item.id] || 0} onIncrease={() => increase(item.id)} onDecrease={() => decrease(item.id)} />
              {next ? (
                <MenuCard
                  item={next}
                  qty={quantities[next.id] || 0}
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
            RM {subTotal.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Confirm button */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.confirmBtn, totalItems === 0 && styles.confirmBtnDisabled]} activeOpacity={0.85} onPress={() => router.push('/booking/payment-method')}>
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

//   // Stepper
//   stepper: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1C2438",
//     borderRadius: 5,
//     overflow: "hidden",
//     height: 26,
//   },
//   stepBtn: {
//     width: 26,
//     height: 26,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#2A3550",
//   },
//   stepBtnText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "700",
//     lineHeight: 20,
//   },
//   stepCount: {
//     color: "#FFFFFF",
//     fontSize: 12,
//     fontWeight: "600",
//     width: 26,
//     textAlign: "center",
//   },

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