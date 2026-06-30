import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

export default function Dropdown({ label, value, options, onSelect }) {
  const [open, setOpen] = useState(false);

  const selectedOption = options && options.find(opt => opt.id == value);

  return (
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      anchor={
        <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(true)}>
          <Text style={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
            {selectedOption ? selectedOption.name : label}
          </Text>
          <IconButton icon="chevron-down" iconColor="#8A9BB5" size={18} style={{ margin: 0 }} />
        </TouchableOpacity>
      }
      contentStyle={styles.menuContent}>
      {options.map((opt) => (
        <Menu.Item 
          key={opt.id} 
          onPress={() => { 
            onSelect(opt.id);
            setOpen(false); 
          }} 
          title={opt.name}
          titleStyle={styles.menuItem} 
        />
      ))}
    </Menu>
  );
}

const styles = StyleSheet.create({
  // Dropdown
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131929',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A3550',
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
  },
  dropdownPlaceholder: { 
    color: '#4A5978', 
    fontSize: 13 
  },
  dropdownValue: { 
    color: '#FFFFFF', 
    fontSize: 13 
  },
  menuContent: { 
    backgroundColor: '#131929' 
  },
  menuItem: { 
    color: '#FFFFFF', 
    fontSize: 13 
  },
});