import theme from '@/constants/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#e9ec04", // Your primary active color
      tabBarInactiveTintColor: "#8A9BB5",
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.colors.background,
        borderTopColor: theme.colors.background
      }
    }}>
      <Tabs.Screen 
        name="movies" 
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="home" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="tickets" 
        options={{
          title: "Tickets",
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="ticket-outline" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="favourites" 
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="heart-outline" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="account-outline" size={size} color={color} />
          )
        }} 
      />
    </Tabs>
  );
}