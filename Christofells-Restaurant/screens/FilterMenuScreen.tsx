// screens/FilterMenuScreen.tsx

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ route }: FilterMenuScreenProps) {
  const { menuItems } = route.params;
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Filtering functionality
  const handleFilter = (course: string) => {
    setSelectedCourse(course);
    setFilteredItems(menuItems.filter((item) => item.course === course));
  };

  const clearFilter = () => {
    setSelectedCourse(null);
    setFilteredItems(menuItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('Starter')}>
          <Text style={styles.filterButtonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('Main')}>
          <Text style={styles.filterButtonText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('Dessert')}>
          <Text style={styles.filterButtonText}>Desserts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFilter}>
          <Text style={styles.clearButtonText}>Clear Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishNameandCourse}>{item.dishName} - {item.course}</Text>
            <Text style={styles.dishDescriptionText}>{item.description}</Text>
            <Text style={styles.dishPriceText}>ZAR {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#444',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  filterButtonText: {
    color: 'white',
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
  },
  menuItem: {
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 5,
    width: '90%',
    borderRadius: 5,
  },
  dishNameandCourse: {
    fontSize: 18,
    color: 'white',
  },
  dishDescriptionText: {
    fontSize: 14,
    color: '#bbb',
  },
  dishPriceText: {
    fontSize: 16,
    color: '#ddd',
  },
});
